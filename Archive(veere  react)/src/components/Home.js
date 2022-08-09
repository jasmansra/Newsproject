import React, { Component } from 'react'
import News from './News'
import Spinner from './Spinner';


export class Home extends Component {
    constructor(){
        super();

        this.state={
            description:'Hello',
            title:'hello',
            myimg: 'https://fakeimg.pl/440x320/282828/eae0d0/?retina=1',
            myarrvalues : [],
            page:0,
            pageSize:9,
            totalPage: 1,
            progress:10, 
            loading : false
        }
 
     }

     async callNewsApi(){

        return    await fetch(
            `https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pagesize=${this.state.pageSize}&page=${this.state.page}`
            ).then(response => response.json());
             
    } 
    
    setProgress(param){
        
        this.setState({ 
            progress:param+50
        }  )
    }

     async componentDidMount(){
        this.setState({
            loading:true
        })
        const actualData = await  this.callNewsApi();
        this.setProgress(50)
         this.setState({
            title:actualData.articles[0].title,
            myimg:actualData.articles[0].urlToImage,
            description:actualData.articles[0].description,
            myarrvalues: actualData.articles,
            totalPage : Math.ceil(actualData.totalResults/this.state.pageSize),
            loading:false
        })
        this.setProgress(90)
     }
  
   handlenextpage = async ()=>{
    this.setState({
        loading:true
    })
    const actualData = await  this.callNewsApi();

  
     this.setState({
        title:actualData.articles[0].title,
        myimg:actualData.articles[0].urlToImage,
        description:actualData.articles[0].description,
        myarrvalues: actualData.articles,
        page : this.state.page + 1,
        totalPage : Math.ceil(actualData.totalResults/this.state.pageSize) +1,
        loading : false
    })
  }


  handlepreviouspage = async ()=>{
    this.setState({
        loading:true
    })
    
    const actualData = await  this.callNewsApi();
     this.setState({
        title:actualData.articles[0].title,
        myimg:actualData.articles[0].urlToImage,
        description:actualData.articles[0].description,
        myarrvalues: actualData.articles,
        totalPage : Math.ceil(actualData.totalResults/this.state.pageSize) +1,
        page : this.state.page - 1,
        loading : false
    })
  }

  render() { 
      console.log(this.state.page)
    return (
        <>
      <div className='mt-5 mb-5 row col-md-12'>
      <div className='mt-5 mb-5 row float-end'>
             <div className='col-md-12'>

             <button disabled={(this.state.page === 1)? true :false}  id="myprev" style={{width:'200px'}} onClick={this.handlepreviouspage} className='btn btn-primary '>Previous</button>
         <button disabled={(this.state.page === this.state.totalPage)? true :false}  style={{width:'200px'}} onClick={this.handlenextpage} className='btn btn-primary float-end' >Next</button>
             </div>
      
          </div>
    
   {this.state.loading && <Spinner/> } 
         {
             this.state.myarrvalues.map((item,i) => <News key={i} title={item.title?item.title.substring(1, 20):'Fake Title'} pictre={item.urlToImage?item.urlToImage:'https://fakeimg.pl/440x320/282828/eae0d0/?retina=1'} desc={item.description?item.description.substring(1, 50):'Fake Description'} />)

         } 
        
        </div>
        </>
    )
  }
}

export default Home
