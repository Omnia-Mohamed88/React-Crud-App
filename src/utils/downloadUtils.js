// src/utils/downloadUtils.js
export const DownloadFileFromLocal = async (fileUrl, fileName) => {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', fileName || 'download');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
