// fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  console.log(data.data);
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  // console.log(phones)
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 6) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  phones = phones.slice(0, 6);
  phones.forEach((phone) => {
    console.log(phone);
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
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
        <button class="btn btn-primary">Buy Now</button>
        </div>
    </div>
    `;
    // append child
    phoneContainer.appendChild(phoneCard);
  });
  toggleSpinner(false);
};

const handleSearch = () => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText);
};

const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading === true) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

// loadPhone();
