import React from 'react'
import humanized_time_span from '../../utils/humanizedTimeSpan'
import stripUrl from '../../utils/urlExtractor'
import { v4 as uuidv4 } from 'uuid'
import '../../styles/list.scss'

class ListComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: this.props.data, hits: [] }
  }

  componentDidMount() {
    if (this.props) {
      const dataTolocalStorage = JSON.stringify(this.props.data)
      localStorage.setItem('propData', dataTolocalStorage)
      const dataLog = localStorage.getItem('propData')
    }
  }

  handleHideRow = e => {
    e.preventDefault()
    const { data } = this.state
    const objId = e.target.dataset.hiderow
    const updatedList = data.filter(element => element.objectID != objId)

    this.setState({ data: updatedList })
  }

  handleCountUpVote = e => {
    e.preventDefault()
    const { data } = this.state
    const objId = e.target.dataset.object
    const objIndex = data.findIndex(obj => obj.objectID == objId)
    data[objIndex].points = data[objIndex].points + 1
    if (data) {
      const dataTolocalStorage = JSON.stringify(data)
      localStorage.setItem('propData', dataTolocalStorage)
      const dataLog = localStorage.getItem('propData')
      this.setState({ data: JSON.parse(dataLog) })
    }
  }

  render() {
    const { data } = this.state
    return (
      <ul className="list">
        {data ? (
          data.map((item, index) => (
            <li
              className="cont__list flex-grid-thirds "
              key={uuidv4()}
              data-listData={item}
            >
              <span className="cont__list--comments col--1">
                {item.num_comments || 0}
              </span>{' '}
              <span className="cont__list--points col--2">{item.points}</span>
              <span className="cont__list--iconUpvote col--3">
                <a
                  href="#"
                  data-object={item.objectID}
                  onClick={this.handleCountUpVote}
                >
                  <img
                    className="upvote_img"
                    src="https://res.cloudinary.com/dzv04vpsy/image/upload/v1590508899/uparrow_iiwbev.png"
                    alt="upvote"
                  />
                </a>
              </span>
              <span className="cont__list--title ">
                {item.title || 'no title avaliable'}
              </span>{' '}
              <span className="cont__list--url ">({stripUrl(item.url)})</span>
              <span className="cont__list--author ">
                <a
                  href={`?tags=story,author_${item.author}`}
                >{`by ${item.author}`}</a>
              </span>
              <span className="cont__list--updated-at ">
                {humanized_time_span(item.created_at)}
              </span>
              <span className="const__list--hide ">
                <a
                  href="#"
                  data-hiderow={item.objectID}
                  onClick={this.handleHideRow}
                >
                  [hide]
                </a>
              </span>
            </li>
          ))
        ) : (
          <li className="default__text">
            I make rss provide you readable Rss Feed of blogs.
          </li>
        )}
      </ul>
    )
  }
}

export default ListComponent
