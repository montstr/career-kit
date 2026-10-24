
const products = [
  {
    id: 1,
    name: "Template CV Lokal Indonesia",
    category: "CV & Dokumen",
    originalPrice: 19000,
    price: 13300,
    description: "Template CV yang bisa kamu sesuaikan untuk melamar pekerjaan di Indonesia.",
    art: "cv",
    url: "https://lynk.id/montst/ejy19ej2ryd5",
    features: [
      "Template CV untuk lamaran kerja di Indonesia",
      "Bisa disesuaikan dengan data dan pengalamanmu",
      "Cocok untuk menyusun CV yang lebih rapi",
      "Periksa kembali isi CV sebelum mengirim lamaran"
    ]
  },
  {
    id: 2,
    name: "Template CV International & Remote",
    category: "CV & Dokumen",
    originalPrice: 25000,
    price: 17500,
    description: "Template CV untuk membantu persiapan melamar posisi remote atau perusahaan internasional.",
    art: "cv",
    url: "https://lynk.id/montst/wjd21lwwgze0",
    features: [
      "Template CV untuk peluang internasional dan remote",
      "Sesuaikan isi dengan posisi yang dituju",
      "Cantumkan skill dan pengalaman yang relevan",
      "Periksa persyaratan tiap lowongan sebelum melamar"
    ]
  },
  {
    id: 3,
    name: "Template Surat Lamaran Kerja Indonesia",
    category: "CV & Dokumen",
    originalPrice: 12000,
    price: 8400,
    description: "Template surat lamaran kerja yang bisa disesuaikan dengan perusahaan dan posisi tujuan.",
    art: "letter",
    url: "https://lynk.id/montst/zydp9ll9jjxw",
    features: [
      "Template surat lamaran kerja",
      "Bisa disesuaikan dengan posisi yang dilamar",
      "Bantu menyusun isi surat lebih terstruktur",
      "Periksa kembali detail perusahaan sebelum dikirim"
    ]
  },
  {
    id: 4,
    name: "English Cover Letter",
    category: "CV & Dokumen",
    originalPrice: 15000,
    price: 10500,
    description: "Template cover letter berbahasa Inggris untuk mendukung persiapan lamaran internasional.",
    art: "letter",
    url: "https://lynk.id/montst/48x0vndq8kk3",
    features: [
      "Template cover letter bahasa Inggris",
      "Sesuaikan dengan pengalaman dan posisi",
      "Gunakan bahasa yang relevan dan akurat",
      "Periksa kembali tata bahasa sebelum dikirim"
    ]
  },
  {
    id: 5,
    name: "Template Portfolio Profesional",
    category: "Portofolio",
    originalPrice: 30000,
    price: 21000,
    description: "Template untuk menyajikan profil, keahlian, dan proyek agar lebih mudah dipahami calon klien atau recruiter.",
    art: "portfolio",
    url: "https://lynk.id/montst/njnmpx7yd8g9",
    features: [
      "Tampilkan profil dan keahlian",
      "Susun proyek dan hasil karya",
      "Jelaskan peran dan proses pengerjaan",
      "Tambahkan kontak yang bisa dihubungi"
    ]
  },
  {
    id: 6,
    name: "Peta Jalan Dunia Kerja - Panduan Praktis Melamar Kerja, Freelance Global, & Kerja di Luar Negeri",
    category: "Panduan",
    originalPrice: 95000,
    price: 49000,
    description: "Panduan praktis untuk persiapan melamar kerja, freelance, dan peluang kerja di luar negeri.",
    art: "guide",
    url: "https://lynk.id/montst/68rlp05675j1",
    features: [
      "Panduan langkah demi langkah",
      "16 template dan checklist praktis",
      "Persiapan CV, lamaran, dan freelance",
      "Checklist dokumen dan tautan situs resmi"
    ]
  }
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const emptyState = document.getElementById("emptyState");
const filters = document.querySelectorAll(".filter");

let activeCategory = "Semua";

function rupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

// Peta gambar produk sesuai id.
const productImages = {
  1: "assets/CV indonesia.png",
  2: "assets/CV Remote.png",
  3: "assets/Surat Lamaran Indo.png",
  4: "assets/English Cover Letter.png",
  5: "assets/PORTOFOLIO.png",
  6: "assets/peta-jalan-dunia-kerja.png"
};

// Ilustrasi kartu menggunakan gambar produk nyata.
function artwork(product) {
  const imgSrc = productImages[product.id] || "assets/peta-jalan-dunia-kerja.png";
  return `
    <div class="product-art art-${product.art}">
      <span class="art-label">${product.category}</span>
      <img
        src="${imgSrc}"
        alt="${product.name}"
        class="card-product-img"
        loading="lazy"
      />
    </div>`;
}

function renderProducts() {
  const keyword = searchInput.value.trim().toLowerCase();

  let result = products.filter(product => {
    const matchesCategory =
      activeCategory === "Semua" ||
      product.category === activeCategory;

    const searchable =
      `${product.name} ${product.category} ${product.description}`
      .toLowerCase();

    return matchesCategory && searchable.includes(keyword);
  });

  if (sortSelect.value === "low") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "high") {
    result.sort((a, b) => b.price - a.price);
  }

  grid.innerHTML = result.map(product => `
    <article class="product-card">
      ${artwork(product)}
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="card-bottom">
          <span class="price-stack"><del>${rupiah(product.originalPrice)}</del><span class="price">${rupiah(product.price)}</span></span>
          <button class="detail-button"
            data-id="${product.id}"
            type="button">
            Lihat Detail ↗
          </button>
        </div>
      </div>
    </article>
  `).join("");

  grid.hidden = result.length === 0;
  emptyState.hidden = result.length !== 0;
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;

    filters.forEach(filter => {
      filter.classList.toggle("active", filter === button);
    });

    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);

const modal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
let previousFocus = null;

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-id]");
  if (!button) return;

  const product = products.find(
    item => item.id === Number(button.dataset.id)
  );
  if (!product) return;

  previousFocus = button;

  document.getElementById("modalArtwork").innerHTML = artwork(product);
  document.getElementById("modalCategory").textContent = product.category;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalDescription").textContent =
    product.description;
  document.getElementById("modalPrice").textContent =
    rupiah(product.price);

  const featureList = document.getElementById("modalFeatures");
  featureList.replaceChildren();

  product.features.forEach(feature => {
    const li = document.createElement("li");
    li.textContent = feature;
    featureList.appendChild(li);
  });

  const contact = document.getElementById("modalContact");
  contact.href = product.url;
  contact.target = "_blank";
  contact.rel = "noopener noreferrer";
  contact.textContent = "Akses Produk ↗";

  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modalClose.focus();
});

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
  if (previousFocus) previousFocus.focus();
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});

document.getElementById("resetButton").addEventListener("click", () => {
  searchInput.value = "";
  sortSelect.value = "featured";
  activeCategory = "Semua";

  filters.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === "Semua"
    );
  });

  renderProducts();
});

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();

