"use client"

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

export function Gallery4({ description, items }: Gallery4Props) {
  return (
    <section className="section bg-dark" id="clients">
      <div className="container">
        <div className="services-head-box light" style={{paddingBottom:'48px'}}>
          <span className="section-tag" style={{fontSize:'16px'}}>Street Cred</span>
          {description && <p className="section-desc light">{description}</p>}
        </div>
        <div className="clients-grid" style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'24px'}}>
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                background: 'var(--dark)',
                border: '1px solid #333',
                borderRadius: '10px',
                overflow: 'hidden',
                textDecoration: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--red)'
                el.style.boxShadow = '0 0 20px rgba(29,111,216,0.4)'
                el.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = '#333'
                el.style.boxShadow = 'none'
                el.style.transform = 'translateY(0)'
              }}
            >
              <div style={{width:'100%', height:'220px', overflow:'hidden', background:'#111'}}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', display:'block'}}
                />
              </div>
              <div style={{padding:'28px'}}>
                <h5 style={{fontFamily:'Ubuntu, sans-serif', fontSize:'18px', fontWeight:600, color:'#fff', marginBottom:'10px'}}>{item.title}</h5>
                <p style={{fontSize:'14px', color:'var(--light-grey)', lineHeight:'1.7', marginBottom:'18px'}}>{item.description}</p>
                <span style={{fontSize:'13px', fontWeight:600, color:'var(--red)'}}>Visit Site →</span>
              </div>
            </a>
          ))}
        </div>
        <style>{`
          @media (max-width: 768px) {
            .clients-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
