let photos = [];


// esto es  para mostrar las fotos
function displayPhotos(photos) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  photos.forEach((photo) => {
    const photoElement = document.createElement('div');
    photoElement.classList.add('img-container');
    photoElement.innerHTML = `
      <img src="${photo.image}" alt="${photo.title}">
      <div class="edit-delete-buttons">
        <button class="edit-button" onclick="showEditForm('${photo.id}', '${photo.title}', '${photo.description}')">Editar</button>
        <button class="delete-button" onclick="confirmDelete('${photo.id}')">X</button>
      </div>
      <div class="photo-details">
        <h3>${photo.title}</h3>
        <p>${photo.description}</p>
      </div>
    `;
    gallery.appendChild(photoElement);
  });
}




//                                   agregar foto 
function addPhoto(title, description, image) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const photoId = `photo${Date.now()}`;
    const newPhoto = {
      id: photoId,
      title: title,
      description: description,
      image: e.target.result,
    };

    photos.push(newPhoto);
    displayPhotos(photos);
  };

  reader.readAsDataURL(image);
}





//                                    eliminar  foto 
function deletePhoto(photoId) {
  photos = photos.filter((photo) => photo.id !== photoId);
  displayPhotos(photos);
}






//                            mostrar edición
function showEditForm(photoId, title, description) {
  const editModal = document.getElementById('edit-modal');
  const editTitle = document.getElementById('edit-title');
  const editDescription = document.getElementById('edit-description');
  const editPhotoId = document.getElementById('edit-photo-id');

  editTitle.value = title;
  editDescription.value = description;
  editPhotoId.value = photoId;

  editModal.style.display = 'block';
}
   


//  ocultar edición
function hideEditForm() {
  const editModal = document.getElementById('edit-modal');
  editModal.style.display = 'none';
}





//                          guardar despues de  editar 
function saveEdit() {
  const editTitle = document.getElementById('edit-title');
  const editDescription = document.getElementById('edit-description');
  const editPhotoId = document.getElementById('edit-photo-id').value;

  photos.forEach((photo) => {
    if (photo.id === editPhotoId) {
      photo.title = editTitle.value;
      photo.description = editDescription.value;
    }
  });

  hideEditForm();
  displayPhotos(photos);
}





//                         confirmar para yo saber si lo voy a eliminar  
function confirmDelete(photoId) {
  if (confirm('¿Estás seguro de que deseas eliminar esta foto?')) {
    deletePhoto(photoId);
  }
}





//                          envío del formulario de agregar 
function handleAddFormSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('image').files[0];

  addPhoto(title, description, image);
  event.target.reset();
}




//                             envío del formulario de edición
function handleEditFormSubmit(event) {
  event.preventDefault();
  saveEdit();
}




//                            para los formularios
document.getElementById('add-form').addEventListener('submit', handleAddFormSubmit);
document.getElementById('edit-form').addEventListener('submit', handleEditFormSubmit);
document.getElementById('edit-close-btn').addEventListener('click', hideEditForm);




   //                        cargar en la página todo XD
displayPhotos(photos);
