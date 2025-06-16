// components/WorkoutForm.js

// React의 useState 훅을 가져옵니다. useState는 함수형 컴포넌트에서 상태(데이터)를 관리할 수 있게 해줍니다.
import { useState } from 'react';

// WorkoutForm이라는 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 운동 기록을 추가하는 폼을 만듭니다.
// props는 부모 컴포넌트(예: App.js)로부터 전달받는 데이터를 담는 객체입니다.
function WorkoutForm(props) {
  // useState를 사용하여 폼의 각 입력 필드에 대한 상태 변수를 만듭니다.
  // 첫 번째 값(workoutName)은 현재 상태 값이고, 두 번째 값(setWorkoutName)은 이 상태를 업데이트하는 함수입니다.
  // 괄호 안의 ''는 초기 상태 값으로, 여기서는 빈 문자열입니다.
  const [workoutName, setWorkoutName] = useState(''); // 운동 이름 상태
  const [sets, setSets] = useState(''); // 세트 수 상태
  const [reps, setReps] = useState(''); // 횟수 상태
  const [weight, setWeight] = useState(''); // 무게 상태

  // 폼이 제출(submit)될 때 실행될 함수입니다.
  function handleSubmit(event) {
    // event.preventDefault()는 폼 제출 시 페이지가 새로고침되는 기본 동작을 막아줍니다.
    // React 앱에서는 보통 페이지 새로고침 없이 데이터를 처리합니다.
    event.preventDefault();

    // 폼에서 입력받은 값들을 모아서 하나의 'data' 객체를 만듭니다.
    const data = {
      workoutName: workoutName, // 현재 운동 이름 상태 값
      sets: sets, // 현재 세트 수 상태 값
      reps: reps, // 현재 횟수 상태 값
      weight: weight, // 현재 무게 상태 값
      completed: false // 운동 완료 여부 (기본값은 '미완료'인 false로 설정)
    };

    // 부모 컴포넌트(App.js)로부터 'onCreate'라는 이름으로 전달받은 함수를 호출합니다.
    // 이 함수에 위에서 만든 'data' 객체를 전달하여 부모 컴포넌트에서 새로운 운동 기록을 추가하도록 합니다.
    // 주석에 적힌 'App.js의 createWorkoutLog 호출'은 onCreate prop이 App.js의 createWorkoutLog 함수와 연결되어 있음을 알려줍니다.
    props.onCreate(data);

    // 폼 제출 후, 모든 입력 필드를 초기화(다시 빈 문자열로)하여 다음 입력을 준비합니다.
    setWorkoutName('');
    setSets('');
    setReps('');
    setWeight('');
  }

  // 이 컴포넌트가 화면에 보여줄 내용을 반환합니다. JSX 문법을 사용합니다.
  return (
    // 최상위 div로 폼을 감쌉니다. CSS 스타일링을 위해 "workout-form" 클래스 이름을 부여했습니다.
    <div className="workout-form">
      {/* 폼 요소입니다. onSubmit 속성은 폼이 제출될 때 handleSubmit 함수를 실행하도록 설정합니다. */}
      <form onSubmit={handleSubmit}>
        {/* 운동 이름을 입력하는 input 필드입니다. */}
        <input
          type="text" // 텍스트 입력 필드
          placeholder="운동 이름을 입력하세요 (예: 스쿼트)" // 입력하기 전 사용자에게 보여줄 안내 문구
          value={workoutName} // 이 input 필드의 현재 값은 workoutName 상태와 연결됩니다. (제어 컴포넌트)
          // input 값이 변경될 때마다(사용자가 타이핑할 때마다) setWorkoutName 함수를 호출하여
          // workoutName 상태를 새로운 입력 값(e.target.value)으로 업데이트합니다.
          onChange={(e) => setWorkoutName(e.target.value)}
        />
        {/* 세트 수를 입력하는 input 필드입니다. */}
        <input
          type="number" // 숫자만 입력 가능한 필드
          placeholder="세트 수"
          value={sets} // sets 상태와 연결
          onChange={(e) => setSets(e.target.value)} // sets 상태 업데이트
        />
        {/* 횟수를 입력하는 input 필드입니다. */}
        <input
          type="number" // 숫자만 입력 가능한 필드
          placeholder="횟수"
          value={reps} // reps 상태와 연결
          onChange={(e) => setReps(e.target.value)} // reps 상태 업데이트
        />
        {/* 무게를 입력하는 input 필드입니다. */}
        <input
          type="number" // 숫자만 입력 가능한 필드
          placeholder="무게 (kg)"
          value={weight} // weight 상태와 연결
          onChange={(e) => setWeight(e.target.value)} // weight 상태 업데이트
        />
        {/* 폼 제출 버튼입니다. type="submit"으로 설정하면 폼 내부에서 Enter 키를 눌러도 제출됩니다. */}
        <button type="submit">기록 추가</button>
      </form>
    </div>
  );
}

// 이 컴포넌트를 다른 파일에서 가져다 사용할 수 있도록 export(내보내기)합니다.
export default WorkoutForm;