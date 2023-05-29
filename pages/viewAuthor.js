import renderToDOM from '../utils/renderToDom';
import clearDom from '../utils/clearDom';

const viewAuthor = (obj) => {
  clearDom();

  const domString = `
  <div class="mt-5 d-flex flex-wrap">
   <div class="text-white ms-5 details">
   <h4>${obj.first_name} ${obj.last_name}</h4>
   <p>${obj.favorite ? `<span class="sale-badge"><i class="fa fa-star" aria-hidden="true"></i> Favorite</span> 
       ${''}` : `${''}`}</p>
       <i id="edit-author-btn--${obj.firebaseKey}" class="fas fa-edit btn btn-info"></i> 
       <i id="delete-author-btn--${obj.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
   Author Email: <a href="mailto:${obj.email}">${obj.email}</a>
    </div>`;

  renderToDOM('#view', domString);

  let anotherDomString = '';
  obj.bookObject.forEach((item) => {
    anotherDomString += `
    <div class="card">
      <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
      <div class="card-body" style="height: 180px;">
        <h5 class="card-title">${item.title}</h5>
          <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-exclamation" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
      </div>
    </div>`;
    renderToDOM('#store', anotherDomString);
  });
};

export default viewAuthor;
