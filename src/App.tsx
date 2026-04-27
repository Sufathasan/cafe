import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, 
  X, 
  ShoppingCart, 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  ChevronRight,
  Utensils,
  Plus,
  Minus,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  ingredients: string[];
  isSpecial?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

// --- Menu Data ---
const MENU_DATA: MenuItem[] = [
  // Lunch & Dinner (দুপুর ও রাতের খাবার)
  { id: '1', name: 'বিফ কাচ্চি (সিঙ্গেল)', price: 220, category: 'Lunch & Dinner', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop', ingredients: ['Premium Beef', 'Basmati Rice', 'Potatoes'], isSpecial: true },
  { id: '2', name: 'মাটন কাচ্চি (সিঙ্গেল)', price: 280, category: 'Lunch & Dinner', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc9?q=80&w=800&auto=format&fit=crop', ingredients: ['Tender Mutton', 'Basmati Rice', 'Saffron'], isSpecial: true },
  { id: '3', name: 'আফগানী মোরগ পোলাও (সিঙ্গেল)', price: 180, category: 'Lunch & Dinner', image: 'https://images.unsplash.com/photo-1631515233349-55032f917c55?q=80&w=800&auto=format&fit=crop', ingredients: ['Chicken', 'Kalijira Rice', 'Spices'] },
  { id: '3-egg', name: 'আফগানী মোরগ পোলাও (ডিম সহ)', price: 190, category: 'Lunch & Dinner', image: 'https://images.unsplash.com/photo-1631515233349-55032f917c55?q=80&w=800&auto=format&fit=crop', ingredients: ['Chicken', 'Egg', 'Polao Rice'] },
  { id: '4', name: 'আফগানী বিফ তেহারি', price: 130, category: 'Lunch & Dinner', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop', ingredients: ['Beef', 'Small Rice', 'Mustard Oil'] },
  { id: '5', name: 'শাহী ভূনা খিচুড়ি (বিফ)', price: 150, category: 'Lunch & Dinner', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop', ingredients: ['Beef', 'Lentils', 'Rice'] },
  { id: '5-chicken', name: 'শাহী ভূনা খিচুড়ি (চিকেন)', price: 120, category: 'Lunch & Dinner', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop', ingredients: ['Chicken', 'Lentils', 'Rice'] },
  { id: '6', name: 'শাহী শামী কাবাব (বিফ)', price: 35, category: 'Lunch & Dinner', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop', ingredients: ['Beef', 'Herbs', 'Spices'] },
  { id: '6-chicken', name: 'শাহী শামী কাবাব (চিকেন)', price: 25, category: 'Lunch & Dinner', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop', ingredients: ['Chicken', 'Herbs', 'Spices'] },
  { id: 'chutney', name: 'আলু বোখারার চাটনী', price: 60, category: 'Lunch & Dinner', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=800&auto=format&fit=crop', ingredients: ['Alu Bokhara', 'Sugar', 'Spices'] },
  { id: '7', name: 'শাহী বোরহানী (গ্লাস)', price: 60, category: 'Lunch & Dinner', image: 'https://images.unsplash.com/photo-1517093602195-b40af9688b46?q=80&w=800&auto=format&fit=crop', ingredients: ['Yogurt', 'Mint', 'Black Mustard'] },
  { id: 'firni', name: 'শাহী ফিরনী', price: 40, category: 'Lunch & Dinner', image: 'https://images.unsplash.com/photo-1605807646983-377lc55c4a1?q=80&w=800&auto=format&fit=crop', ingredients: ['Milk', 'Rice', 'Sugar'] },
  
  // Snacks (বিকালের নাস্তা)
  { id: 'pakora', name: 'চিকেন ভেজিটেবল পাকুরা', price: 10, category: 'Snacks', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop', ingredients: ['Chicken', 'Vegetables', 'Flour'] },
  { id: 'fries', name: 'ফ্রেঞ্চ ফ্রাই', price: 80, category: 'Snacks', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop', ingredients: ['Potatoes', 'Salt', 'Spices'] },
  { id: 'samosa', name: 'টার্কিশ তান্দুরি সমুচা', price: 40, category: 'Snacks', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop', ingredients: ['Chicken', 'Flour', 'Spices'] },
  { id: '8', name: 'কোরিয়ান ফ্রাইড চিকেন (লেগ)', price: 100, category: 'Snacks', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop', ingredients: ['Chicken Leg', 'Korean Glaze'] },
  { id: '8-qty', name: 'কোরিয়ান ফ্রাইড চিকেন (২৫০ গ্রাম)', price: 150, category: 'Snacks', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop', ingredients: ['Chicken chunks', 'Korean Sauce'] },
  { id: '9', name: 'টার্কিশ চিকেন শর্মা', price: 120, category: 'Snacks', image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=800&auto=format&fit=crop', ingredients: ['Chicken', 'Flatbread', 'Garlic Sauce'] },
  { id: 'halim-nalli', name: 'পেশোয়ারি হালিম (নল্লি)', price: 200, category: 'Snacks', image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=800&auto=format&fit=crop', ingredients: ['Lentils', 'Mutton Bone', 'Wheat'] },
  { id: '10', name: 'পেশোয়ারি হালিম (রেগুলার)', price: 80, category: 'Snacks', image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=800&auto=format&fit=crop', ingredients: ['Lentils', 'Beef', 'Wheat'] },
  { id: 'chap-gravy', name: 'শাহী তাওয়া চিকেন চাপ', price: 140, category: 'Snacks', image: 'https://images.unsplash.com/photo-1601356616077-695728ecf769?q=80&w=800&auto=format&fit=crop', ingredients: ['Chicken', 'Spices', 'Gravy'] },
  { id: 'chap-dry', name: 'শাহী চিকেন চাপ', price: 150, category: 'Snacks', image: 'https://images.unsplash.com/photo-1601356616077-695728ecf769?q=80&w=800&auto=format&fit=crop', ingredients: ['Fried Chicken', 'Special Herbs'] },
  { id: '11', name: 'লাচ্চা পরোটা', price: 30, category: 'Snacks', image: 'https://images.unsplash.com/photo-1626132646529-5aa712c96c42?q=80&w=800&auto=format&fit=crop', ingredients: ['Flour', 'Butter'] },
  { id: 'rumali', name: 'রুমালি রুটি', price: 20, category: 'Snacks', image: 'https://images.unsplash.com/photo-1626132646529-5aa712c96c42?q=80&w=800&auto=format&fit=crop', ingredients: ['Thin Bread'] },
  { id: 'butter-naan', name: 'বাটার নান', price: 40, category: 'Snacks', image: 'https://images.unsplash.com/photo-1626132646529-5aa712c96c42?q=80&w=800&auto=format&fit=crop', ingredients: ['Flour', 'Butter'] },
  { id: 'garlic-naan', name: 'গার্লিক নান', price: 50, category: 'Snacks', image: 'https://images.unsplash.com/photo-1626132646529-5aa712c96c42?q=80&w=800&auto=format&fit=crop', ingredients: ['Flour', 'Garlic'] },
  { id: 'borhani-1l', name: 'শাহী বোরহানী (১ লিটার)', price: 220, category: 'Snacks', image: 'https://images.unsplash.com/photo-1517093602195-b40af9688b46?q=80&w=800&auto=format&fit=crop', ingredients: ['Yogurt', 'Spices'] },
  { id: 'salad-green', name: 'মিক্স গ্রিন সালাদ', price: 20, category: 'Snacks', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop', ingredients: ['Cucumber', 'Tomato', 'Carrot'] },
  { id: 'salad-russian', name: 'কলেসু রাশিয়ান সালাদ', price: 25, category: 'Snacks', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop', ingredients: ['Mayo', 'Fruits', 'Cream'] },
  
  // Drinks (ড্রিংকস)
  { id: '12', name: 'লেমন মিন্ট', price: 60, category: 'Drinks', image: 'https://images.unsplash.com/photo-1513558116348-4d720277d14d?q=80&w=800&auto=format&fit=crop', ingredients: ['Lemon', 'Mint', 'Ice'] },
  { id: 'lassi-salt', name: 'সল্ট লাচ্ছি', price: 80, category: 'Drinks', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=800&auto=format&fit=crop', ingredients: ['Yogurt', 'Salt', 'Ice'] },
  { id: 'lassi-sweet', name: 'সুইট লাচ্ছি', price: 100, category: 'Drinks', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=800&auto=format&fit=crop', ingredients: ['Yogurt', 'Sugar', 'Ice'] },
  { id: 'shake-vanilla', name: 'মিল্ক শেক (ভ্যানিলা)', price: 150, category: 'Drinks', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop', ingredients: ['Milk', 'Vanilla', 'Ice Cream'] },
  { id: 'shake-chocolate', name: 'মিল্ক শেক (চকলেট)', price: 160, category: 'Drinks', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop', ingredients: ['Milk', 'Chocolate', 'Ice Cream'] },
  { id: '14', name: 'কোল্ড কফি', price: 100, category: 'Drinks', image: 'https://images.unsplash.com/photo-1517701604599-bb24b5df510f?q=80&w=800&auto=format&fit=crop', ingredients: ['Coffee', 'Milk', 'Chocolate'] },
  { id: 'coffee-hot', name: 'হট কফি', price: 60, category: 'Drinks', image: 'https://images.unsplash.com/photo-1544787210-2213d2427507?q=80&w=800&auto=format&fit=crop', ingredients: ['Coffee', 'Milk'] },
  { id: '13', name: 'স্পেশাল চা', price: 20, category: 'Drinks', image: 'https://images.unsplash.com/photo-1544787210-2213d2427507?q=80&w=800&auto=format&fit=crop', ingredients: ['Tea', 'Milk', 'Ginger'] },
  { id: 'icecream', name: 'স্পেশাল আইসক্রিম', price: 60, category: 'Drinks', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dabb892?q=80&w=800&auto=format&fit=crop', ingredients: ['Cream', 'Flavor'] },
  { id: 'water', name: 'মিনারেল পানি', price: 20, category: 'Drinks', image: 'https://images.unsplash.com/photo-1523362622744-8c1304404702?q=80&w=800&auto=format&fit=crop', ingredients: ['Pure Water'] },
];

const CATEGORIES = ['All', 'Lunch & Dinner', 'Snacks', 'Drinks'];

// --- Helper Components ---

const Navbar = ({ onCartClick, cartCount }: { onCartClick: () => void, cartCount: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-secondary shadow-lg py-3' : 'bg-secondary py-5'} border-b-4 border-accent`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white border-2 border-accent shadow-lg">
            <span className="font-serif font-bold text-xl">ক</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-serif font-bold text-white leading-tight">ক্যাফে আল- বারাকাহ</h1>
            <span className="text-[10px] block opacity-80 uppercase tracking-widest text-accent font-sans">মقهى البركة</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium">
          {['Home', 'Menu', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-white hover:text-accent transition-colors">
              {item}
            </a>
          ))}
          <button 
            onClick={() => window.location.href = '#menu'}
            className="ml-4 bg-primary px-6 py-2 rounded-full border border-accent text-white font-bold hover:scale-105 transition-transform shadow-md"
          >
            Order Now
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onCartClick}
            className="relative p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-primary text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-secondary border-b border-accent/30 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {['Home', 'Menu', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-lg font-medium hover:text-accent"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const CartPanel = ({ isOpen, onClose, cart, updateQuantity, removeItem }: { 
  isOpen: boolean, 
  onClose: () => void, 
  cart: CartItem[],
  updateQuantity: (id: string, delta: number) => void,
  removeItem: (id: string) => void
}) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-secondary z-[70] shadow-2xl flex flex-col border-l-4 border-accent"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center text-white">
          <h3 className="font-bold uppercase tracking-widest text-xs">Your Cart</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-white/30 italic">
              <ShoppingCart size={48} className="mb-2 opacity-20" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 text-white/90 items-center justify-between">
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded border border-white/20 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold">{item.name}</p>
                    <p className="text-[9px] text-accent">{item.quantity} x ৳{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-white/50 hover:text-white"><Minus size={12}/></button>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-white/50 hover:text-white"><Plus size={12}/></button>
                  <button onClick={() => removeItem(item.id)} className="text-white/30 hover:text-primary ml-2">×</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-white/20 bg-black/10">
            <div className="flex justify-between text-white/60 text-xs mb-1">
              <span>Subtotal</span>
              <span>৳{total}</span>
            </div>
            <div className="flex justify-between text-white font-bold text-xl mb-6">
              <span>Total</span>
              <span className="text-accent">৳{total}</span>
            </div>
            <button className="w-full bg-accent text-primary font-bold py-4 rounded-xl shadow-xl hover:bg-white transition-all transform active:scale-95">
              CHECKOUT NOW
            </button>
            <p className="text-[9px] text-white/40 text-center mt-4 italic font-serif">"নিরাপদ খাদ্য, সুস্থ জীবন"</p>
          </div>
        )}
      </motion.div>
    </>
  );
}

// --- Main App ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const filteredMenu = activeCategory === 'All' 
    ? MENU_DATA 
    : MENU_DATA.filter(item => item.category === activeCategory);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-cream flex items-center justify-center flex-col gap-4">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="text-primary"
        >
          <Utensils size={48} />
        </motion.div>
        <p className="font-serif text-xl text-primary animate-pulse">ক্যাফে আল- বারাকাহ লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar onCartClick={() => setIsCartOpen(true)} cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} />
      <CartPanel 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />

      {/* Hero Section */}
      <section id="home" className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512132411229-c30391241dd8?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-[0.3]"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-serif italic text-lg mb-2 block uppercase tracking-widest">নিরাপদ খাদ্য, সুস্থ জীবন</span>
            <h1 className="text-6xl md:text-9xl font-bold text-white mb-6 drop-shadow-2xl font-serif">
              ক্যাফে আল- বারাকাহ
            </h1>
            <p className="text-xl md:text-2xl text-accent/80 mb-10 max-w-2xl mx-auto font-serif italic font-light leading-relaxed">
              Authentic Taste of Bangladesh - Heritage, Quality, and Perfection.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="#menu" className="w-full sm:w-auto bg-primary text-white border-2 border-accent px-12 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all shadow-2xl">
                View Menu
              </a>
              <a href="#about" className="w-full sm:w-auto bg-secondary text-white border-2 border-accent px-12 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all">
                Our Story
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Row */}
      <section className="py-8 bg-secondary border-y-4 border-accent relative z-20 flex flex-wrap justify-around items-center text-white gap-8 px-6 shadow-2xl">
        {[
          { icon: <CheckCircle2 className="text-accent" />, text: "১০০% হালাল খাবার" },
          { icon: <MapPin className="text-accent" />, text: "জামালপুর স্টেশন রোড" },
          { icon: <Phone className="text-accent" />, text: "+৮৮০১৭১৩-২২৩৭৩০" },
          { icon: <Utensils className="text-accent" />, text: "বিরিয়ানী ও কাবাব" },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 font-serif italic text-sm">
            {item.icon}
            <span className="tracking-wide">{item.text}</span>
          </div>
        ))}
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <p className="text-primary font-serif italic text-sm mb-1 uppercase tracking-tighter">Fresh Selection</p>
            <h2 className="text-4xl md:text-6xl font-bold text-secondary font-serif italic">আমাদের মেনু</h2>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1 rounded text-[11px] font-bold uppercase tracking-wider transition-all border ${
                  activeCategory === cat 
                    ? 'bg-secondary text-white border-secondary shadow-md' 
                    : 'bg-white text-secondary border-secondary/20 hover:border-secondary transition-colors'
                }`}
              >
                {cat === 'All' ? 'Everything' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-3 rounded-xl shadow-sm border border-accent/20 hover:border-primary transition-colors group flex flex-col h-full"
              >
                <div className="h-48 rounded-lg overflow-hidden relative mb-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  {item.isSpecial && (
                    <span className="absolute top-3 left-3 bg-accent text-primary text-[10px] font-bold px-3 py-1 rounded uppercase shadow-lg">
                      Chef's Special
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-start mb-2 px-1">
                  <h3 className="font-bold text-sm leading-tight text-secondary">{item.name}</h3>
                  <span className="text-primary font-bold text-sm">৳{item.price}</span>
                </div>
                <p className="text-[10px] text-gray-500 mb-4 px-1 leading-relaxed opacity-70">
                  {item.ingredients.join(', ')}
                </p>
                <button 
                  onClick={() => addToCart(item)}
                  className="mt-auto w-full py-2 border border-primary text-primary rounded text-[11px] font-bold hover:bg-primary hover:text-white transition-all transform active:scale-95"
                >
                  ADD TO CART
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white/50 border-y border-accent/20">
        <div className="container mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
            <div className="aspect-[4/5] rounded-tl-[5rem] rounded-br-[5rem] overflow-hidden border-8 border-accent shadow-2xl relative z-10">
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop" alt="Chef Cooking" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary p-10 rounded-2xl shadow-2xl z-20 hidden lg:block border-2 border-accent">
              <h4 className="text-accent text-5xl font-serif italic font-bold mb-1">২৫+</h4>
              <p className="text-white/80 text-xs uppercase tracking-widest font-bold">Years of Tradition</p>
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-primary font-serif italic text-sm mb-2 uppercase tracking-tighter">Established with Love</p>
            <h2 className="text-5xl md:text-7xl font-bold text-secondary mb-8 font-serif italic leading-none">
              স্বাদের ঐতিহ্যে <br /> আমরাই সেরা
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-light">
              <div className="p-6 bg-primary/5 rounded-xl border-l-8 border-primary">
                <p>
                  আমাদের যাত্রা শুরু হয়েছিল পরিচ্ছন্ন ও পুষ্টিকর খাবার সবার কাছে পৌঁছে দেয়ার স্বপ্ন নিয়ে। জামালপুরের এই ব্যস্ত শহরে আমরা ধরে রেখেছি মায়ের হাতের রান্নার সেই অকৃত্রিম স্বাদ।
                </p>
              </div>
              <p>
                আমাদের স্পেশাল কাচ্চি বিরিয়ানী থেকে শুরু করে বিকেলের পেশোয়ারি হালিম - প্রতিটি পদের পেছনে রয়েছে দীর্ঘদিনের সাধনা এবং সেরা উপকরণের নিশ্চয়তা। নিরাপদ খাদ্যই আমাদের প্রথম অঙ্গীকার।
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="p-4 border border-accent/30 rounded-lg">
                <h5 className="font-bold text-primary text-xs uppercase tracking-widest mb-2 font-sans">Special Packages</h5>
                <p className="text-[11px] text-gray-500">যেকোনো মেন্যু দিয়েই পছন্দ অনুযায়ী প্যাকেজ সুবিধা।</p>
              </div>
              <div className="p-4 border border-accent/30 rounded-lg">
                <h5 className="font-bold text-primary text-xs uppercase tracking-widest mb-2 font-sans">Party Orders</h5>
                <p className="text-[11px] text-gray-500">বিয়ে বা যেকোনো অনুষ্ঠানে বিশেষ গুরুত্ব দিয়ে থাকি।</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 container mx-auto px-6">
        <div className="bg-secondary rounded-[2rem] border-4 border-accent p-8 md:p-16 grid lg:grid-cols-2 gap-16 overflow-hidden relative shadow-3xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 text-white">
            <p className="text-accent font-serif italic text-sm mb-2 uppercase tracking-tighter">Get in Touch</p>
            <h2 className="text-5xl md:text-7xl font-bold mb-10 font-serif italic leading-none">যোগাযোগ</h2>
            
            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="bg-accent/20 p-4 rounded-full border border-accent/30 group-hover:scale-110 transition-transform">
                  <Phone size={24} className="text-accent" />
                </div>
                <div>
                  <h6 className="font-bold text-xs uppercase tracking-widest text-accent mb-2">Manager Contact</h6>
                  <p className="text-white text-2xl font-serif">+৮৮০১৭১৩-২২৩৭৩০</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="bg-accent/20 p-4 rounded-full border border-accent/30 group-hover:scale-110 transition-transform">
                  <MapPin size={24} className="text-accent" />
                </div>
                <div>
                  <h6 className="font-bold text-xs uppercase tracking-widest text-accent mb-2">Our Location</h6>
                  <p className="text-white text-xl leading-relaxed">লম্বাগাছ, স্টেশন রোড, জামালপুর। <br /> (ফায়ার সার্ভিসের পশ্চিম পার্শ্বে)</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-accent/20 p-4 rounded-full border border-accent/30 group-hover:scale-110 transition-transform">
                  <Clock size={24} className="text-accent" />
                </div>
                <div>
                  <h6 className="font-bold text-xs uppercase tracking-widest text-accent mb-2">Opening Hours</h6>
                  <p className="text-white text-xl">প্রতিদিন: সকাল ১০টা - রাত ১০টা</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl relative z-10 border-t-8 border-primary">
            <h4 className="text-3xl font-bold text-secondary mb-8 font-serif italic">আপনার মেসেজ দিন</h4>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Name</label>
                  <input type="text" className="w-full border-b-2 border-gray-100 py-2 focus:border-primary outline-none transition-all placeholder:text-gray-300" placeholder="আপনার নাম" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone</label>
                  <input type="tel" className="w-full border-b-2 border-gray-100 py-2 focus:border-primary outline-none transition-all placeholder:text-gray-300" placeholder="ফোন নম্বর" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Your Inquiry</label>
                <textarea rows={3} className="w-full border-b-2 border-gray-100 py-2 focus:border-primary outline-none transition-all placeholder:text-gray-300 resize-none" placeholder="আপনার কথাগুলো এখানে লিখুন..."></textarea>
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-xl shadow-primary/20 transform active:scale-95">
                মেসেজ পাঠান
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-bar flex flex-col">
        <div className="bg-gray-950 text-white py-20 px-6 border-t-8 border-accent">
          <div className="container mx-auto grid md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white border-2 border-accent font-serif font-bold text-3xl shadow-xl">ক</div>
                <div>
                  <h1 className="text-3xl font-serif font-bold shadow-text">ক্যাফে আল- বারাকাহ</h1>
                  <span className="text-xs text-accent tracking-[.3em] font-sans">SAFE FOOD, HEALTHY LIFE</span>
                </div>
              </div>
              <p className="text-gray-500 mb-10 max-w-sm leading-relaxed italic font-serif">
                'নিরাপদ খাদ্য, সুস্থ জীবন' - এই স্লোগানকে সামনে রেখে আমরা Jamalpur-এর প্রতিটি মানুষের জন্য সেরা রুচির নিশ্চয়তা দিয়ে আসছি।
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary transition-all border border-white/10 hover:border-accent">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-3">
              <h5 className="text-xs uppercase tracking-[.4em] font-bold text-accent mb-8">Quick Navigation</h5>
              <ul className="space-y-6 font-serif italic text-lg">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#menu" className="text-gray-400 hover:text-white transition-colors">Our Menu</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">The Story</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h5 className="text-xs uppercase tracking-[.4em] font-bold text-accent mb-8">Special Service</h5>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 italic text-gray-400 font-serif leading-relaxed">
                "যেকোনো আইটেম বা যেকোনো মেন্যু দিয়েই পছন্দ অনুযায়ী স্পেশাল প্যাকেজ করে দেওয়া যাবে।"
              </div>
              <div className="mt-8 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Accepting Deliveries & Party Orders</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-12 bg-primary flex items-center justify-between px-8 text-[11px] text-white/70 font-sans tracking-widest uppercase">
          <div>&copy; {new Date().getFullYear()} Cafe Al-Barakah. Professional Service.</div>
          <div className="hidden sm:flex gap-6 italic opacity-80 lowercase">
            <span>Authentic Taste</span>
            <span className="text-accent">•</span>
            <span>Safe Food</span>
            <span className="text-accent">•</span>
            <span>Professional Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
