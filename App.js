// Código para manejar la galería de fotos
document.addEventListener('DOMContentLoaded', function () {
    const galleryContainer = document.querySelector('.grid');
    const addPhotoBtn = document.getElementById('addPhotoBtn');
    const modal = document.getElementById('modal');
    const photoTitle = document.getElementById('photoTitle');
    const photoDescription = document.getElementById('photoDescription');
    const savePhotoBtn = document.getElementById('savePhotoBtn');
    const deletePhotoBtn = document.getElementById('deletePhotoBtn');

    // Array para almacenar las fotos (simulado, ya que se perderá al recargar la página)
    let photos = [
        { id: 1, title: 'Foto 1', description: 'Descripción de la foto 1' },
        { id: 2, title: 'Foto 2', description: 'Descripción de la foto 2' },
        // Agrega más fotos aquí
    ];

    // Función para mostrar las fotos en la cuadrícula
    function displayPhotos() {
        galleryContainer.innerHTML = '';
        photos.forEach(photo => {
            const photoCard = document.createElement('div');
            photoCard.classList.add('bg-white', 'p-4', 'rounded-md', 'shadow-md');
            photoCard.innerHTML = `
                <img src="ruta_de_la_foto" alt="${photo.title}" class="w-full h-40 object-cover mb-2 rounded">
                <h3 class="font-bold text-xl">${photo.title}</h3>
                <p>${photo.description}</p>
            `;
            // Agregar evento para ver detalles al hacer clic en la foto
            photoCard.addEventListener('click', () => openModal(photo));
            galleryContainer.appendChild(photoCard);
        });
    }

    // Función para abrir el modal y mostrar detalles de la foto
    function openModal(photo) {
        photoTitle.value = photo.title;
        photoDescription.value = photo.description;
        savePhotoBtn.dataset.photoId = photo.id;
        modal.style.display = 'block';
    }

    // Función para cerrar el modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Evento para cerrar el modal al hacer clic fuera de él
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Evento para agregar una nueva foto
    addPhotoBtn.addEventListener('click', () => {
        const newPhoto = {
            id: photos.length + 1,
            title: 'Nuevo Título',
            description: 'Nueva Descripción',
        };
        photos.push(newPhoto);
        displayPhotos();
    });

    // Evento para guardar cambios en la foto
    savePhotoBtn.addEventListener('click', () => {
        const photoId = savePhotoBtn.dataset.photoId;
        const updatedPhoto = {
            id: parseInt(photoId),
            title: photoTitle.value,
            description: photoDescription.value,
        };
        photos = photos.map(photo => photo.id === updatedPhoto.id ? updatedPhoto : photo);
        displayPhotos();
        closeModal();
    });

    // Evento para eliminar una foto
    deletePhotoBtn.addEventListener('click', () => {
        const photoId = deletePhotoBtn.dataset.photoId;
        photos = photos.filter(photo => photo.id !== parseInt(photoId));
        displayPhotos();
        closeModal();
    });

    // Mostrar las fotos al cargar la página
    displayPhotos();
});
