// components/WorkoutItem.js

// React의 useState 훅을 가져옵니다. 이 훅을 사용하면 함수형 컴포넌트 안에서 상태(데이터)를 관리할 수 있습니다.
import { useState } from 'react';

// WorkoutItem이라는 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 개별 운동 기록을 화면에 보여주고 관리합니다.
// props는 부모 컴포넌트로부터 전달받는 데이터를 담는 객체입니다. 여기서는 주로 'item'이라는 운동 기록 객체와,
// 삭제 및 업데이트를 위한 함수들을 받습니다.
function WorkoutItem(props) {
  // isEditing 상태 변수는 현재 운동 기록이 '수정 모드'인지 아닌지를 나타냅니다.
  // 초기값은 false로, 처음에는 수정 모드가 아님을 의미합니다.
  const [isEditing, setIsEditing] = useState(false);

  // 수정 모드일 때 사용자가 입력할 값을 임시로 저장하는 상태 변수들입니다.
  // 초기값은 props로 받아온 현재 운동 기록(props.item)의 값들로 설정됩니다.
  const [editedSets, setEditedSets] = useState(props.item.sets); // 수정할 세트 수
  const [editedReps, setEditedReps] = useState(props.item.reps); // 수정할 횟수
  const [editedWeight, setEditedWeight] = useState(props.item.weight); // 수정할 무게

  // '삭제' 버튼을 눌렀을 때 실행될 함수입니다.
  function handleDelete() {
    // 부모 컴포넌트로부터 전달받은 'onDelete' 함수를 호출합니다.
    // 이 함수에 현재 운동 기록의 고유 ID(props.item.id)를 전달하여,
    // 부모 컴포넌트에서 해당 ID를 가진 기록을 삭제하도록 요청합니다.
    props.onDelete(props.item.id);
  }

  // '완료/미완료' 상태를 토글(변경)할 때 실행될 함수입니다.
  // 이 기능은 현재 주석 처리되어 있어 실제로는 동작하지 않습니다. (필요 시 활성화 가능)
  function handleToggleCompleted() {
    // 현재 운동 기록의 완료 상태(completed)를 반대로 바꿉니다. (true면 false로, false면 true로)
    const newCompleted = !props.item.completed;
    // 부모 컴포넌트의 'onUpdate' 함수를 호출합니다.
    // 현재 기록의 ID와 함께, 변경될 'completed' 상태를 객체 형태로 전달하여 업데이트를 요청합니다.
    props.onUpdate(props.item.id, { completed: newCompleted });
  }

  // '수정' 버튼을 눌렀을 때 실행될 함수입니다.
  function handleEdit() {
    // isEditing 상태를 true로 변경하여, 컴포넌트가 '수정 모드'로 전환되도록 합니다.
    setIsEditing(true);
  }

  // 수정된 내용을 '저장' 버튼을 눌렀을 때 실행될 함수입니다.
  function handleSaveEdit() {
    // 부모 컴포넌트의 'onUpdate' 함수를 호출합니다.
    // 현재 기록의 ID와 함께, 수정된 세트, 횟수, 무게 값을 객체 형태로 전달하여 업데이트를 요청합니다.
    props.onUpdate(props.item.id, {
      sets: editedSets, // editedSets 상태의 값으로 업데이트
      reps: editedReps, // editedReps 상태의 값으로 업데이트
      weight: editedWeight, // editedWeight 상태의 값으로 업데이트
    });
    // 저장이 완료되면 isEditing 상태를 false로 변경하여, 다시 '보기 모드'로 전환합니다.
    setIsEditing(false);
  }

  // 이 컴포넌트가 화면에 보여줄 내용을 반환합니다. JSX 문법을 사용합니다.
  return (
    // 운동 기록 하나의 컨테이너 div입니다.
    // `workout-item` 클래스는 기본으로 적용되고,
    // 만약 운동이 완료(props.item.completed가 true)되었다면 `completed` 클래스도 추가되어
    // CSS를 통해 완료된 항목에 특별한 스타일을 적용할 수 있습니다.
    <div className={`workout-item ${props.item.completed ? 'completed' : ''}`}>
      {/* 운동 기록 날짜를 표시합니다. 🗓️ 이모지는 날짜 아이콘을 의미합니다. */}
      <p className="workout-date">🗓️ {props.item.date}</p>
      {/* 운동 이름을 큰 제목으로 표시합니다. */}
      <h3>{props.item.workoutName}</h3>

      {/* 조건부 렌더링: isEditing 상태에 따라 다른 내용을 보여줍니다. */}
      {isEditing ? (
        // isEditing이 true일 경우 (수정 모드)
        <div className="edit-fields">
          {/* 세트 수 수정 input */}
          <label>세트: <input type="number" value={editedSets} onChange={(e) => setEditedSets(e.target.value)} /></label>
          {/* 횟수 수정 input */}
          <label>횟수: <input type="number" value={editedReps} onChange={(e) => setEditedReps(e.target.value)} /></label>
          {/* 무게 수정 input */}
          <label>무게: <input type="number" value={editedWeight} onChange={(e) => setEditedWeight(e.target.value)} /> kg</label>
          {/* 저장 버튼: 클릭 시 handleSaveEdit 함수 실행 */}
          <button onClick={handleSaveEdit}>저장</button>
          {/* 취소 버튼: 클릭 시 isEditing 상태를 false로 변경하여 수정 모드 종료 */}
          <button onClick={() => setIsEditing(false)}>취소</button>
        </div>
      ) : (
        // isEditing이 false일 경우 (일반 보기 모드)
        <div className="workout-details">
          {/* 운동 세부 정보 표시 */}
          <p>세트: {props.item.sets} 세트</p>
          <p>횟수: {props.item.reps} 회</p>
          <p>무게: {props.item.weight} kg</p>
          {/* 운동 완료 상태 표시 (현재 주석 처리됨) */}
          {/* <p className="workout-status">
            상태: {props.item.completed ? '완료 🎉' : '미완료'}
          </p> */}
          {/* 운동 항목에 대한 액션 버튼들 */}
          <div className="item-actions">
            {/* 수정 버튼: 클릭 시 handleEdit 함수 실행 (수정 모드로 전환) */}
            <button onClick={handleEdit}>수정</button>
            {/* 완료/미완료 토글 버튼 (현재 주석 처리됨) */}
            {/* <button onClick={handleToggleCompleted}>
              {props.item.completed ? '미완료로 변경' : '완료로 변경'}
            </button> */}
            {/* 삭제 버튼: 클릭 시 handleDelete 함수 실행 */}
            <button onClick={handleDelete}>삭제</button>
          </div>
        </div>
      )}
    </div>
  );
}

// 이 컴포넌트를 다른 파일에서 가져다 사용할 수 있도록 export(내보내기)합니다.
export default WorkoutItem;