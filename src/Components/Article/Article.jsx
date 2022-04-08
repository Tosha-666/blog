import React from 'react'

import './Article.scss'
import avatar from '../../images/user-avatar.svg'

const Article = () => {
  return (
    <div className="article-container">
      <div className="article-preview">
        <div className="article-info">
          <div className="article-header">
            <span className="article-title">Some article title</span>
            <button className="article-like"></button>
            <span className="article-like-count">10</span>
          </div>
          <div className="article-tag-list">
            <span className="article-tag-item">Tag</span>
          </div>
          <span className="article-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </span>
        </div>
        <div className="user-personalize">
          <div className="people-info">
            <div className="user-name-wrapper">
              <span className="article-author-name">John Doe</span>
              <span className="article-release-date">March 5, 2020</span>
            </div>
            <img src={avatar} alt="" className="article-author-image" />
          </div>
          <div className="article-edit">
            <button className="delete">Delete</button>
            <button className="edit">Edit</button>
          </div>
        </div>
        <span className="article-content-all">
          Est Ampyciden pater patent Amor saxa inpiger Lorem markdownum Stygias
          neque is referam fudi, breve per. Et Achaica tamen: nescia ista
          occupat, illum se ad potest humum et. Qua deos has fontibus Recens nec
          ferro responsaque dedere armenti opes momorderat pisce, vitataque et
          fugisse. Et iamque incipiens, qua huius suo omnes ne pendentia citus
          pedum. Quamvis pronuba Ulli labore facta. Io cervis non nosterque
          nullae, vides: aethere Delphice subit, tamen Romane ob cubilia
          Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic
          nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est
          relicto ingemuit finiat Pelia uno cernunt Venus draconem, hic,
          Methymnaeae. 1. Clamoribus haesit tenentem iube Haec munera 2. Vincla
          venae 3. Paris includere etiam tamen 4. Superi te putria imagine
          Deianira 5. Tremore hoste Esse sed perstat capillis siqua
        </span>
      </div>
    </div>
  )
}
export default Article
