interface Messages {
  [key: string]: {
    fileSelectAlert: string;
    uploadSuccess: (name: string) => string;
    uploadFail: string;
    AuthFail: string;
  };
}

const messages: Messages = {
  ko: {
    fileSelectAlert: "파일을 선택해주세요.",
    uploadSuccess: (name: string) =>
      `${name} 파일 업로드가 완료되었습니다. 변환을 시작하시겠습니까?`,
    uploadFail: "파일 업로드에 실패했습니다. 다시 시도해주세요.",
    AuthFail: "로그인 후 이용해 주세요.",
  },
  en: {
    fileSelectAlert: "Please select a file.",
    uploadSuccess: (id: string) =>
      `File ${id} has been uploaded. Would you like to start the conversion?`,
    uploadFail: "File upload failed. Please try again.",
    AuthFail: "Please log in to use this service.",
  },
};

export default messages;
