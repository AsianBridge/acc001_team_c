// import { useState } from "react";
// import ReactCrop, { Crop } from "react-image-crop";

// const CropDemo = ({ src }: { src: string }) => {
//   const [crop, setCrop] = useState<Crop>({
//     unit: "%", // Can be 'px' or '%'
//     x: 25,
//     y: 25,
//     width: 50,
//     height: 50,
//   });
//   return (
//     <ReactCrop crop={crop} onChange={(crop) => setCrop(crop)}>
//       <img src={src} />
//     </ReactCrop>
//   );
// };

// function changeImageToBase64() {
//   const inputImage = document.getElementById("imageId") as HTMLInputElement;
//   const reader = new FileReader();
//   reader.onload = (event) => {
//     if (event.target != null) {
//       const base64Image = event.target.result;
//       console.log(base64Image);
//     }
//   };
//   if (
//     inputImage != null &&
//     inputImage.files != null &&
//     inputImage.files.length > 0
//   ) {
//     const file = inputImage.files[0];
//     const blob = new Blob([file], { type: file.type });
//     reader.readAsDataURL(blob);
//   }
// }

// export const CropperUploader = () => {
//   const [imgSrc, setImgSrc] = useState<string | ArrayBuffer | null>();
//   return (
//     <input
//       type="file"
//       id="imageId"
//       accept=".jpg"
//       onChange={changeImageToBase64}
//     />
//   );
// };
