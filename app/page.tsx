'use client'

import React, { useEffect, useRef } from 'react'
import { ShaderAnimation } from '@/components/ui/shader-animation'
import { Chatbot } from '@/components/ui/chatbot'

const FORMSPREE = 'https://formspree.io/f/mpqoneng'

export default function Home() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => navRef.current?.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenu = () => document.querySelector('.mobile-menu')?.classList.toggle('open')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const btn = e.currentTarget.querySelector<HTMLButtonElement>('button[type="submit"]')!
    const orig = btn.textContent ?? ''
    btn.textContent = 'Sending…'
    btn.disabled = true
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.currentTarget),
      })
      if (res.ok) {
        btn.textContent = 'Message Sent ✓'
        btn.style.background = '#4caf50'
        btn.style.borderColor = '#4caf50'
        e.currentTarget.reset()
        setTimeout(() => {
          btn.textContent = orig
          btn.style.background = ''
          btn.style.borderColor = ''
          btn.disabled = false
        }, 3500)
      } else throw new Error()
    } catch {
      btn.textContent = 'Failed — please try again'
      btn.disabled = false
      setTimeout(() => { btn.textContent = orig }, 3000)
    }
  }

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.service-card, .pricing-card, .step-card')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach((el, i) => {
      el.classList.add('reveal')
      el.style.transitionDelay = `${i * 0.06}s`
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* NAV */}
      <header className="nav" ref={navRef}>
        <div className="nav-inner">
          <a href="#" className="logo">Lakes Region <span>Web Co.</span></a>
          <nav className="nav-links">
            <a href="#services">Services</a>
            <a href="#how-it-works">Process</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact" className="nav-cta">Get a Free Quote</a>
          </nav>
          <button className="hamburger" aria-label="Menu" onClick={toggleMenu}>
            <span/><span/><span/>
          </button>
        </div>
        <div className="mobile-menu">
          <a href="#services">Services</a>
          <a href="#how-it-works">Process</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact" className="nav-cta">Get a Free Quote</a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        {/* Shader background */}
        <div className="hero-shader-bg">
          <ShaderAnimation />
        </div>
        <div className="hero-overlay" />
        <div className="container hero-grid">
          <div className="hero-left">
            <span className="hero-tag">Professional Web Development</span>
            <h1>We Build Custom Websites That <span className="red">Grow Your Business</span></h1>
            <p className="hero-desc">From stunning designs to blazing-fast performance — we deliver websites that convert visitors into customers. No templates, no shortcuts.</p>
            <div className="hero-btns">
              <a href="#pricing" className="btn btn-red">View Packages</a>
              <a href="#contact" className="btn btn-outline-white">Get a Free Quote</a>
            </div>
          </div>
          <div className="hero-right">
            <div className="feature-list">
              {['Custom Design','Responsive Development','User-Friendly Interface','Performance Optimisation','Content Management System','Security Features','Analytics & Reporting'].map(f => (
                <div className="feature-item" key={f}>
                  <span className="feature-check">✓</span>
                  <span>{f}</span>
                </div>
              ))}
              <div className="hero-sub-cta">
                <a href="#contact">How Can We Help Your Business? →</a>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="container stats-grid">
          {[['100%','Custom Built — No Templates'],['$299','Websites Starting At'],['Local','NH-Based & Personal'],['48hr','Response Guarantee']].map(([num, label], i) => (
            <React.Fragment key={label}>
              {i > 0 && <div className="stat-divider" />}
              <div className="stat-item"><strong>{num}</strong><span>{label}</span></div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="section bg-light" id="services">
        <div className="container">
          <div className="services-head-box">
            <span className="section-tag">What We Do</span>
            <h4>Everything Your Website Needs to Succeed</h4>
            <p className="section-desc">We handle every aspect of your web presence — from design and development to launch and beyond.</p>
          </div>
          <div className="services-grid">
            {[
              { icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>, title: 'Custom Web Design', desc: 'Unique, brand-aligned designs built from scratch. No templates — every pixel crafted for your business.' },
              { icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>, title: 'Web Development', desc: 'Clean, fast, and scalable code. Built with modern frameworks for rock-solid performance.' },
              { icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>, title: 'Performance Optimisation', desc: 'PageSpeed scores above 95. Fast-loading sites rank higher on Google and convert more visitors.' },
              { icon: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>, title: 'SEO Foundation', desc: 'Every site we build is SEO-ready from day one — structured data, meta tags, and fast load times.' },
              { icon: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>, title: 'E-Commerce Stores', desc: 'Sell online with confidence. Beautiful product pages, smooth checkout, and payment integrations.' },
              { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, title: 'Maintenance & Support', desc: 'Ongoing care packages so your site stays fast, secure, and up to date — long after launch.' },
            ].map(({ icon, title, desc }) => (
              <div className="service-card" key={title}>
                <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>{icon}</svg></div>
                <h5>{title}</h5>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bg-dark" id="how-it-works">
        <div className="container">
          <div className="services-head-box light">
            <span className="section-tag">Our Process</span>
            <h4 className="light">Simple. Transparent. Effective.</h4>
            <p className="section-desc light">From first chat to final launch, we keep things clear and straightforward.</p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">01</div>
              <h5>Discovery Call</h5>
              <p>We learn about your business, goals, and vision. Free 30-minute consultation — no pressure, no sales pitch.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-num">02</div>
              <h5>Design &amp; Build</h5>
              <p>We design your site and send mockups before writing a single line of code. Your feedback shapes everything.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-num">03</div>
              <h5>Launch &amp; Grow</h5>
              <p>We handle the full launch, submit to Google, and provide training so you can manage your site with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section bg-light" id="pricing">
        <div className="container">
          <div className="services-head-box">
            <span className="section-tag">Choose Your Package</span>
            <h4>Straightforward Pricing. No Hidden Fees.</h4>
            <p className="section-desc">Every package includes a strategy call, design mockup, revision rounds, and post-launch support.</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-top">
                <p className="pkg-label">Startup</p>
                <div className="pkg-price"><span className="currency">$</span><span className="amount">299</span></div>
                <p className="pkg-tagline">Get online fast with a professional site that makes a strong first impression.</p>
              </div>
              <ul className="pkg-features">
                <li><span className="chk">✓</span> Up to 5 pages</li>
                <li><span className="chk">✓</span> Mobile responsive</li>
                <li><span className="chk">✓</span> Contact form</li>
                <li><span className="chk">✓</span> Basic SEO setup</li>
                <li><span className="chk">✓</span> 1 revision round</li>
                <li><span className="nope">✗</span> Custom animations</li>
                <li><span className="nope">✗</span> CMS / blog</li>
                <li><span className="nope">✗</span> AI chatbot</li>
              </ul>
              <a href="#contact" className="btn btn-outline-dark btn-full">Get Started</a>
            </div>

            <div className="pricing-card featured">
              <div className="popular-badge">Most Popular</div>
              <div className="pricing-top">
                <p className="pkg-label">Professional</p>
                <div className="pkg-price"><span className="currency">$</span><span className="amount">499</span></div>
                <p className="pkg-tagline">For growing businesses ready to stand out and capture more leads online.</p>
              </div>
              <ul className="pkg-features">
                <li><span className="chk">✓</span> Up to 10 pages</li>
                <li><span className="chk">✓</span> Mobile responsive</li>
                <li><span className="chk">✓</span> Contact + lead forms</li>
                <li><span className="chk">✓</span> Full SEO setup</li>
                <li><span className="chk">✓</span> 3 revision rounds</li>
                <li><span className="chk">✓</span> Custom animations</li>
                <li><span className="chk">✓</span> CMS / blog</li>
                <li><span className="nope">✗</span> AI chatbot</li>
              </ul>
              <a href="#contact" className="btn btn-red btn-full">Get Started</a>
            </div>

            <div className="pricing-card">
              <div className="pricing-top">
                <p className="pkg-label">Business Pro</p>
                <div className="pkg-price"><span className="currency">$</span><span className="amount">749</span></div>
                <p className="pkg-tagline">The complete package — unlimited pages, AI chatbot, and priority support.</p>
              </div>
              <ul className="pkg-features">
                <li><span className="chk">✓</span> Unlimited pages</li>
                <li><span className="chk">✓</span> Mobile responsive</li>
                <li><span className="chk">✓</span> Advanced forms &amp; automation</li>
                <li><span className="chk">✓</span> Advanced SEO + analytics</li>
                <li><span className="chk">✓</span> Unlimited revisions</li>
                <li><span className="chk">✓</span> Custom animations</li>
                <li><span className="chk">✓</span> CMS / blog</li>
                <li><span className="chk chk-gold">✓</span> <strong>AI chatbot included</strong></li>
              </ul>
              <a href="#contact" className="btn btn-outline-dark btn-full">Get Started</a>
            </div>
          </div>
          <p className="pricing-note">Need something bespoke? <a href="#contact">Let&apos;s talk</a> — we build custom solutions too.</p>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h4>Ready to Build Something Remarkable?</h4>
            <p>Let&apos;s turn your vision into a website that works as hard as you do.</p>
          </div>
          <a href="#contact" className="btn btn-red btn-lg">Start Your Project</a>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section bg-light" id="contact">
        <div className="container contact-grid">
          <div className="contact-left">
            <span className="section-tag">Let&apos;s Talk</span>
            <h4>Start the Conversation</h4>
            <p>Tell us about your project and we&apos;ll get back to you within 24 hours with ideas and a no-obligation quote.</p>
            <div className="contact-info">
              <a href="tel:+14132753135">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.08 6.08l1.56-1.56a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                (413) 275-3135
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" name="name" placeholder="John Smith" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="john@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label>Service Needed</label>
              <select name="service">
                <option value="">Select a service…</option>
                <option>New Website</option>
                <option>Website Redesign</option>
                <option>E-Commerce Store</option>
                <option>Landing Page</option>
                <option>Maintenance / Support</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tell Us About Your Project</label>
              <textarea name="message" rows={5} placeholder="What are you looking to build? What's your budget and timeline?" required />
            </div>
            <button type="submit" className="btn btn-red btn-full btn-lg">Send Message</button>
            <p className="form-note">We reply to every message within 24 hours.</p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="#" className="logo">Lakes Region <span>Web Co.</span></a>
            <p>Building websites that grow businesses.</p>
          </div>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Lakes Region Web Co. All rights reserved.</p>
        </div>
      </footer>
      <Chatbot />
    </>
  )
}
