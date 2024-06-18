import logo from './logo.svg';
import './App.css';
import _ from 'lodash'; 
import { useState } from 'react';


function App() {
	
	
	let blog = '내 블로그';
	
  	let [posts,setPosts] =  useState([
		['강남 우동맛집',0],
		['홍대 라멘맛집',0],
		['동대문 닭칼국수 맛집',0]
	]); 
  	const [postFixText,setPostFixText] = useState('');
    const [postFixIndex,setPostFixIndex] = useState(null);
    const [postAdd,setPostAdd] = useState(false);
    const [sortMethod,setSortMethod] = useState('lick');
    const [buttonText,setButtonText] = useState('글쓰기');
    const [modal, setModel] = useState(false);

    // 2차원 배열을 사용하기 때문에 좋아요 를 누를때 배열의 두번째에 값을 +1해줘야함.
    const likeUp = (index) =>{
	
      let newPost = [...posts];
      newPost[index] = [newPost[index][0], newPost[index][1]+1];
      if(sortMethod === 'lick'){
      newPost = newPost.sort((a,b)=>b[1]-a[1]);
    }
      setPosts(newPost);
    
    }
    // 버튼에 input 값을 넣어줄수 없기에 input 값 변경시 useState에 데이터를 넣어줌
    const onChangeText = (e) => {
      setPostFixText(e.target.value);
    }
    
    // 글수정 탭을 여는 함수, 몇번째에 있는 글수정 탭을 열어야하는지 알아야되기 때문에 몇번째에 있는 글인지 확인해줌
    const editText = (index) =>{
      setPostFixIndex(index);
    }
    
    // 글 수정
    const fixPost = (index) => {
    if(postFixText.length<3){
      alert("너무 짧게 썻어요");
    return;
    }

      let newPost = [...posts];
      newPost[index] = [postFixText, newPost[index][1]];
      
      setPosts(newPost);
    
      setPostFixIndex(null);
    }

    // 글 삭제.

    const deletePost = (index) => {
      let copy = [...posts]
      let newPost = copy.filter((_, i)=> i !== index);
    
     setPosts(newPost);
    }

    //게시글 작성할때 사용. 글의 길이비교 이후 글작성 및 창 축소, 버튼값 변경
    const addPost = () =>{
      if(postFixText.length < 3){
        alert("너무 짧게 썻어요");
        return;
      }
      let newPost = [...posts]
      newPost.push([postFixText, 0]);
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

    }
    
    let method = (
      <div>
      정렬순서 <select name="animal_list" onChange={sortMethodPlay}>
            <option value="lick" >좋아요</option>
            <option value="alphabetically">가나다</option>

        </select>
      </div>

    );

  //   글 리스트 출력
  // 	let post = _.map(posts, (postInfo, index) => (
  //   	<h4 key={index}><div onClick={()=> setModel((modal?false:true))}>{postInfo[0]}</div> <span onClick={()=> likeUp(index)}>[좋아요]</span> {postInfo[1]}
  //     <br />
  //     <button onClick={()=>editText(index)}>글수정</button><button onClick={()=>deletePost(index)}>글삭제</button>
  //       {postFixIndex === index ?(
  //         <div>
  //           <input type="text" placeholder={postInfo[0]} onChange={onChangeText} />
  //           <button onClick={()=>fixPost(index)}>저장</button>
  //         </div>
  //       ):null
  //     }                
  //     <hr />
  //     </h4>
  // ));

// 새로운 글 작성
  let insertText = (
    <div>
    <button onClick={()=>PostAddButton()}>{buttonText}</button>
    <br />

    {postAdd && (
      <div>
      <input type="text" placeholder="새로운 글 작성중" onChange={onChangeText} />
      <br/>
      <button onClick={()=>addPost()}>저장</button>
      </div>
      
    )}
    </div>
  )



  return (
    <div className="App">
		<div className="black-nav">    
		<h4 >{blog}</h4>
		</div>
    <h4>{method}</h4>
    {
      posts.map(function(postInfo, index){
        return (
          <h4 key={index}><div onClick={()=> setModel((modal?false:true))}>{postInfo[0]}</div> <span onClick={()=> likeUp(index)}>[좋아요]</span> {postInfo[1]}
          <br />
          <button onClick={()=>editText(index)}>글수정</button><button onClick={()=>deletePost(index)}>글삭제</button>
            {postFixIndex === index ?(
    
              <div>
                <input type="text" placeholder={postInfo[0]} onChange={onChangeText} />
    
                <button onClick={()=>fixPost(index)}>저장</button>
              </div>
            ):null
          }                
          <hr />
          </h4>

        )
      })

    }

    <h4>{ insertText }</h4>
    {modal ?(
    <PostRead/>
    ):null
}
	</div>
  );
};

function PostRead(){
  return (
		<div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}
export default App;
