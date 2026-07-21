// src/components/AdminPanel.jsx
import React, { useState, useEffect, useRef } from "react";
import { 
  auth, 
  db, 
  storage 
} from "../firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  collection, 
  doc, 
  addDoc, 
  setDoc,
  getDocs, 
  deleteDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot 
} from "firebase/firestore";
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from "firebase/storage";
import { 
  Eye, 
  EyeOff, 
  Plus, 
  Edit2, 
  Trash2, 
  LogOut, 
  Clock, 
  Calendar, 
  Search, 
  Image as ImageIcon, 
  Upload, 
  Users, 
  Package, 
  X,
  RefreshCw,
  Briefcase
} from "lucide-react";

/* ── DEFAULT SEED PRODUCTS ── */
const SEED_PRODUCTS = [
  {
    name: 'Nest Learning Thermostat (3rd Gen)',
    category: 'Thermostats',
    price: 249.99,
    badge: '',
    stock: 12,
    description: 'Programs itself. Pays for itself. The Nest Learning Thermostat learns what temperatures you like and builds a schedule around yours.',
    image: '',
  },
  {
    name: 'Honeywell Home RTH9585 Wi-Fi Thermostat',
    category: 'Thermostats',
    price: 149.99,
    badge: '',
    stock: 8,
    description: '7-day programmable smart thermostat with colour touchscreen and Wi-Fi connectivity.',
    image: '',
  },
  {
    name: 'Lennox 16x25x1 MERV-11 Furnace Filter (6-pack)',
    category: 'Filters',
    price: 54.99,
    badge: '',
    stock: 50,
    description: 'Captures dust, pollen, mold spores and pet dander. Compatible with most forced-air furnaces.',
    image: '',
  },
  {
    name: '20x20x1 MERV-13 High-Efficiency Filter (4-pack)',
    category: 'Filters',
    price: 49.99,
    badge: '',
    stock: 35,
    description: 'Hospital-grade filtration. Traps fine particles including smoke and bacteria. Replace every 90 days.',
    image: '',
  },
  {
    name: 'AprilAire 700 Whole-Home Humidifier',
    category: 'Humidifiers',
    price: 399.99,
    badge: '',
    stock: 5,
    description: 'Auto-digital whole-home humidifier for homes up to 4,200 sq ft. Automatic digital control included.',
    image: '',
  },
];

