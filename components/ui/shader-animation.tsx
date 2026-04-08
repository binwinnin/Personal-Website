"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    uniforms: {
      time: { value: number }
      resolution: { value: THREE.Vector2 }
      mouse: { value: THREE.Vector2 }
    }
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec2 mouse;
      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        uv -= mouse;
        float t = time*0.05;
        float lineWidth = 0.002;
        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
          }
        }
        gl_FragColor = vec4(color[0],color[1],color[2],1.0);
      }
    `

    const camera = new THREE.Camera()
    camera.position.z = 1
    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
      mouse: { value: new THREE.Vector2(0, 0) },
    }
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    scene.add(new THREE.Mesh(geometry, material))

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }
    onResize()
    window.addEventListener("resize", onResize, false)

    // Mouse tracking with smooth lerp
    const targetMouse = { x: 0, y: 0 }
    const currentMouse = { x: 0, y: 0 }

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const aspect = rect.width / Math.min(rect.width, rect.height)
      const aspectY = rect.height / Math.min(rect.width, rect.height)
      targetMouse.x = ((e.clientX - rect.left) / rect.width * 2.0 - 1.0) * aspect
      targetMouse.y = -((e.clientY - rect.top) / rect.height * 2.0 - 1.0) * aspectY
    }
    container.addEventListener("mousemove", onMouseMove)

    sceneRef.current = { camera, scene, renderer, uniforms, animationId: 0 }

    const animate = () => {
      const id = requestAnimationFrame(animate)
      uniforms.time.value += 0.05

      // Smooth lerp toward cursor
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.04
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.04
      uniforms.mouse.value.set(currentMouse.x, currentMouse.y)

      renderer.render(scene, camera)
      if (sceneRef.current) sceneRef.current.animationId = id
    }
    animate()

    return () => {
      window.removeEventListener("resize", onResize)
      container.removeEventListener("mousemove", onMouseMove)
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)
        if (container.contains(sceneRef.current.renderer.domElement)) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }
        sceneRef.current.renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "#000", overflow: "hidden" }}
    />
  )
}
