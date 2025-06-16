// App.js

// React에서 상태(데이터)를 관리할 때 사용하는 useState 훅을 가져옵니다.
import { useState } from 'react';
// 이 앱의 전체적인 디자인을 담당하는 CSS 파일을 가져옵니다.
import './App.css';
// 운동 기록을 추가하는 폼 컴포넌트를 가져옵니다.
import WorkoutForm from './components/WorkoutForm';
// 운동 기록 목록을 보여주는 컴포넌트를 가져옵니다.
import WorkoutList from './components/WorkoutList';

// App이라는 이름의 함수형 컴포넌트를 정의합니다. 이 컴포넌트가 앱의 메인 화면을 구성합니다.
function App() {
  // useState를 사용하여 'workouts'라는 상태 변수를 만듭니다.
  // 이 변수에는 사용자의 모든 운동 기록이 배열 형태로 저장됩니다.
  // setWorkouts는 이 'workouts' 상태를 업데이트할 때 사용하는 함수입니다.
  // 초기값은 빈 배열([])로 설정되어 있습니다.
  const [workouts, setWorkouts] = useState([]); // '할 일' 대신 '운동 기록'으로 이해하면 됩니다.

  // 새로운 운동 기록을 생성하는 함수입니다. 'data'는 WorkoutForm에서 넘어온 운동 정보를 담고 있습니다.
  function createWorkoutLog(data) {
    // 운동 이름이 비어있는지 확인합니다. trim()은 앞뒤 공백을 제거합니다.
    if (!data.workoutName.trim()) {
      // 운동 이름이 없으면 사용자에게 알림 메시지를 띄웁니다.
      alert('운동 이름을 입력해주세요.');
      return; // 함수 실행을 여기서 중단합니다.
    }
    // 현재 시간을 밀리초 단위로 가져와 고유한 ID로 사용합니다.
    data.id = Date.now();
    // 현재 날짜를 지역 설정에 맞는 문자열 형태로 추가합니다. (예: 2023. 10. 26.)
    data.date = new Date().toLocaleDateString();
    // 기존 운동 기록 배열(workouts)에 새로운 데이터(data)를 추가하여 새로운 배열을 만듭니다.
    // 전개 구문(...)을 사용하여 불변성(원본 데이터를 직접 수정하지 않는 것)을 유지합니다.
    setWorkouts([...workouts, data]);
    // 개발자 도구의 콘솔에 새로 생성된 운동 기록을 출력하여 확인합니다.
    console.log('createWorkoutLog', data);
  }

  // 특정 ID를 가진 운동 기록을 삭제하는 함수입니다.
  function deleteWorkoutLog(id) {
    // workouts 배열에서 삭제할 ID(id)와 일치하지 않는 운동 기록들만 필터링하여 새로운 배열을 만듭니다.
    const newWorkouts = workouts.filter((workout) => workout.id !== id);
    // 필터링된 새로운 배열로 'workouts' 상태를 업데이트합니다.
    setWorkouts(newWorkouts);
  }

  // 특정 ID를 가진 운동 기록을 업데이트하는 함수입니다.
  // 'id'는 업데이트할 기록의 ID이고, 'data'는 업데이트할 내용을 담은 객체입니다.
  function updateWorkoutLog(id, data) {
    // 업데이트할 운동 기록의 인덱스(위치)를 찾습니다.
    const workoutIndex = workouts.findIndex((workout) => workout.id === id);
    // 해당하는 운동 기록이 없으면 -1을 반환합니다.
    if (workoutIndex === -1) {
      alert('해당하는 운동 기록이 없습니다.');
      return; // 함수 실행을 중단합니다.
    }
    // 불변성을 유지하기 위해 현재 'workouts' 배열을 복사합니다.
    const updatedWorkouts = [...workouts];
    // 해당 인덱스의 운동 기록에 새로운 데이터(data)를 병합하여 업데이트합니다.
    // 기존 기록(...updatedWorkouts[workoutIndex])에 data의 속성들을 덮어쓰고, id도 명시적으로 포함합니다.
    updatedWorkouts[workoutIndex] = { ...updatedWorkouts[workoutIndex], ...data, id };
    // 업데이트된 배열로 'workouts' 상태를 설정합니다.
    setWorkouts(updatedWorkouts);
  }

  // App 컴포넌트가 화면에 보여줄 내용을 반환합니다. JSX 문법을 사용합니다.
  return (
    // 앱의 전체 컨테이너입니다. CSS 클래스 "App"이 적용됩니다.
    <div className="App">
      {/* 앱의 제목입니다. 💪 이모지는 운동의 의미를 더해줍니다. */}
      <h1>💪 운동 일지</h1>
      {/* WorkoutForm 컴포넌트를 렌더링하고, 운동 기록 생성 함수(createWorkoutLog)를 'onCreate'라는 이름으로 전달합니다. */}
      <WorkoutForm onCreate={createWorkoutLog} />
      {/* WorkoutList 컴포넌트를 렌더링하고,
          현재 운동 기록 배열(workouts)을 'items'로,
          기록 삭제 함수(deleteWorkoutLog)를 'onDelete'로,
          기록 업데이트 함수(updateWorkoutLog)를 'onUpdate'로 전달합니다. */}
      <WorkoutList items={workouts} onDelete={deleteWorkoutLog} onUpdate={updateWorkoutLog} />
    </div>
  );
}

// 이 App 컴포넌트를 다른 파일(예: index.js)에서 가져다 사용할 수 있도록 내보냅니다.
export default App;