const CATEGORY_LIST = ["Thermostats", "Filters", "Humidifiers", "Safety", "Air Quality", "Accessories"];

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Clock
  const [currentTime, setCurrentTime] = useState(new Date());

  // Navigation / Tabs
  const [activeSubTab, setActiveSubTab] = useState("products"); // products | visits

  // Auth States
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Products CRUD States
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Thermostats");
  const [formPrice, setFormPrice] = useState("");
  const [formStock, setFormStock] = useState("");
  const [formBadge, setFormBadge] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  
  // File upload state
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Visitor log state
  const [visits, setVisits] = useState([]);
  const [loadingVisits, setLoadingVisits] = useState(false);

  // Vacancies CRUD States
  const [vacancies, setVacancies] = useState([]);
  const [loadingVacancies, setLoadingVacancies] = useState(false);
  const [editingVacancyId, setEditingVacancyId] = useState(null);
  const [vacFormTitle, setVacFormTitle] = useState("");
  const [vacFormType, setVacFormType] = useState("Full-time");
  const [vacFormLocation, setVacFormLocation] = useState("");
  const [vacFormDescription, setVacFormDescription] = useState("");
  const [vacFormError, setVacFormError] = useState("");
  const [vacFormSuccess, setVacFormSuccess] = useState("");
  const [vacFormSubmitting, setVacFormSubmitting] = useState(false);

  // Projects CRUD States
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projFormTitle, setProjFormTitle] = useState("");
  const [projFormLocation, setProjFormLocation] = useState("");
  const [projFormType, setProjFormType] = useState("");
  const [projFormImageBase64, setProjFormImageBase64] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projFormError, setProjFormError] = useState("");
  const [projFormSuccess, setProjFormSuccess] = useState("");
  const [projFormSubmitting, setProjFormSubmitting] = useState(false);

  // Glance CRUD States
  const [glanceWork, setGlanceWork] = useState([]);
  const [loadingGlance, setLoadingGlance] = useState(false);
  const [glanceFormAlt, setGlanceFormAlt] = useState("");
  const [glanceFormImageBase64, setGlanceFormImageBase64] = useState("");
  const [editingGlanceId, setEditingGlanceId] = useState(null);
  const [glanceFormError, setGlanceFormError] = useState("");
  const [glanceFormSuccess, setGlanceFormSuccess] = useState("");
  const [glanceFormSubmitting, setGlanceFormSubmitting] = useState(false);

  // Promotional Banner CRUD States
  const [promotionalBanners, setPromotionalBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(false);
  const [bannerFormImageBase64, setBannerFormImageBase64] = useState("");
  const [bannerFormLink, setBannerFormLink] = useState("");
  const [bannerFormError, setBannerFormError] = useState("");
  const [bannerFormSuccess, setBannerFormSuccess] = useState("");
  const [bannerFormSubmitting, setBannerFormSubmitting] = useState(false);

  // Real-time clock effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoadingAuth(false);
    });
    return unsubscribe;
  }, []);

  // Sync Products (Realtime)
  useEffect(() => {
    if (!user) return;
    setLoadingProducts(true);
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setProducts(prods);
      setLoadingProducts(false);
    }, (error) => {
      console.error("Products subscription error:", error);
      setLoadingProducts(false);
    });
    return unsubscribe;
  }, [user]);

  // Sync Visits (Realtime)
  useEffect(() => {
    if (!user) return;
    setLoadingVisits(true);
    const q = query(collection(db, "visits"), orderBy("timestamp", "desc"), limit(40));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const v = snapshot.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          formattedTime: data.timestamp?.toDate() 
            ? data.timestamp.toDate().toLocaleString() 
            : new Date().toLocaleString()
        };
      });
      setVisits(v);
      setLoadingVisits(false);
    }, (error) => {
      console.error("Visits subscription error:", error);
      setLoadingVisits(false);
    });
    return unsubscribe;
  }, [user]);

  // Sync Vacancies (Realtime)
  useEffect(() => {
    if (!user) return;
    setLoadingVacancies(true);
    const q = query(collection(db, "vacancies"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const v = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setVacancies(v);
      setLoadingVacancies(false);
    }, (error) => {
      console.error("Vacancies subscription error:", error);
      setLoadingVacancies(false);
    });
    return unsubscribe;
  }, [user]);

  // Sync Projects (Realtime)
  useEffect(() => {
    if (!user) return;
    setLoadingProjects(true);
    const q = query(collection(db, "featured_projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setFeaturedProjects(projs);
      setLoadingProjects(false);
    }, (error) => {
      console.error("Projects subscription error:", error);
      setLoadingProjects(false);
    });
    return unsubscribe;
  }, [user]);

  // Sync Glance Work (Realtime)
  useEffect(() => {
    if (!user) return;
    setLoadingGlance(true);
    const q = query(collection(db, "glance_work"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const gls = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setGlanceWork(gls);
      setLoadingGlance(false);
    }, (error) => {
      console.error("Glance subscription error:", error);
      setLoadingGlance(false);
    });
    return unsubscribe;
  }, [user]);

  // Sync Promotional Banners (Realtime)
  useEffect(() => {
    if (!user) return;
    setLoadingBanners(true);
    const q = query(collection(db, "promotional_banners"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const banners = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setPromotionalBanners(banners);
      setLoadingBanners(false);
    }, (error) => {
      console.error("Banners subscription error:", error);
      setLoadingBanners(false);
    });
    return unsubscribe;
  }, [user]);

  // Initials generator
  const getInitials = (mail) => {
    if (!mail) return "A";
    const parts = mail.split("@")[0].split(/[._-]/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  // Auth Handlers
  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthSubmitting(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/invalid-credential") {
        setAuthError("Invalid email or password.");
      } else if (err.code === "auth/email-already-in-use") {
        setAuthError("Email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setAuthError("Password must be at least 6 characters.");
      } else {
        setAuthError(err.message || "Authentication failed.");
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  // Log out
  const handleLogOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  // Seed store database helper
  const handleSeedProducts = async () => {
    if (window.confirm("Do you want to seed initial sample products into your Firestore? This will add 5 standard items.")) {
      try {
        setLoadingProducts(true);
        for (const item of SEED_PRODUCTS) {
          await addDoc(collection(db, "products"), {
            ...item,
            createdAt: new Date()
          });
        }
        alert("Products successfully seeded!");
      } catch (err) {
        alert("Error seeding products: " + err.message);
      } finally {
        setLoadingProducts(false);
      }
    }
  };

  // File selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setFormError("Only image files are allowed.");
        return;
      }
      setUploadFile(file);
      setFormError("");
    }
  };

  // Submit Product Form (Create or Update)
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setFormSubmitting(false);

    if (!formName || !formPrice || !formStock) {
      setFormError("Please fill out all required fields.");
      return;
    }

    setFormSubmitting(true);
    let finalImageUrl = formImageUrl;

    // Handle file upload if present
    if (uploadFile) {
      setUploading(true);
      try {
        const storageRef = ref(storage, `products/${Date.now()}_${uploadFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, uploadFile);

        // Perform upload synchronously inside a promise wrapper
        const downloadUrl = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setUploadProgress(progress);
            },
            (error) => {
              console.error("Firebase Storage Upload Error:", error);
              reject(new Error("Storage permission denied or upload failed. Please configure public write permissions on Firebase Storage or use an image URL."));
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(url);
              } catch (urlErr) {
                reject(urlErr);
              }
            }
          );
        });

        finalImageUrl = downloadUrl;
        setUploading(false);
      } catch (uploadErr) {
        setFormError(uploadErr.message);
        setUploading(false);
        setFormSubmitting(false);
        return;
      }
    }

    try {
      const priceNum = parseFloat(formPrice);
      const stockNum = parseInt(formStock, 10);
      
      const productPayload = {
        name: formName,
        category: formCategory,
        price: isNaN(priceNum) ? 0 : priceNum,
        stock: isNaN(stockNum) ? 0 : stockNum,
        badge: formBadge || "",
        description: formDescription || "",
        image: finalImageUrl || "",
      };

      if (editingId) {
        // Edit Existing Document
        await setDoc(doc(db, "products", editingId), {
          ...productPayload,
          updatedAt: new Date()
        }, { merge: true });
        setFormSuccess("Product updated successfully!");
        clearForm();
      } else {
        // Create New Document
        await addDoc(collection(db, "products"), {
          ...productPayload,
          createdAt: new Date()
        });
        setFormSuccess("Product created successfully!");
        clearForm();
      }
    } catch (err) {
      console.error(err);
      setFormError(err.message || "Failed to save product.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Edit action
  const startEdit = (prod) => {
    setEditingId(prod.id);
    setFormName(prod.name);
    setFormCategory(prod.category || "Thermostats");
    setFormPrice(prod.price ? prod.price.toString() : "");
    setFormStock(prod.stock ? prod.stock.toString() : "");
    setFormBadge(prod.badge || "");
    setFormDescription(prod.description || "");
    setFormImageUrl(prod.image || "");
    setUploadFile(null);
    setUploadProgress(0);
    setFormError("");
    setFormSuccess("");
  };

  // Cancel edit
  const clearForm = () => {
    setEditingId(null);
    setFormName("");
    setFormCategory("Thermostats");
    setFormPrice("");
    setFormStock("");
    setFormBadge("");
    setFormDescription("");
    setFormImageUrl("");
    setUploadFile(null);
    setUploadProgress(0);
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        setFormSuccess("Product deleted successfully.");
      } catch (err) {
        alert("Failed to delete product: " + err.message);
      }
    }
  };

  // Submit Vacancy Form (Create or Update)
  const handleVacancySubmit = async (e) => {
    e.preventDefault();
    setVacFormError("");
    setVacFormSuccess("");

    if (!vacFormTitle || !vacFormType || !vacFormLocation) {
      setVacFormError("Please fill out all required fields.");
      return;
    }

    setVacFormSubmitting(true);
    try {
      const payload = {
        title: vacFormTitle,
        type: vacFormType,
        location: vacFormLocation,
        description: vacFormDescription || "",
      };

      if (editingVacancyId) {
        await setDoc(doc(db, "vacancies", editingVacancyId), {
          ...payload,
          updatedAt: new Date()
        }, { merge: true });
        setVacFormSuccess("Vacancy updated successfully!");
        clearVacancyForm();
      } else {
        await addDoc(collection(db, "vacancies"), {
          ...payload,
          createdAt: new Date()
        });
        setVacFormSuccess("Vacancy created successfully!");
        clearVacancyForm();
      }
    } catch (err) {
      console.error(err);
      setVacFormError(err.message || "Failed to save vacancy.");
    } finally {
      setVacFormSubmitting(false);
    }
  };

  // Edit action for vacancy
  const startEditVacancy = (vac) => {
    setEditingVacancyId(vac.id);
    setVacFormTitle(vac.title);
    setVacFormType(vac.type || "Full-time");
    setVacFormLocation(vac.location || "");
    setVacFormDescription(vac.description || "");
    setVacFormError("");
    setVacFormSuccess("");
  };

  // Cancel vacancy edit
  const clearVacancyForm = () => {
    setEditingVacancyId(null);
    setVacFormTitle("");
    setVacFormType("Full-time");
    setVacFormLocation("");
    setVacFormDescription("");
  };

  // Delete vacancy
  const handleDeleteVacancy = async (id) => {
    if (window.confirm("Are you sure you want to delete this vacancy?")) {
      try {
        await deleteDoc(doc(db, "vacancies", id));
        setVacFormSuccess("Vacancy deleted successfully.");
      } catch (err) {
        alert("Failed to delete vacancy: " + err.message);
      }
    }
  };

  // Seed default vacancies helper
  const handleSeedVacancies = async () => {
    const DEFAULT_SEED_VACANCIES = [
      { title: 'HVAC Technician',        type: 'Full-time', location: 'All Over Canada', description: 'Experienced HVAC Technician wanted for residential and commercial service calls.' },
      { title: 'Refrigeration Mechanic', type: 'Full-time', location: 'All Over Canada', description: 'Licensed refrigeration mechanic for cooling systems install and maintenance.' },
      { title: 'Sheet Metal Fabricator', type: 'Contract',  location: 'Mississauga', description: 'Sheet metal fabricator for custom ductwork designs.' },
      { title: 'Apprentice Technician',  type: 'Full-time', location: 'All Over Canada', description: 'Motivated apprentice looking to learn under senior HVAC mechanics.' },
    ];

    if (window.confirm("Do you want to seed initial job vacancies?")) {
      try {
        setLoadingVacancies(true);
        for (const item of DEFAULT_SEED_VACANCIES) {
          await addDoc(collection(db, "vacancies"), {
            ...item,
            createdAt: new Date()
          });
        }
        alert("Vacancies successfully seeded!");
      } catch (err) {
        alert("Error seeding vacancies: " + err.message);
      } finally {
        setLoadingVacancies(false);
      }
    }
  };

  // ── PROJECTS CRUD HANDLERS ──
  const handleProjImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setProjFormError("File size must be under 10MB.");
        return;
      }
      try {
        const base64 = await new Promise((resolve) => {
          const r = new FileReader();
          r.onloadend = () => resolve(r.result);
          r.readAsDataURL(file);
        });
        setProjFormImageBase64(base64);
        setProjFormError("");
      } catch (err) {
        setProjFormError("Failed to convert image.");
      }
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setProjFormError("");
    setProjFormSuccess("");
    if (!projFormTitle || !projFormLocation || !projFormType) {
      setProjFormError("Please fill out all required text fields.");
      return;
    }
    setProjFormSubmitting(true);
    try {
      const payload = {
        title: projFormTitle,
        location: projFormLocation,
        type: projFormType,
        image: projFormImageBase64 || ""
      };
      if (editingProjectId) {
        await setDoc(doc(db, "featured_projects", editingProjectId), {
          ...payload,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        setProjFormSuccess("Project updated successfully!");
        clearProjectForm();
      } else {
        await addDoc(collection(db, "featured_projects"), {
          ...payload,
          createdAt: new Date().toISOString()
        });
        setProjFormSuccess("Project added successfully!");
        clearProjectForm();
      }
    } catch (err) {
      setProjFormError(err.message || "Failed to save project.");
    } finally {
      setProjFormSubmitting(false);
    }
  };

  const startEditProject = (proj) => {
    setEditingProjectId(proj.id);
    setProjFormTitle(proj.title);
    setProjFormLocation(proj.location);
    setProjFormType(proj.type);
    setProjFormImageBase64(proj.image || "");
    setProjFormError("");
    setProjFormSuccess("");
  };

  const clearProjectForm = () => {
    setEditingProjectId(null);
    setProjFormTitle("");
    setProjFormLocation("");
    setProjFormType("");
    setProjFormImageBase64("");
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteDoc(doc(db, "featured_projects", id));
        setProjFormSuccess("Project deleted successfully.");
      } catch (err) {
        alert("Failed to delete project: " + err.message);
      }
    }
  };

  // ── GLANCE CRUD HANDLERS ──
  const handleGlanceImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setGlanceFormError("File size must be under 10MB.");
        return;
      }
      try {
        const base64 = await new Promise((resolve) => {
          const r = new FileReader();
          r.onloadend = () => resolve(r.result);
          r.readAsDataURL(file);
        });
        setGlanceFormImageBase64(base64);
        setGlanceFormError("");
      } catch (err) {
        setGlanceFormError("Failed to convert image.");
      }
    }
  };

  const handleGlanceSubmit = async (e) => {
    e.preventDefault();
    setGlanceFormError("");
    setGlanceFormSuccess("");
    setGlanceFormSubmitting(true);
    try {
      const payload = {
        alt: glanceFormAlt || "Glance of Work",
        image: glanceFormImageBase64 || ""
      };
      if (editingGlanceId) {
        await setDoc(doc(db, "glance_work", editingGlanceId), {
          ...payload,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        setGlanceFormSuccess("Glance item updated successfully!");
        clearGlanceForm();
      } else {
        await addDoc(collection(db, "glance_work"), {
          ...payload,
          createdAt: new Date().toISOString()
        });
        setGlanceFormSuccess("Glance item added successfully!");
        clearGlanceForm();
      }
    } catch (err) {
      setGlanceFormError(err.message || "Failed to save glance item.");
    } finally {
      setGlanceFormSubmitting(false);
    }
  };

  const startEditGlance = (g) => {
    setEditingGlanceId(g.id);
    setGlanceFormAlt(g.alt);
    setGlanceFormImageBase64(g.image || "");
    setGlanceFormError("");
    setGlanceFormSuccess("");
  };

  const clearGlanceForm = () => {
    setEditingGlanceId(null);
    setGlanceFormAlt("");
    setGlanceFormImageBase64("");
  };

  const handleDeleteGlance = async (id) => {
    if (window.confirm("Are you sure you want to delete this glance item?")) {
      try {
        await deleteDoc(doc(db, "glance_work", id));
        setGlanceFormSuccess("Glance item deleted successfully.");
      } catch (err) {
        alert("Failed to delete glance item: " + err.message);
      }
    }
  };

  // Seeding featured projects and glance work default images as Base64 in Firebase
  const handleSeedProjectsAndGlance = async () => {
    if (window.confirm("Do you want to seed Featured Projects and Glance of Work default images to Firebase as Base64?")) {
      try {
        const SEED_PROJECTS = [
          { imagePath: '/images/dspot.png', title: 'D SPOT DESSERT CAFE', location: 'ST. CATHERINE & LONDON, ON', type: 'MEP & Kitchen Ventilation' },
          { imagePath: '/images/fusion.jpeg', title: "TAHINI'S SHAWARMA", location: 'PETERBOROUGH, ON', type: 'Kitchen Exhaust & Gas Piping' },
          { imagePath: '/images/pic2.jpeg', title: 'FUSION LOUNGE', location: 'MISSISSAUGA, ON', type: 'Commercial HVAC & Controls' },
          { imagePath: '/images/pic3.jpeg', title: "SMOKE'S POUTINERIE", location: 'WINDSOR, ON', type: 'MEP Stamped Permit Drawings' },
          { imagePath: '/images/usok.png', title: 'USOK RESTAURANT', location: 'WHITBY, ON', type: 'Exhaust Hoods & Makeup Air' },
          { imagePath: '/images/pic.jpeg', title: '99 KING ST – COMMERCIAL PROJECT', location: 'SAINT JOHN, NB', type: 'Commercial HVAC & Piping' }
        ];

        for (const item of SEED_PROJECTS) {
          const res = await fetch(item.imagePath);
          const blob = await res.blob();
          const base64 = await new Promise((resolve) => {
            const r = new FileReader();
            r.onloadend = () => resolve(r.result);
            r.readAsDataURL(blob);
          });
          await addDoc(collection(db, "featured_projects"), {
            title: item.title,
            location: item.location,
            type: item.type,
            image: base64,
            createdAt: new Date().toISOString()
          });
        }

        const SEED_GLANCE = [
          { imagePath: '/images/Glance.jpeg', alt: 'Featured Mechanical Installation' },
          { imagePath: '/images/mechanical8.jpeg', alt: 'Industrial Boiler and Piping' },
          { imagePath: '/images/mechanicalwork2.jpeg', alt: 'HVAC Duct and Gas Line Work' }
        ];

        for (const item of SEED_GLANCE) {
          const res = await fetch(item.imagePath);
          const blob = await res.blob();
          const base64 = await new Promise((resolve) => {
            const r = new FileReader();
            r.onloadend = () => resolve(r.result);
            r.readAsDataURL(blob);
          });
          await addDoc(collection(db, "glance_work"), {
            alt: item.alt,
            image: base64,
            createdAt: new Date().toISOString()
          });
        }

        alert("Successfully seeded Featured Projects and Glance of Work into Firebase!");
      } catch (err) {
        alert("Seed failed: " + err.message);
      }
    }
  };

  // ── PROMOTIONAL BANNER CRUD HANDLERS ──
  const handleBannerImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setBannerFormError("File size must be under 10MB.");
        return;
      }
      try {
        const base64 = await new Promise((resolve) => {
          const r = new FileReader();
          r.onloadend = () => resolve(r.result);
          r.readAsDataURL(file);
        });
        setBannerFormImageBase64(base64);
        setBannerFormError("");
      } catch (err) {
        setBannerFormError("Failed to convert image.");
      }
    }
  };

  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    setBannerFormError("");
    setBannerFormSuccess("");
    if (!bannerFormImageBase64) {
      setBannerFormError("Please select a banner image.");
      return;
    }
    setBannerFormSubmitting(true);
    try {
      await addDoc(collection(db, "promotional_banners"), {
        image: bannerFormImageBase64,
        link: bannerFormLink || "",
        isActive: false, // Default to inactive when first created
        createdAt: new Date().toISOString()
      });
      setBannerFormSuccess("Banner uploaded successfully! Make sure to activate it below.");
      clearBannerForm();
    } catch (err) {
      setBannerFormError(err.message || "Failed to save banner.");
    } finally {
      setBannerFormSubmitting(false);
    }
  };

  const clearBannerForm = () => {
    setBannerFormImageBase64("");
    setBannerFormLink("");
  };

  const handleToggleBanner = async (bannerId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      if (newStatus === true) {
        // Deactivate all other banners
        for (const b of promotionalBanners) {
          if (b.id !== bannerId && b.isActive === true) {
            await setDoc(doc(db, "promotional_banners", b.id), {
              isActive: false
            }, { merge: true });
          }
        }
      }
      // Set current status
      await setDoc(doc(db, "promotional_banners", bannerId), {
        isActive: newStatus
      }, { merge: true });
    } catch (err) {
      alert("Failed to toggle banner: " + err.message);
    }
  };

  const handleDeleteBanner = async (id) => {
    if (window.confirm("Are you sure you want to delete this promotional banner?")) {
      try {
        await deleteDoc(doc(db, "promotional_banners", id));
      } catch (err) {
        alert("Failed to delete banner: " + err.message);
      }
    }
  };

  // Filter products list
  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Render Splash Loader
  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#c3252e] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Verifying Session...</p>
        </div>
      </div>
    );
  }

  // Render login screen if unauthorized
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#c3252e]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#8f8cff]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 relative shadow-2xl">
          {styleTag}
          <div className="text-center mb-8">
            <img 
              src="/images/metricnew.png" 
              alt="MetricAir" 
              style={{ height: "120px", width: "auto" }} 
              className="mx-auto mb-2 object-contain -my-4" 
            />
            <h1 className="font-black text-2xl tracking-tight">
              <span className="text-[#c3252e]">Admin</span>{' '}
              <span className="text-[#8f8cff]">Portal</span>{' '}
              <span className="text-white">Access</span>
            </h1>
            <p className="text-gray-500 text-xs mt-1">Authenticate to manage database items</p>
          </div>

          <form onSubmit={handleAuth} method="POST" className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@metricair.com" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c3252e] focus:ring-1 focus:ring-[#c3252e]/20 transition-all placeholder-gray-600"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#c3252e] focus:ring-1 focus:ring-[#c3252e]/20 transition-all placeholder-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-red-400 text-xs leading-relaxed">{authError}</p>
            )}

            {/* Login button with hovering split animation */}
            <button
              id="metric-admin-login-btn"
              type="submit"
              disabled={authSubmitting}
              className="admin-login-btn w-full py-3.5 rounded-lg text-white text-sm font-bold uppercase tracking-wider relative overflow-hidden transition-opacity cursor-pointer disabled:opacity-50 text-white"
            >
              <span>{authSubmitting ? "Authenticating..." : isRegister ? "Register Admin Account" : "Access Dashboard"}</span>
            </button>
          </form>

          {/* Registration toggle to easily configure initial account */}
          <div className="mt-6 text-center border-t border-white/10 pt-4">
            <button
              onClick={() => { setIsRegister(!isRegister); setAuthError(""); }}
              className="text-gray-400 hover:text-[#c3252e] text-xs font-semibold transition-colors underline"
            >
              {isRegister ? "Already have an account? Sign In" : "Need to register? Create Admin Account"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Dashboard
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white flex flex-col font-sans relative overflow-hidden">
      {styleTag}
      {/* Glow backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c3252e]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8f8cff]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── HEADER ── */}
      <header className="bg-white/5 border-b border-white/10 backdrop-blur-md px-6 sm:px-10 py-4 flex items-center justify-between shrink-0 relative z-20">
        <div className="flex items-center gap-3">
          <img 
            src="/images/metricnew.png" 
            alt="MetricAir Logo" 
            style={{ height: "110px", width: "auto" }} 
            className="object-contain -my-8" 
          />
          <div className="w-px h-6 bg-white/20 hidden sm:block" />
          <span className="text-white font-black text-sm uppercase tracking-widest hidden sm:block">Admin Dashboard</span>
        </div>

        {/* Real-time Date and Running Clock */}
        <div className="hidden md:flex items-center gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-[#c3252e]" />
            <span>
              {currentTime.toLocaleDateString(undefined, { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-white text-sm bg-white/5 px-3 py-1 rounded-full border border-white/10 shadow-inner">
            <Clock size={14} className="text-[#c3252e] animate-pulse" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Avatar Profile & Log Out */}
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-2 group cursor-pointer"
            title={user.email}
          >
            {/* Avatar Circle with initials */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#c3252e] to-[#8f8cff] flex items-center justify-center font-black text-sm text-white shadow-[0_0_15px_rgba(233,69,96,0.35)] hover:scale-105 transition-transform duration-200">
              {getInitials(user.email)}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-white font-bold text-xs">Active Admin</span>
              <span className="text-gray-500 text-[10px] truncate max-w-[120px]">{user.email}</span>
            </div>
          </div>

          <button
            id="metric-admin-logout-btn"
            onClick={handleLogOut}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-wider text-white"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* ── SUBTAB NAV BAR ── */}
      <div className="bg-white/3 border-b border-white/5 px-6 sm:px-10 py-3 flex items-center justify-between z-10 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveSubTab("products")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeSubTab === "products" 
                ? "bg-[#c3252e] text-white shadow-[0_0_12px_rgba(233,69,96,0.3)]" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Package size={14} />
            Products CRUD
          </button>
          <button
            onClick={() => setActiveSubTab("visits")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeSubTab === "visits" 
                ? "bg-[#c3252e] text-white shadow-[0_0_12px_rgba(233,69,96,0.3)]" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users size={14} />
            Visitor Tracker
          </button>
          <button
            onClick={() => setActiveSubTab("vacancies")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeSubTab === "vacancies" 
                ? "bg-[#c3252e] text-white shadow-[0_0_12px_rgba(233,69,96,0.3)]" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Briefcase size={14} />
            Job Vacancies
          </button>
          <button
            onClick={() => setActiveSubTab("projects")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeSubTab === "projects" 
                ? "bg-[#c3252e] text-white shadow-[0_0_12px_rgba(233,69,96,0.3)]" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Briefcase size={14} />
            Featured Projects
          </button>
          <button
            onClick={() => setActiveSubTab("glance")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeSubTab === "glance" 
                ? "bg-[#c3252e] text-white shadow-[0_0_12px_rgba(233,69,96,0.3)]" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ImageIcon size={14} />
            Glance of Work
          </button>
          <button
            onClick={() => setActiveSubTab("banner")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeSubTab === "banner" 
                ? "bg-[#c3252e] text-white shadow-[0_0_12px_rgba(233,69,96,0.3)]" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ImageIcon size={14} />
            Promotional Banner
          </button>
        </div>

        {/* Quick Database Seeding Triggers */}
        <div className="flex gap-2">
          {activeSubTab === "products" && products.length === 0 && (
            <button 
              onClick={handleSeedProducts}
              className="text-[#c3252e] border border-[#c3252e]/20 hover:bg-[#c3252e] hover:text-white transition-all text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw size={12} />
              Seed Default Products
            </button>
          )}
        </div>
      </div>

      {/* ── MAIN DASHBOARD VIEW ── */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col">
        {activeSubTab === "products" ? (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Product Editor Form */}
            <section className="xl:col-span-4 bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
              <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                <h2 className="text-white font-black text-lg tracking-tight">
                  {editingId ? "Edit Product Details" : "Add New Store Product"}
                </h2>
                {editingId && (
                  <button 
                    onClick={clearForm}
                    className="p-1 rounded bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Cancel Edit"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <form onSubmit={handleProductSubmit} method="POST" className="flex flex-col gap-4">
                {/* Product Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Product Title *</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    required
                    placeholder="Nest Learning Thermostat"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors"
                  />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Category</label>
                    <select
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value)}
                      className="bg-[#16213e] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors"
                    >
                      {CATEGORY_LIST.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Price (CAD) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formPrice}
                      onChange={e => setFormPrice(e.target.value)}
                      required
                      placeholder="249.99"
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors"
                    />
                  </div>
                </div>

                {/* Stock & Status Badge */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Inventory Stock *</label>
                    <input
                      type="number"
                      value={formStock}
                      onChange={e => setFormStock(e.target.value)}
                      required
                      placeholder="12"
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Status Badge</label>
                    <input
                      type="text"
                      value={formBadge}
                      onChange={e => setFormBadge(e.target.value)}
                      placeholder="Best Seller, Value Pack"
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors"
                    />
                  </div>
                </div>

                {/* Product Description */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Description</label>
                  <textarea
                    value={formDescription}
                    onChange={e => setFormDescription(e.target.value)}
                    placeholder="Short product overview..."
                    rows={2.5}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors resize-none"
                  />
                </div>

                {/* Image Option 1: URL */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Product Image URL</label>
                  <input
                    type="text"
                    value={formImageUrl}
                    onChange={e => setFormImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors"
                  />
                </div>

                {/* Image Option 2: Upload File to Storage */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Or Upload Image File</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-dashed border-white/15 hover:border-white/35 rounded-lg p-3.5 cursor-pointer flex flex-col items-center justify-center gap-1.5 bg-white/2 hover:bg-white/4 transition-all"
                  >
                    <input 
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    {uploadFile ? (
                      <div className="flex items-center gap-2 max-w-full">
                        <ImageIcon size={16} className="text-[#c3252e] shrink-0" />
                        <span className="text-white text-xs truncate max-w-[200px]">{uploadFile.name}</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setUploadFile(null); }}
                          className="text-gray-500 hover:text-red-400 text-xs shrink-0 font-bold"
                        >Clear</button>
                      </div>
                    ) : (
                      <>
                        <Upload size={18} className="text-gray-500" />
                        <span className="text-gray-500 text-xs">Select or Drag Image Image</span>
                      </>
                    )}
                  </div>

                  {/* Progress Indicator */}
                  {uploading && (
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden mt-1">
                      <div 
                        className="bg-gradient-to-r from-[#c3252e] to-[#8f8cff] h-full"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Alerts */}
                {formError && (
                  <p className="text-red-400 text-xs leading-relaxed bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">{formError}</p>
                )}
                {formSuccess && (
                  <p className="text-green-400 text-xs leading-relaxed bg-green-500/10 border border-green-500/20 p-2.5 rounded-lg">{formSuccess}</p>
                )}

                {/* Submit buttons */}
                <div className="flex gap-3 pt-2">
                  {editingId && (
                    <button
                      type="button"
                      onClick={clearForm}
                      className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="flex-1 admin-login-btn py-2.5 rounded-lg text-white font-bold text-xs uppercase tracking-wider relative overflow-hidden transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <span>
                      {formSubmitting 
                        ? (uploading ? `Uploading Image (${uploadProgress}%)` : "Saving...") 
                        : (editingId ? "Update Product" : "Add Product")}
                    </span>
                  </button>
                </div>

              </form>
            </section>

            {/* RIGHT COLUMN: Products Inventory Table */}
            <section className="xl:col-span-8 bg-white/4 border border-white/8 rounded-2xl p-6 shadow-xl flex flex-col gap-6 min-h-[500px]">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <h2 className="text-white font-black text-lg tracking-tight">Products Inventory</h2>
                
                {/* Search & Category Filter */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search title..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#c3252e] placeholder-gray-500 w-full sm:w-44 transition-all"
                    />
                  </div>

                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="bg-[#16213e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c3252e]"
                  >
                    <option value="All">All Categories</option>
                    {CATEGORY_LIST.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table / Grid */}
              {loadingProducts ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-3 border-[#c3252e] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 text-xs">Loading items...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                  <Package size={36} className="text-gray-600 mb-2" />
                  <p className="text-gray-400 font-bold text-sm">No items found</p>
                  <p className="text-gray-500 text-xs mt-1">Start adding items on the left side panel.</p>
                </div>
              ) : (
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-500 font-bold uppercase tracking-wider">
                        <th className="pb-3 pl-2">Product</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3 text-right">Price</th>
                        <th className="pb-3 text-center">Stock</th>
                        <th className="pb-3">Badge</th>
                        <th className="pb-3 text-right pr-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-white/2 transition-colors group">
                          {/* Image & Title */}
                          <td className="py-3 pl-2 max-w-[200px] sm:max-w-xs">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                                {prod.image ? (
                                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                                ) : (
                                  <ImageIcon size={16} className="text-gray-600" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-white truncate">{prod.name}</p>
                                <p className="text-[10px] text-gray-500 truncate mt-0.5">{prod.description}</p>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 font-medium">
                              {prod.category}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-3 text-right font-bold text-white font-mono">
                            ${prod.price?.toFixed(2)}
                          </td>

                          {/* Stock */}
                          <td className="py-3 text-center">
                            <span className={`font-mono font-bold ${
                              prod.stock === 0 ? "text-red-400" : prod.stock < 10 ? "text-yellow-400" : "text-green-400"
                            }`}>
                              {prod.stock}
                            </span>
                          </td>

                          {/* Badge */}
                          <td className="py-3">
                            {prod.badge ? (
                              <span className="px-2 py-0.5 rounded bg-[#c3252e]/10 border border-[#c3252e]/20 text-[#c3252e] font-black text-[9px] uppercase tracking-wider">
                                {prod.badge}
                              </span>
                            ) : (
                              <span className="text-gray-600">—</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3 text-right pr-2">
                            <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => startEdit(prod)}
                                className="p-2 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-[#8f8cff] transition-all hover:bg-[#8f8cff]/10"
                                title="Edit Product"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(prod.id)}
                                className="p-2 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/40 transition-all hover:bg-red-500/10"
                                title="Delete Product"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        ) : activeSubTab === "visits" ? (
          /* TAB 2: Visitor Tracking Log */
          <div className="bg-white/4 border border-white/8 rounded-2xl p-6 shadow-xl flex flex-col gap-6 flex-1 min-h-[500px]">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-white font-black text-lg tracking-tight">Active Visitor Logs</h2>
                <p className="text-gray-500 text-xs mt-1">Real-time visitor interactions logged from the store front</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Total Logged Visits:</span>
                <span className="bg-[#c3252e]/10 border border-[#c3252e]/20 text-[#c3252e] px-3 py-0.5 rounded-full font-mono font-bold text-xs">
                  {visits.length}
                </span>
              </div>
            </div>

            {loadingVisits ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-3 border-[#c3252e] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 text-xs">Syncing logs...</p>
              </div>
            ) : visits.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                <Users size={36} className="text-gray-600 mb-2" />
                <p className="text-gray-400 font-bold text-sm">No visitor logs recorded</p>
                <p className="text-gray-500 text-xs mt-1">When users load the store frontend, their sessions will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-500 font-bold uppercase tracking-wider">
                      <th className="pb-3 pl-2">Session ID</th>
                      <th className="pb-3">Timestamp</th>
                      <th className="pb-3">Operating System</th>
                      <th className="pb-3">Web Browser</th>
                      <th className="pb-3">Active Page</th>
                      <th className="pb-3 pr-2">User Agent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {visits.map((v) => (
                      <tr key={v.id} className="hover:bg-white/2 transition-colors">
                        <td className="py-3 pl-2 font-mono text-[10px] text-gray-400">
                          #{v.id.slice(0, 8)}...
                        </td>
                        <td className="py-3 font-mono font-semibold text-white">
                          {v.formattedTime}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            v.os === "Windows" ? "bg-blue-500/10 border border-blue-500/20 text-blue-400" :
                            v.os === "macOS" ? "bg-white/10 border border-white/20 text-white" :
                            v.os === "iOS" || v.os === "Android" ? "bg-green-500/10 border border-green-500/20 text-green-400" :
                            "bg-gray-500/10 border border-gray-500/20 text-gray-400"
                          }`}>
                            {v.os}
                          </span>
                        </td>
                        <td className="py-3 font-semibold text-gray-300">
                          {v.browser}
                        </td>
                        <td className="py-3 text-[#c3252e] font-bold">
                          /{v.page?.toLowerCase()}
                        </td>
                        <td className="py-3 pr-2 text-[10px] text-gray-500 truncate max-w-[200px]" title={v.userAgent}>
                          {v.userAgent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : activeSubTab === "vacancies" ? (
          /* TAB 3: Vacancies CRUD */
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Vacancy Editor Form */}
            <section className="xl:col-span-4 bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
              <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                <h2 className="text-white font-black text-lg tracking-tight">
                  {editingVacancyId ? "Edit Job Vacancy" : "Add Job Vacancy"}
                </h2>
                {editingVacancyId && (
                  <button 
                    onClick={clearVacancyForm}
                    className="p-1 rounded bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Cancel Edit"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <form onSubmit={handleVacancySubmit} method="POST" className="flex flex-col gap-4">
                {/* Title */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Job Title *</label>
                  <input
                    type="text"
                    value={vacFormTitle}
                    onChange={e => setVacFormTitle(e.target.value)}
                    required
                    placeholder="e.g. HVAC Technician"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors"
                  />
                </div>

                {/* Type & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Job Type *</label>
                    <select
                      value={vacFormType}
                      onChange={e => setVacFormType(e.target.value)}
                      className="bg-[#16213e] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Apprentice">Apprentice</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Location *</label>
                    <input
                      type="text"
                      value={vacFormLocation}
                      onChange={e => setVacFormLocation(e.target.value)}
                      required
                      placeholder="e.g. All Over Canada"
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Description</label>
                  <textarea
                    value={vacFormDescription}
                    onChange={e => setVacFormDescription(e.target.value)}
                    placeholder="Brief description of requirements/responsibilities..."
                    rows={4}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors resize-none"
                  />
                </div>

                {/* Alerts */}
                {vacFormError && (
                  <p className="text-red-400 text-xs leading-relaxed bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">{vacFormError}</p>
                )}
                {vacFormSuccess && (
                  <p className="text-green-400 text-xs leading-relaxed bg-green-500/10 border border-green-500/20 p-2.5 rounded-lg">{vacFormSuccess}</p>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  {editingVacancyId && (
                    <button
                      type="button"
                      onClick={clearVacancyForm}
                      className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={vacFormSubmitting}
                    className="flex-1 admin-login-btn py-2.5 rounded-lg text-white font-bold text-xs uppercase tracking-wider relative overflow-hidden transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <span>
                      {vacFormSubmitting ? "Saving..." : (editingVacancyId ? "Update Job" : "Add Job")}
                    </span>
                  </button>
                </div>
              </form>
            </section>

            {/* RIGHT COLUMN: Vacancies List Table */}
            <section className="xl:col-span-8 bg-white/4 border border-white/8 rounded-2xl p-6 shadow-xl flex flex-col gap-6 min-h-[500px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-white font-black text-lg tracking-tight">Active Job Openings</h2>
                {vacancies.length === 0 && !loadingVacancies && (
                  <button 
                    onClick={handleSeedVacancies}
                    className="text-[#c3252e] border border-[#c3252e]/20 hover:bg-[#c3252e] hover:text-white transition-all text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1"
                  >
                    <RefreshCw size={12} />
                    Seed Standard Positions
                  </button>
                )}
              </div>

              {loadingVacancies ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-3 border-[#c3252e] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 text-xs">Loading openings...</p>
                </div>
              ) : vacancies.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                  <Briefcase size={36} className="text-gray-600 mb-2" />
                  <p className="text-gray-400 font-bold text-sm">No job openings recorded</p>
                  <p className="text-gray-500 text-xs mt-1">Start by adding a vacancy on the left panel or click Seed.</p>
                </div>
              ) : (
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-500 font-bold uppercase tracking-wider">
                        <th className="pb-3 pl-2">Job Title</th>
                        <th className="pb-3">Type</th>
                        <th className="pb-3">Location</th>
                        <th className="pb-3">Description</th>
                        <th className="pb-3 text-right pr-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {vacancies.map((vac) => (
                        <tr key={vac.id} className="hover:bg-white/2 transition-colors group">
                          <td className="py-3 pl-2 font-bold text-white max-w-[150px] truncate">
                            {vac.title}
                          </td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 font-medium">
                              {vac.type}
                            </span>
                          </td>
                          <td className="py-3 text-gray-300 font-semibold">
                            {vac.location}
                          </td>
                          <td className="py-3 text-gray-500 max-w-[240px] truncate" title={vac.description}>
                            {vac.description || "—"}
                          </td>
                          <td className="py-3 text-right pr-2">
                            <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => startEditVacancy(vac)}
                                className="p-2 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-[#8f8cff] transition-all hover:bg-[#8f8cff]/10"
                                title="Edit Vacancy"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button 
                                onClick={() => handleDeleteVacancy(vac.id)}
                                className="p-2 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/40 transition-all hover:bg-red-500/10"
                                title="Delete Vacancy"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        ) : activeSubTab === "projects" ? (
          /* TAB 4: Featured Projects CRUD */
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start flex-1 w-full">
            {/* LEFT COLUMN: Project Editor Form */}
            <section className="xl:col-span-4 bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
              <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                <h2 className="text-white font-black text-lg tracking-tight">
                  {editingProjectId ? "Edit Featured Project" : "Add Featured Project"}
                </h2>
                {editingProjectId && (
                  <button 
                    onClick={clearProjectForm}
                    className="p-1 rounded bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Cancel Edit"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {projFormError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg font-semibold">
                  {projFormError}
                </div>
              )}
              {projFormSuccess && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-lg font-semibold">
                  {projFormSuccess}
                </div>
              )}

              <form onSubmit={handleProjectSubmit} className="flex flex-col gap-4">
                {/* Title */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Project Title *</label>
                  <input
                    type="text"
                    value={projFormTitle}
                    onChange={e => setProjFormTitle(e.target.value)}
                    required
                    placeholder="e.g. D SPOT DESSERT CAFE"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors"
                  />
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Location *</label>
                  <input
                    type="text"
                    value={projFormLocation}
                    onChange={e => setProjFormLocation(e.target.value)}
                    required
                    placeholder="e.g. PETERBOROUGH, ON"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors"
                  />
                </div>

                {/* Service Type */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Service/Pillar Details *</label>
                  <input
                    type="text"
                    value={projFormType}
                    onChange={e => setProjFormType(e.target.value)}
                    required
                    placeholder="e.g. MEP & Kitchen Ventilation"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors"
                  />
                </div>

                {/* Image Upload for Base64 conversion */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Upload Project Image *</label>
                  <div className="border border-dashed border-white/20 hover:border-[#c3252e]/55 transition-colors rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer bg-white/3 relative overflow-hidden group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleProjImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <Upload size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                    <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wide group-hover:text-gray-300">
                      Click to choose photo
                    </span>
                  </div>
                  {projFormImageBase64 && (
                    <div className="mt-2 relative rounded-lg overflow-hidden border border-white/10 aspect-[4/3] w-28 bg-black/40">
                      <img src={projFormImageBase64} className="w-full h-full object-cover" alt="Preview" />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={clearProjectForm}
                      className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={projFormSubmitting}
                    className="flex-1 admin-login-btn py-2.5 rounded-lg text-white font-bold text-xs uppercase tracking-wider relative overflow-hidden transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <span>
                      {projFormSubmitting ? "Saving..." : (editingProjectId ? "Update Project" : "Add Project")}
                    </span>
                  </button>
                </div>
              </form>
            </section>

            {/* RIGHT COLUMN: Projects List Table */}
            <section className="xl:col-span-8 bg-white/4 border border-white/8 rounded-2xl p-6 shadow-xl flex flex-col gap-6 min-h-[500px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-white font-black text-lg tracking-tight">Active Featured Projects</h2>
                <span className="bg-[#c3252e]/10 border border-[#c3252e]/20 text-[#c3252e] px-3 py-0.5 rounded-full font-mono font-bold text-xs">
                  {featuredProjects.length}
                </span>
              </div>

              {loadingProjects ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-3 border-[#c3252e] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 text-xs">Loading projects...</p>
                </div>
              ) : featuredProjects.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                  <Briefcase size={36} className="text-gray-600 mb-2" />
                  <p className="text-gray-400 font-bold text-sm">No featured projects saved</p>
                  <p className="text-gray-500 text-xs mt-1">Start by adding a project or click Seed at the top right.</p>
                </div>
              ) : (
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-500 font-bold uppercase tracking-wider">
                        <th className="pb-3 pl-2">Photo</th>
                        <th className="pb-3">Title</th>
                        <th className="pb-3">Location</th>
                        <th className="pb-3">Type</th>
                        <th className="pb-3 text-right pr-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {featuredProjects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-white/2 transition-colors group">
                          <td className="py-3 pl-2">
                            <div className="w-10 h-10 rounded border border-white/10 overflow-hidden bg-black/40">
                              {proj.image ? (
                                <img src={proj.image} className="w-full h-full object-cover" alt="" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold">No Image</div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 font-bold text-white max-w-[150px] truncate">
                            {proj.title}
                          </td>
                          <td className="py-3 text-gray-300 font-semibold">
                            {proj.location}
                          </td>
                          <td className="py-3 text-gray-500">
                            {proj.type}
                          </td>
                          <td className="py-3 text-right pr-2">
                            <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => startEditProject(proj)}
                                className="p-2 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-[#8f8cff] transition-all hover:bg-[#8f8cff]/10"
                                title="Edit Project"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button 
                                onClick={() => handleDeleteProject(proj.id)}
                                className="p-2 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/40 transition-all hover:bg-red-500/10"
                                title="Delete Project"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        ) : activeSubTab === "glance" ? (
          /* TAB 5: Glance of Work CRUD */
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start flex-1 w-full">
            {/* LEFT COLUMN: Glance Editor Form */}
            <section className="xl:col-span-4 bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
              <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                <h2 className="text-white font-black text-lg tracking-tight">
                  {editingGlanceId ? "Edit Glance Photo" : "Add Glance Photo"}
                </h2>
                {editingGlanceId && (
                  <button 
                    onClick={clearGlanceForm}
                    className="p-1 rounded bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Cancel Edit"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {glanceFormError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg font-semibold">
                  {glanceFormError}
                </div>
              )}
              {glanceFormSuccess && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-lg font-semibold">
                  {glanceFormSuccess}
                </div>
              )}

              <form onSubmit={handleGlanceSubmit} className="flex flex-col gap-4">
                {/* Alt Tag */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Photo Description / Alt *</label>
                  <input
                    type="text"
                    value={glanceFormAlt}
                    onChange={e => setGlanceFormAlt(e.target.value)}
                    required
                    placeholder="e.g. Industrial Boiler installation"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors"
                  />
                </div>

                {/* File Picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Upload Photo *</label>
                  <div className="border border-dashed border-white/20 hover:border-[#c3252e]/55 transition-colors rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer bg-white/3 relative overflow-hidden group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleGlanceImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <Upload size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                    <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wide group-hover:text-gray-300">
                      Click to choose photo
                    </span>
                  </div>
                  {glanceFormImageBase64 && (
                    <div className="mt-2 relative rounded-lg overflow-hidden border border-white/10 aspect-[4/3] w-28 bg-black/40">
                      <img src={glanceFormImageBase64} className="w-full h-full object-cover" alt="Preview" />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  {editingGlanceId && (
                    <button
                      type="button"
                      onClick={clearGlanceForm}
                      className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={glanceFormSubmitting}
                    className="flex-1 admin-login-btn py-2.5 rounded-lg text-white font-bold text-xs uppercase tracking-wider relative overflow-hidden transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <span>
                      {glanceFormSubmitting ? "Saving..." : (editingGlanceId ? "Update Photo" : "Add Photo")}
                    </span>
                  </button>
                </div>
              </form>
            </section>

            {/* RIGHT COLUMN: Glance List Table */}
            <section className="xl:col-span-8 bg-white/4 border border-white/8 rounded-2xl p-6 shadow-xl flex flex-col gap-6 min-h-[500px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-white font-black text-lg tracking-tight">Active Glance of Work Photos</h2>
                <span className="bg-[#c3252e]/10 border border-[#c3252e]/20 text-[#c3252e] px-3 py-0.5 rounded-full font-mono font-bold text-xs">
                  {glanceWork.length}
                </span>
              </div>

              {loadingGlance ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-3 border-[#c3252e] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 text-xs">Loading gallery...</p>
                </div>
              ) : glanceWork.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                  <ImageIcon size={36} className="text-gray-600 mb-2" />
                  <p className="text-gray-400 font-bold text-sm">No glance photos saved</p>
                  <p className="text-gray-500 text-xs mt-1">Start by adding a photo or click Seed at the top right.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {glanceWork.map((g) => (
                    <div key={g.id} className="group relative rounded-xl border border-white/10 overflow-hidden bg-black/40 aspect-[4/3]">
                      <img src={g.image} className="w-full h-full object-cover" alt={g.alt} />
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                        <button
                          onClick={() => startEditGlance(g)}
                          className="p-2 rounded bg-white/10 hover:bg-white/20 text-white font-bold transition-all text-xs"
                          title="Edit Alt"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteGlance(g.id)}
                          className="p-2 rounded bg-red-500/20 hover:bg-red-500 text-white font-bold transition-all text-xs"
                          title="Delete Photo"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 p-2 text-[10px] text-gray-300 font-medium truncate">
                        {g.alt}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        ) : activeSubTab === "banner" ? (
          /* TAB 6: Promotional Banner CRUD */
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start flex-1 w-full">
            {/* LEFT COLUMN: Add New Banner Form */}
            <section className="xl:col-span-4 bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
              <div className="border-b border-white/10 pb-3">
                <h2 className="text-white font-black text-lg tracking-tight">Create Promotional Banner</h2>
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mt-1">Upload Base64 image & link</p>
              </div>

              {bannerFormError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg font-semibold animate-pulse">
                  {bannerFormError}
                </div>
              )}
              {bannerFormSuccess && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-lg font-semibold">
                  {bannerFormSuccess}
                </div>
              )}

              <form onSubmit={handleBannerSubmit} className="flex flex-col gap-4">
                {/* Optional Redirect Link */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Redirect URL (Optional)</label>
                  <input
                    type="text"
                    value={bannerFormLink}
                    onChange={e => setBannerFormLink(e.target.value)}
                    placeholder="e.g. /services or https://google.com"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c3252e] transition-colors"
                  />
                </div>

                {/* File picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Upload Banner Photo *</label>
                  <div className="border border-dashed border-white/20 hover:border-[#c3252e]/55 transition-colors rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer bg-white/3 relative overflow-hidden group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleBannerImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <Upload size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                    <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wide group-hover:text-gray-300">
                      Click to choose photo
                    </span>
                  </div>
                  {bannerFormImageBase64 && (
                    <div className="mt-2 relative rounded-lg overflow-hidden border border-white/10 aspect-[21/9] w-full bg-black/40">
                      <img src={bannerFormImageBase64} className="w-full h-full object-cover" alt="Preview" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={bannerFormSubmitting}
                  className="w-full admin-login-btn py-2.5 rounded-lg text-white font-bold text-xs uppercase tracking-wider relative overflow-hidden transition-all disabled:opacity-50 cursor-pointer mt-2"
                >
                  <span>{bannerFormSubmitting ? "Uploading..." : "Upload Promo Banner"}</span>
                </button>
              </form>
            </section>

            {/* RIGHT COLUMN: Promotional Banners Gallery */}
            <section className="xl:col-span-8 bg-white/4 border border-white/8 rounded-2xl p-6 shadow-xl flex flex-col gap-6 min-h-[500px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-white font-black text-lg tracking-tight">Active & Uploaded Banners</h2>
                <span className="bg-[#c3252e]/10 border border-[#c3252e]/20 text-[#c3252e] px-3 py-0.5 rounded-full font-mono font-bold text-xs">
                  {promotionalBanners.length}
                </span>
              </div>

              {loadingBanners ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-3 border-[#c3252e] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 text-xs">Loading banners...</p>
                </div>
              ) : promotionalBanners.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                  <ImageIcon size={36} className="text-gray-600 mb-2" />
                  <p className="text-gray-400 font-bold text-sm">No promotional banners stored</p>
                  <p className="text-gray-500 text-xs mt-1">Upload a banner on the left panel to begin.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {promotionalBanners.map((banner) => (
                    <div 
                      key={banner.id} 
                      className={`relative border rounded-xl p-4 flex flex-col gap-3 transition-colors ${
                        banner.isActive 
                          ? "bg-green-500/5 border-green-500/30" 
                          : "bg-white/3 border-white/10"
                      }`}
                    >
                      {/* Image Preview */}
                      <div className="relative rounded-lg overflow-hidden border border-white/10 aspect-[21/9] w-full bg-black/40 max-h-[140px]">
                        <img src={banner.image} className="w-full h-full object-cover" alt="Banner" />
                      </div>

                      {/* Info & Toolbar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-gray-500 text-[9px] uppercase tracking-wider font-bold">Redirect Link:</span>
                          <span className="text-gray-300 font-mono">{banner.link || "None (Static Banner)"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Toggle Active status */}
                          <button
                            onClick={() => handleToggleBanner(banner.id, banner.isActive)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                              banner.isActive
                                ? "bg-green-500/20 border border-green-500/40 text-green-400 hover:bg-green-500/30"
                                : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${banner.isActive ? "bg-green-400" : "bg-gray-500"}`} />
                            {banner.isActive ? "Active (On)" : "Inactive (Off)"}
                          </button>

                          {/* Delete Banner */}
                          <button
                            onClick={() => handleDeleteBanner(banner.id)}
                            className="p-1.5 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/40 transition-all hover:bg-red-500/10 cursor-pointer"
                            title="Delete Banner"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        ) : (
          null
        )}
      </main>
    </div>
  );
}

/* ── STYLING TRICKS FOR BUTTON EFFECTS ── */
const styleTag = (
  <style>{`
    .admin-login-btn {
      background: #c3252e;
    }
    .admin-login-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      right: 50%;
      background: #8f8cff;
      transition: transform 0.38s cubic-bezier(0.77, 0, 0.175, 1);
      z-index: 0;
    }
    .admin-login-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      left: 50%;
      background: #8f8cff;
      transition: transform 0.38s cubic-bezier(0.77, 0, 0.175, 1);
      z-index: 0;
    }
    .admin-login-btn:hover::before { transform: translateX(-100%); }
    .admin-login-btn:hover::after  { transform: translateX(100%); }
    .admin-login-btn > span {
      position: relative;
      z-index: 1;
    }
  `}</style>
);
