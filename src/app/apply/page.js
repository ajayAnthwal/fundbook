// "use client";
// import { useState } from 'react';
// import Stage1 from './components/Stage1';
// import Stage2 from './components/Stage2';
// import Stage3 from './components/Stage3';
// import Stage4 from './components/Stage4';

// export default function ApplyLoan() {
//   const [currentStage, setCurrentStage] = useState(1);
//   const [formData, setFormData] = useState({
//     stage1: {},
//     stage2: {},
//     stage3: {},
//     stage4: {}
//   });

//   const nextStage = () => {
//     setCurrentStage(prev => prev + 1);
//   };

//   const prevStage = () => {
//     setCurrentStage(prev => prev - 1);
//   };

//   return (
//     <main id="content" role="main" className="container py-5">
//       {/* Progress bar */}
//       <div className="progress mb-5">
//         <div 
//           className="progress-bar" 
//           role="progressbar" 
//           style={{width: `${(currentStage/4)*100}%`}}
//           aria-valuenow={currentStage} 
//           aria-valuemin="0" 
//           aria-valuemax="4"
//         ></div>
//       </div>

//       {/* Stage content */}
//       {currentStage === 1 && (
//         <Stage1 
//           formData={formData.stage1} 
//           setFormData={(data) => setFormData({...formData, stage1: data})}
//           nextStage={nextStage}
//         />
//       )}
//       {currentStage === 2 && (
//         <Stage2 
//           formData={formData.stage2}
//           setFormData={(data) => setFormData({...formData, stage2: data})}
//           nextStage={nextStage}
//           prevStage={prevStage}
//         />
//       )}
//       {currentStage === 3 && (
//         <Stage3 
//           formData={formData.stage3}
//           setFormData={(data) => setFormData({...formData, stage3: data})}
//           nextStage={nextStage}
//           prevStage={prevStage}
//         />
//       )}
//       {currentStage === 4 && (
//         <Stage4 
//           formData={formData.stage4}
//           setFormData={(data) => setFormData({...formData, stage4: data})}
//           prevStage={prevStage}
//         />
//       )}
//     </main>
//   );
// } 