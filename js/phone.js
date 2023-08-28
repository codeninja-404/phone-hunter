// fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();

  displayPhones(data.data, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones)
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 6 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 6);
  }
  phones.forEach((phone) => {
    // 1 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-200 shadow-xl`;
    // 2 set inner html
    phoneCard.innerHTML = `
    <figure class="px-10 pt-10">
        <img
        src="${phone.image}"
        alt="Phone"
        class="rounded-xl"
        />
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        
        <div class="card-actions">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
    </div>
    `;
    // append child
    phoneContainer.appendChild(phoneCard);
  });
  toggleSpinner(false);
};

const handleShowDetails = async (id) => {
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  
  const showDetailContainer = document.getElementById('show-detail-container')
  showDetailContainer.innerHTML= `
  <figure class="px-10 pt-10">
        <img
        src="${phone.image}"
        alt="Phone"
        class="rounded-xl mx-auto"
        />
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title font-bold text-3xl">${phone.name}</h2>
        <p> <span class="text-xl font-bold">Storage : </span>${phone.mainFeatures.storage}</p>
        
    </div>
  `
  show_details_modal.showModal();
};

const handleSearch = (isShowAll) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading === true) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};

// loadPhone();
