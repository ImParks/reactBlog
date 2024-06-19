import logo from './logo.svg';
import './App.css';
import _ from 'lodash'; 
import { useState } from 'react';


function App() {
	
	
	let blog = '내 블로그';
	
  	let [posts,setPosts] =  useState([
		['강남 우동맛집',0,'2024년 2월 11일','강남엔 이러한 우동맛집이 있다.'],
		['홍대 라멘맛집',0,'2024년 2월 11일','홍대엔 이러한 라멘 맛집이 있다.'],
		['동대문 닭칼국수 맛집',0,'2024년 2월 11일','동대문엔 이러한 닭칼국수 맛집이 있다.']
	]); 
  	const [postFixText,setPostFixText] = useState('');
    const [postFixTitle,setPostFixTitle] = useState('');
    const [postFixIndex,setPostFixIndex] = useState(null);
    
    const [postAdd,setPostAdd] = useState(false);
    const [sortMethod,setSortMethod] = useState('lick');
    const [buttonText,setButtonText] = useState('글쓰기');
    const [model, setModel] = useState(false);
    const [postIndex,setPostIndex] = useState(null);

    // 2차원 배열을 사용하기 때문에 좋아요 를 누를때 배열의 두번째에 값을 +1해줘야함.
    const likeUp = (index) =>{
	
      let newPost = [...posts];
      newPost[index] = [newPost[index][0], newPost[index][1]+1,newPost[index][2],newPost[index][3]];
      if(!model && sortMethod === 'lick'){
      newPost = newPost.sort((a,b)=>b[1]-a[1]);
    }
    
      setPosts(newPost);
    
    }
    // 버튼에 input 값을 넣어줄수 없기에 input 값 변경시 useState에 데이터를 넣어줌
    const onChangeText = (e) => {
      setPostFixText(e.target.value);
    }
    
    const onChangeTitle = (e) => {
      setPostFixTitle(e.target.value);
    }

    // 글수정 탭을 여는 함수, 몇번째에 있는 글수정 탭을 열어야하는지 알아야되기 때문에 몇번째에 있는 글인지 확인해줌
    const editText = (index) =>{
      setPostFixIndex(index);
    }
    
    // 글 수정
    const fixPost = (index) => {
    if(postFixTitle.length<3 && postFixText.length<3){
      alert("너무 짧게 썻어요");
    return;
    }

      let newPost = [...posts];
      newPost[index] = [postFixTitle, newPost[index][1],newPost[index][2],postFixText];
      
      setPosts(newPost);
    
      setPostFixIndex(null);
    }

    // 글 삭제.

    const deletePost = (index) => {
      let copy = [...posts]
      copy.splice(index,1);
      setModel(false);
      setPostIndex(null);
      setPostFixIndex(null);
     setPosts(copy);
    }

    //게시글 작성할때 사용. 글의 길이비교 이후 글작성 및 창 축소, 버튼값 변경
    const addPost = () =>{
      if(postFixTitle.length<3 && postFixText.length<3){
        alert("너무 짧게 썻어요");
        return;
      }
      let newPost = [...posts]
      let date = new Date();
      const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
      newPost.push([postFixTitle, 0,formattedDate,postFixText]);
      setPosts(newPost)
      setPostAdd(false);
      setButtonText('글쓰기');
    }

    // 버튼 동작할때 버튼에 들어가는 글자와 창을 열고 닫고 하는것
    const PostAddButton = () =>{
      if(postAdd){
        setPostAdd(false);
        setButtonText('글쓰기');
      } else {
        setPostAdd(true);
        setButtonText('쓰기 취소');
      }

    }
    //정렬 방식정하기
    
    const sortMethodPlay = (sortMet) =>{

      setSortMethod(sortMet.target.value);
      let newPost = [...posts];
      if(sortMet.target.value === 'lick'){
        newPost = newPost.sort((a,b)=>b[1]-a[1]);
      }
      if(sortMet.target.value === 'alphabetically'){
        newPost = newPost.sort((a,b)=>(a[0]<b[0])?-1:(b[0]===a[0])?0:1);
      }
      setPosts(newPost);
      setModel(false);

    }
    
    let method = (
      <div>
      정렬순서 <select name="animal_list" onChange={sortMethodPlay}>
            <option value="lick" >좋아요</option>
            <option value="alphabetically">가나다</option>

        </select>
      </div>

    );


// 새로운 글 작성
  let insertText = (
    <div>
    <button onClick={()=>PostAddButton()}>{buttonText}</button>
    <br />

    {postAdd && (
      <div>
      <input type="text" placeholder="제목" onChange={onChangeTitle} />
      <br/>
      <input type="text" placeholder="내용" onChange={onChangeText} />
      <br/>
      <button onClick={()=>addPost()}>저장</button>
      </div>
      
    )}
    </div>
  )
    const modelChange = (index) => {
      let mod = model&&index===postIndex?false:true;
 
      setModel(mod);
      setPostIndex(mod?index:null);
      if(!mod && sortMethod === 'lick'){
        let copy = [...posts];
        copy = copy.sort((a,b)=>b[1]-a[1]);
        setPosts(copy)
      }


    }

  return (
    <div className="App">
		<div className="black-nav">    
		<h4 >{blog}</h4>
		</div>
    <h4>{method}</h4>
    {
      posts.map(function(postInfo, index){
        return (
          <h4 key={index}><div onClick={() => modelChange(index)}>{postInfo[0]}</div> <span onClick={()=> likeUp(index)}>[좋아요]</span> {postInfo[1]}
          <br />
          {model&&postIndex!==null && index === postIndex ?(
           <PostRead post={posts[postIndex]} postIndex = {postIndex} color={'skyblue'} editText = {editText} deletePost={deletePost} onChangeText = {onChangeText} postFixIndex = {postFixIndex} fixPost = {fixPost} onChangeTitle = {onChangeTitle} likeUp = {likeUp}/>
           ):null
          }
          <hr />
          </h4>

        )
      })

    }

    <h4>{ insertText }</h4>

	</div>
  );
};

function PostRead(props){
  return (
		<div className="model" style={{background : props.color}}>
      <h4>{props.post[0]}</h4>
      <p>{props.post[3]}</p>
      <br/>
      <p>{props.post[2]}</p>
      <span onClick={()=> props.likeUp(props.postIndex)}>[좋아요] {props.post[1]}</span>
                <button onClick={()=>props.editText(props.postIndex)}>글수정</button><button onClick={()=>props.deletePost(props.postIndex)}>글삭제</button>
            {props.postFixIndex === props.postIndex ?(
              
              <div>
                <input type="text" placeholder={props.post[0]} onChange={props.onChangeTitle} />
                <input type="text" placeholder={props.post[3]} onChange={props.onChangeText} />
                <button onClick={()=>props.fixPost(props.postIndex)}>저장</button>
              </div>
            ):null
          }     
    </div>
  )
}
export default App;
