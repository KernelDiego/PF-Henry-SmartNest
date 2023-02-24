import React from 'react'

export const NewsHome = () => {
const imagesNews=[
  "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2020/08/26-noticias-tecnologia-comenzar-manana-informado-ultimo-2024411.jpg",
  "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2020/09/25-noticias-tecnologia-comenzar-manana-informado-ultimo-2058681.jpg",
  "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/09/29-noticias-tecnologia-comenzar-manana-informado-ultimo-2822215.jpg",
  "https://ichef.bbci.co.uk/news/640/cpsprodpb/17DEE/production/_117347779_tumundo_opcion2copy.png",
  "https://www.semana.com/resizer/g5TukiBvL6oC5_REJWhV5GPXgrc=/arc-anglerfish-arc2-prod-semana/public/FP6C4T7ROFE37PQRVGRNXPLRAU.jpeg",
  "https://itpeers.com/wp-content/uploads/2020/10/3570310-copy-scaled.jpg"
]

  return (
    <div className="news_fake_container">
        {imagesNews.map((img:string)=>{
            return(
                <div className='news_fake_card'>
                    <img src={img} alt="news_image" />
              </div>
            )
        })}
    </div>
  )
}
