"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface GalleryItem {
  id: string
  title: string
  description: string
  href: string
  image: string
}

interface Gallery4Props {
  title?: string
  description?: string
  items: GalleryItem[]
}

export function Gallery4({ title, description, items }: Gallery4Props) {
  return (
    <section className="section bg-light" id="clients">
      <div className="container">
        <div className="services-head-box">
          <span className="section-tag">Our Work</span>
          {title && <h4>{title}</h4>}
          {description && <p className="section-desc">{description}</p>}
        </div>
        <div className="relative px-12">
          <Carousel opts={{ align: "start", loop: items.length > 1 }}>
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/2">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group rounded-xl overflow-hidden border border-[var(--border)] bg-white transition-all duration-300 hover:border-[var(--red)] hover:shadow-lg hover:-translate-y-1"
                  >
                    <div style={{width:'100%', aspectRatio:'16/9', overflow:'hidden', background:'var(--bg-light)'}}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', transition:'transform 0.5s ease', display:'block'}}
                        className="group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h5 className="font-semibold text-[var(--grey)] mb-2" style={{fontFamily:'Ubuntu, sans-serif', fontSize:'17px'}}>{item.title}</h5>
                      <p style={{fontSize:'14px', color:'var(--mid-grey)', lineHeight:'1.6'}}>{item.description}</p>
                      <span style={{display:'inline-block', marginTop:'12px', fontSize:'13px', fontWeight:600, color:'var(--red)'}}>
                        Visit Site →
                      </span>
                    </div>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            {items.length > 2 && (
              <>
                <CarouselPrevious className="border-[var(--border)] hover:border-[var(--red)] hover:text-[var(--red)]" />
                <CarouselNext className="border-[var(--border)] hover:border-[var(--red)] hover:text-[var(--red)]" />
              </>
            )}
          </Carousel>
        </div>
      </div>
    </section>
  )
}
