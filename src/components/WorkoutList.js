// components/WorkoutList.js

// WorkoutItem 컴포넌트를 가져옵니다. 이 컴포넌트는 개별 운동 기록을 표시하는 역할을 합니다.
import WorkoutItem from './WorkoutItem';

// WorkoutList라는 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 여러 개의 운동 기록을 목록 형태로 보여줍니다.
// props는 부모 컴포넌트(예: App.js)로부터 전달받는 데이터를 담는 객체입니다.
// 여기서는 'items'(운동 기록 목록), 'onUpdate'(기록 업데이트 함수), 'onDelete'(기록 삭제 함수)를 받습니다.
function WorkoutList(props) {
  // 이 컴포넌트가 화면에 보여줄 내용을 반환합니다. JSX 문법을 사용합니다.
  return (
    // 운동 기록 목록 전체를 감싸는 div입니다. CSS 스타일링을 위해 "workout-list" 클래스 이름을 부여했습니다.
    <div className="workout-list">
      {/* 목록의 제목입니다. */}
      <h2>나의 운동 기록</h2>
      {/* 운동 기록 항목들을 담을 순서 없는 목록(unordered list)입니다. */}
      <ul>
        {/* 조건부 렌더링: 운동 기록(props.items)이 비어 있는지 확인합니다. */}
        {props.items.length === 0 ? (
          // 운동 기록이 하나도 없을 경우 보여줄 메시지입니다.
          <p className="no-records">아직 운동 기록이 없네요!💪 첫 기록을 남겨보세요.</p>
        ) : (
          // 운동 기록이 있을 경우, 각 항목(item)을 순회(map)하면서 WorkoutItem 컴포넌트로 변환하여 보여줍니다.
          props.items.map((item) => (
            // 각 목록 항목은 <li> 태그로 감싸고, React에서 목록을 렌더링할 때 필요한 고유한 'key' prop을 부여합니다.
            <li key={item.id}>
              {/* WorkoutItem 컴포넌트를 렌더링합니다. */}
              <WorkoutItem
                // 현재 운동 기록 객체(item)를 WorkoutItem의 'item' prop으로 전달합니다.
                item={item}
                // 부모로부터 받은 'onUpdate' 함수를 WorkoutItem의 'onUpdate' prop으로 전달합니다.
                onUpdate={props.onUpdate}
                // 부모로부터 받은 'onDelete' 함수를 WorkoutItem의 'onDelete' prop으로 전달합니다.
                onDelete={props.onDelete}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

// 이 컴포넌트를 다른 파일에서 가져다 사용할 수 있도록 export(내보내기)합니다.
export default WorkoutList;