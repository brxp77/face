// Carregando os modelos (certifique-se de ter os arquivos de modelo na pasta /models)
async function loadModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
}

// Função para detectar rostos e marcar os pontos faciais
async function detectFace(imageElement, canvasElement) {
    const detections = await faceapi.detectAllFaces(imageElement).withFaceLandmarks();
    const resizedDetections = faceapi.resizeResults(detections, imageElement);
    
    // Desenhe as caixas delimitadoras e marcos faciais no Canvas
    const ctx = canvasElement.getContext('2d');
    faceapi.draw.drawDetections(canvasElement, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvasElement, resizedDetections);
}

// Carregue os modelos e execute a detecção quando a imagem estiver pronta
async function main() {
    await loadModels();
    const imageElement = document.getElementById('my-image'); // Obtenha a imagem
    const canvasElement = document.getElementById('my-canvas'); // Obtenha o elemento Canvas
    await detectFace(imageElement, canvasElement);
}

// Execute a função principal quando a página estiver carregada
window.addEventListener('load', main);