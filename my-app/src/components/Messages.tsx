interface Messages {
    [key: string]: {
      fileSelectAlert: string;
      uploadSuccess: (id: string) => string;
      uploadFail: string;
    };
  }
  
  const messages: Messages = {
    ko: {
      fileSelectAlert: "파일을 선택해주세요.",
      uploadSuccess: (id: string) => `${id} 파일 업로드가 완료되었습니다. 변환을 시작하시겠습니까?`,
      uploadFail: "파일 업로드에 실패했습니다. 다시 시도해주세요.",
    },
    en: {
      fileSelectAlert: "Please select a file.",
      uploadSuccess: (id: string) => `File ${id} has been uploaded. Would you like to start the conversion?`,
      uploadFail: "File upload failed. Please try again.",
    },
  };
  
  export default messages;