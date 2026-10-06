(() => {
  'use strict';
  // Page-local translations. Component names and copyable code remain unchanged.
  const phrases = [
  {
    "en": "Simple components.",
    "ru": "Простые компоненты.",
    "uz": "Oddiy komponentlar."
  },
  {
    "en": "Clean interfaces.",
    "ru": "Понятные интерфейсы.",
    "uz": "Tushunarli interfeyslar."
  },
  {
    "en": "A collection of reusable UI components built with HTML, CSS and JavaScript. Explore, preview and copy the code for your own projects.",
    "ru": "Коллекция UI-компонентов на HTML, CSS и JavaScript для повторного использования. Изучайте примеры, проверяйте их работу и копируйте код в свои проекты.",
    "uz": "HTML, CSS va JavaScript asosida yaratilgan, qayta foydalanish mumkin bo‘lgan UI komponentlari to‘plami. Misollarni o‘rganing, sinab ko‘ring va kodni loyihalaringizga nusxalang."
  },
  {
    "en": "Explore Components",
    "ru": "Смотреть компоненты",
    "uz": "Komponentlarni ko‘rish"
  },
  {
    "en": "Categories",
    "ru": "Категории",
    "uz": "Kategoriyalar"
  },
  {
    "en": "Components",
    "ru": "Компоненты",
    "uz": "Komponentlar"
  },
  {
    "en": "Interactive Component",
    "ru": "Интерактивный компонент",
    "uz": "Interaktiv komponent"
  },
  {
    "en": "Clean. Reusable. Simple.",
    "ru": "Понятно. Удобно. Просто.",
    "uz": "Tushunarli. Qayta ishlatiladigan. Oddiy."
  },
  {
    "en": "Preview",
    "ru": "Просмотр",
    "uz": "Ko‘rish"
  },
  {
    "en": "LIBRARY",
    "ru": "БИБЛИОТЕКА",
    "uz": "KUTUBXONA"
  },
  {
    "en": "LIVE COMPONENT",
    "ru": "ИНТЕРАКТИВНЫЙ ПРИМЕР",
    "uz": "INTERAKTIV MISOL"
  },
  {
    "en": "Live Preview",
    "ru": "Предпросмотр",
    "uz": "Jonli ko‘rinish"
  },
  {
    "en": "Copy",
    "ru": "Копировать",
    "uz": "Nusxalash"
  },
  {
    "en": "Copied!",
    "ru": "Скопировано!",
    "uz": "Nusxalandi!"
  },
  {
    "en": "Copy failed",
    "ru": "Не удалось скопировать",
    "uz": "Nusxalab bo‘lmadi"
  },
  {
    "en": "Progress",
    "ru": "Прогресс",
    "uz": "Jarayon"
  },
  {
    "en": "Uploading",
    "ru": "Загрузка",
    "uz": "Yuklanmoqda"
  },
  {
    "en": "Completed",
    "ru": "Завершено",
    "uz": "Tugallandi"
  },
  {
    "en": "Start",
    "ru": "Начало",
    "uz": "Boshlash"
  },
  {
    "en": "Profile",
    "ru": "Профиль",
    "uz": "Profil"
  },
  {
    "en": "Payment",
    "ru": "Оплата",
    "uz": "To‘lov"
  },
  {
    "en": "Done",
    "ru": "Готово",
    "uz": "Tayyor"
  },
  {
    "en": "Get Started",
    "ru": "Начать",
    "uz": "Boshlash"
  },
  {
    "en": "Learn More",
    "ru": "Подробнее",
    "uz": "Batafsil"
  },
  {
    "en": "Loading",
    "ru": "Загрузка",
    "uz": "Yuklanmoqda"
  },
  {
    "en": "Loading...",
    "ru": "Загрузка…",
    "uz": "Yuklanmoqda…"
  },
  {
    "en": "Submit",
    "ru": "Отправить",
    "uz": "Yuborish"
  },
  {
    "en": "Home",
    "ru": "Главная",
    "uz": "Bosh sahifa"
  },
  {
    "en": "Settings",
    "ru": "Настройки",
    "uz": "Sozlamalar"
  },
  {
    "en": "Overview",
    "ru": "Обзор",
    "uz": "Umumiy ma’lumot"
  },
  {
    "en": "Details",
    "ru": "Подробности",
    "uz": "Tafsilotlar"
  },
  {
    "en": "Reviews",
    "ru": "Отзывы",
    "uz": "Sharhlar"
  },
  {
    "en": "General",
    "ru": "Общие",
    "uz": "Umumiy"
  },
  {
    "en": "Security",
    "ru": "Безопасность",
    "uz": "Xavfsizlik"
  },
  {
    "en": "Structure and content of the interface.",
    "ru": "Структура и содержимое интерфейса.",
    "uz": "Interfeys tuzilishi va mazmuni."
  },
  {
    "en": "Styles, layout and visual design.",
    "ru": "Стили, расположение элементов и оформление.",
    "uz": "Uslublar, elementlar joylashuvi va tashqi ko‘rinish."
  },
  {
    "en": "Logic and interactive behaviour.",
    "ru": "Логика и интерактивное поведение.",
    "uz": "Mantiq va interaktiv ishlash."
  },
  {
    "en": "Overview and main information.",
    "ru": "Обзор и основная информация.",
    "uz": "Umumiy ko‘rinish va asosiy ma’lumotlar."
  },
  {
    "en": "Personal information and account details.",
    "ru": "Личная информация и данные аккаунта.",
    "uz": "Shaxsiy ma’lumotlar va hisob tafsilotlari."
  },
  {
    "en": "Preferences and application settings.",
    "ru": "Параметры и настройки приложения.",
    "uz": "Ilova parametrlari va sozlamalari."
  },
  {
    "en": "General information about the selected item.",
    "ru": "Общая информация о выбранном элементе.",
    "uz": "Tanlangan element haqida umumiy ma’lumot."
  },
  {
    "en": "More detailed information and specifications.",
    "ru": "Подробная информация и характеристики.",
    "uz": "Batafsil ma’lumot va xususiyatlar."
  },
  {
    "en": "User feedback and opinions.",
    "ru": "Отзывы и мнения пользователей.",
    "uz": "Foydalanuvchilarning fikr va mulohazalari."
  },
  {
    "en": "General preferences and application settings.",
    "ru": "Общие параметры и настройки приложения.",
    "uz": "Umumiy parametrlar va ilova sozlamalari."
  },
  {
    "en": "Manage your personal information and account details.",
    "ru": "Управляйте личной информацией и данными аккаунта.",
    "uz": "Shaxsiy ma’lumotlaringiz va hisob tafsilotlarini boshqaring."
  },
  {
    "en": "Manage passwords, sessions and security options.",
    "ru": "Управляйте паролями, сеансами и параметрами безопасности.",
    "uz": "Parollar, seanslar va xavfsizlik parametrlarini boshqaring."
  },
  {
    "en": "Open Modal",
    "ru": "Открыть окно",
    "uz": "Oynani ochish"
  },
  {
    "en": "Welcome",
    "ru": "Добро пожаловать",
    "uz": "Xush kelibsiz"
  },
  {
    "en": "This is a simple modal window with a title, description and close button.",
    "ru": "Простое модальное окно с заголовком, описанием и кнопкой закрытия.",
    "uz": "Sarlavha, tavsif va yopish tugmasiga ega oddiy modal oyna."
  },
  {
    "en": "Close",
    "ru": "Закрыть",
    "uz": "Yopish"
  },
  {
    "en": "Open Confirm",
    "ru": "Открыть подтверждение",
    "uz": "Tasdiqlash oynasini ochish"
  },
  {
    "en": "Delete item?",
    "ru": "Удалить элемент?",
    "uz": "Element o‘chirilsinmi?"
  },
  {
    "en": "This action cannot be undone. Are you sure you want to continue?",
    "ru": "Это действие нельзя отменить. Вы уверены, что хотите продолжить?",
    "uz": "Bu amalni bekor qilib bo‘lmaydi. Davom etishni xohlaysizmi?"
  },
  {
    "en": "Cancel",
    "ru": "Отмена",
    "uz": "Bekor qilish"
  },
  {
    "en": "Delete",
    "ru": "Удалить",
    "uz": "O‘chirish"
  },
  {
    "en": "Open Form",
    "ru": "Открыть форму",
    "uz": "Shaklni ochish"
  },
  {
    "en": "CONTACT FORM",
    "ru": "ФОРМА СВЯЗИ",
    "uz": "ALOQA SHAKLI"
  },
  {
    "en": "Send message",
    "ru": "Отправить сообщение",
    "uz": "Xabar yuborish"
  },
  {
    "en": "Name",
    "ru": "Имя",
    "uz": "Ism"
  },
  {
    "en": "Email",
    "ru": "Электронная почта",
    "uz": "Elektron pochta"
  },
  {
    "en": "Send",
    "ru": "Отправить",
    "uz": "Yuborish"
  },
  {
    "en": "Open Fullscreen",
    "ru": "Открыть на весь экран",
    "uz": "To‘liq ekranda ochish"
  },
  {
    "en": "FULLSCREEN MODAL",
    "ru": "ПОЛНОЭКРАННОЕ ОКНО",
    "uz": "TO‘LIQ EKRANLI OYNA"
  },
  {
    "en": "Project Preview",
    "ru": "Просмотр проекта",
    "uz": "Loyihani ko‘rish"
  },
  {
    "en": "Fullscreen content",
    "ru": "Содержимое на весь экран",
    "uz": "To‘liq ekranli mazmun"
  },
  {
    "en": "Use this modal when you need more space for complex content, previews or large forms.",
    "ru": "Используйте это окно, когда нужно больше места для сложного содержимого, предпросмотра или больших форм.",
    "uz": "Murakkab mazmun, ko‘rib chiqish yoki katta shakllar uchun ko‘proq joy kerak bo‘lsa, ushbu oynadan foydalaning."
  },
  {
    "en": "Question",
    "ru": "Вопрос",
    "uz": "Savol"
  },
  {
    "en": "How does it work?",
    "ru": "Как это работает?",
    "uz": "Bu qanday ishlaydi?"
  },
  {
    "en": "Is it responsive?",
    "ru": "Есть ли адаптивность?",
    "uz": "Ekranga moslashadimi?"
  },
  {
    "en": "Can I customize it?",
    "ru": "Можно ли настроить?",
    "uz": "Uni sozlash mumkinmi?"
  },
  {
    "en": "What is an accordion?",
    "ru": "Что такое аккордеон?",
    "uz": "Akkordeon nima?"
  },
  {
    "en": "An accordion helps show more information without taking too much space.",
    "ru": "Аккордеон позволяет показать больше информации, занимая меньше места.",
    "uz": "Akkordeon ko‘p joy egallamasdan ko‘proq ma’lumot ko‘rsatishga yordam beradi."
  },
  {
    "en": "Where can I use it?",
    "ru": "Где его использовать?",
    "uz": "Uni qayerda ishlatish mumkin?"
  },
  {
    "en": "You can use accordions for FAQs, settings, details and documentation.",
    "ru": "Аккордеоны подходят для частых вопросов, настроек, подробностей и документации.",
    "uz": "Akkordeonlardan ko‘p beriladigan savollar, sozlamalar, tafsilotlar va hujjatlar uchun foydalanish mumkin."
  },
  {
    "en": "Does it need JavaScript?",
    "ru": "Нужен ли JavaScript?",
    "uz": "JavaScript kerakmi?"
  },
  {
    "en": "JavaScript is used here to open and close each section.",
    "ru": "Здесь JavaScript открывает и закрывает разделы.",
    "uz": "Bu yerda JavaScript bo‘limlarni ochish va yopish uchun ishlatiladi."
  },
  {
    "en": "Manage general preferences and application settings.",
    "ru": "Управляйте общими параметрами и настройками приложения.",
    "uz": "Umumiy parametrlar va ilova sozlamalarini boshqaring."
  },
  {
    "en": "Manage passwords, sessions and account security.",
    "ru": "Управляйте паролями, сеансами и безопасностью аккаунта.",
    "uz": "Parollar, seanslar va hisob xavfsizligini boshqaring."
  },
  {
    "en": "Update your profile information and account details.",
    "ru": "Обновляйте информацию профиля и данные аккаунта.",
    "uz": "Profil ma’lumotlari va hisob tafsilotlarini yangilang."
  },
  {
    "en": "How does this component work?",
    "ru": "Как работает этот компонент?",
    "uz": "Bu komponent qanday ishlaydi?"
  },
  {
    "en": "Click a question to open its answer. Opening another question automatically closes the previous one.",
    "ru": "Нажмите на вопрос, чтобы увидеть ответ. При открытии другого вопроса предыдущий автоматически закрывается.",
    "uz": "Javobni ko‘rish uchun savolni bosing. Boshqa savol ochilganda oldingisi avtomatik yopiladi."
  },
  {
    "en": "Is the accordion responsive?",
    "ru": "Адаптируется ли аккордеон к экрану?",
    "uz": "Akkordeon ekranga moslashadimi?"
  },
  {
    "en": "Yes. The component adapts to the available width of its container.",
    "ru": "Да. Компонент подстраивается под доступную ширину контейнера.",
    "uz": "Ha. Komponent o‘z konteynerining mavjud kengligiga moslashadi."
  },
  {
    "en": "Can I customize the styles?",
    "ru": "Можно ли изменить стили?",
    "uz": "Uslublarni o‘zgartirish mumkinmi?"
  },
  {
    "en": "Yes. Colors, spacing, typography and animations can be changed with CSS.",
    "ru": "Да. Цвета, отступы, шрифты и анимации можно изменить с помощью CSS.",
    "uz": "Ha. Ranglar, oraliqlar, shriftlar va animatsiyalarni CSS yordamida o‘zgartirish mumkin."
  },
  {
    "en": "HTML Structure",
    "ru": "Структура HTML",
    "uz": "HTML tuzilishi"
  },
  {
    "en": "HTML defines the structure and semantic content of the interface.",
    "ru": "HTML определяет структуру и смысловое содержимое интерфейса.",
    "uz": "HTML interfeys tuzilishi va semantik mazmunini belgilaydi."
  },
  {
    "en": "CSS Styling",
    "ru": "Оформление CSS",
    "uz": "CSS bilan bezash"
  },
  {
    "en": "CSS controls layout, spacing, colors and visual presentation.",
    "ru": "CSS управляет расположением элементов, отступами, цветами и оформлением.",
    "uz": "CSS elementlar joylashuvi, oraliqlar, ranglar va tashqi ko‘rinishni boshqaradi."
  },
  {
    "en": "JavaScript Logic",
    "ru": "Логика JavaScript",
    "uz": "JavaScript mantiqi"
  },
  {
    "en": "JavaScript adds interaction and controls the open state of each item.",
    "ru": "JavaScript добавляет интерактивность и управляет открытием каждого элемента.",
    "uz": "JavaScript interaktivlikni qo‘shadi va har bir elementning ochiq holatini boshqaradi."
  },
  {
    "en": "Success",
    "ru": "Успешно",
    "uz": "Muvaffaqiyatli"
  },
  {
    "en": "Saved successfully",
    "ru": "Успешно сохранено",
    "uz": "Muvaffaqiyatli saqlandi"
  },
  {
    "en": "Error",
    "ru": "Ошибка",
    "uz": "Xato"
  },
  {
    "en": "Something went wrong",
    "ru": "Что-то пошло не так",
    "uz": "Xatolik yuz berdi"
  },
  {
    "en": "Information",
    "ru": "Информация",
    "uz": "Ma’lumot"
  },
  {
    "en": "New update available",
    "ru": "Доступно новое обновление",
    "uz": "Yangi yangilanish mavjud"
  },
  {
    "en": "Item deleted",
    "ru": "Элемент удалён",
    "uz": "Element o‘chirildi"
  },
  {
    "en": "Undo",
    "ru": "Отменить",
    "uz": "Bekor qilish"
  },
  {
    "en": "Show Toast",
    "ru": "Показать уведомление",
    "uz": "Bildirishnomani ko‘rsatish"
  },
  {
    "en": "Successfully saved",
    "ru": "Успешно сохранено",
    "uz": "Muvaffaqiyatli saqlandi"
  },
  {
    "en": "Your changes have been saved.",
    "ru": "Изменения сохранены.",
    "uz": "O‘zgartirishlaringiz saqlandi."
  },
  {
    "en": "Show Error",
    "ru": "Показать ошибку",
    "uz": "Xatoni ko‘rsatish"
  },
  {
    "en": "Please try again in a few moments.",
    "ru": "Попробуйте ещё раз немного позже.",
    "uz": "Birozdan so‘ng qayta urinib ko‘ring."
  },
  {
    "en": "Show Info",
    "ru": "Показать информацию",
    "uz": "Ma’lumotni ko‘rsatish"
  },
  {
    "en": "Update available",
    "ru": "Доступно обновление",
    "uz": "Yangilanish mavjud"
  },
  {
    "en": "A new version is ready to install.",
    "ru": "Новая версия готова к установке.",
    "uz": "Yangi versiya o‘rnatishga tayyor."
  },
  {
    "en": "Delete Item",
    "ru": "Удалить элемент",
    "uz": "Elementni o‘chirish"
  },
  {
    "en": "You can restore it for a few seconds.",
    "ru": "Вы можете восстановить его в течение нескольких секунд.",
    "uz": "Uni bir necha soniya ichida tiklashingiz mumkin."
  },
  {
    "en": "Item restored",
    "ru": "Элемент восстановлен",
    "uz": "Element tiklandi"
  },
  {
    "en": "Your item has been restored.",
    "ru": "Ваш элемент восстановлен.",
    "uz": "Elementingiz tiklandi."
  },
  {
    "en": "Projects",
    "ru": "Проекты",
    "uz": "Loyihalar"
  },
  {
    "en": "About",
    "ru": "Обо мне",
    "uz": "Men haqimda"
  },
  {
    "en": "Contact",
    "ru": "Контакты",
    "uz": "Aloqa"
  },
  {
    "en": "Open Menu",
    "ru": "Открыть меню",
    "uz": "Menyuni ochish"
  },
  {
    "en": "Menu",
    "ru": "Меню",
    "uz": "Menyu"
  },
  {
    "en": "Frontend Developer",
    "ru": "Фронтенд-разработчик",
    "uz": "Frontend dasturchi"
  },
  {
    "en": "Mechanical Keyboard",
    "ru": "Механическая клавиатура",
    "uz": "Mexanik klaviatura"
  },
  {
    "en": "Hover me",
    "ru": "Наведите курсор",
    "uz": "Kursorni olib keling"
  },
  {
    "en": "Interactive card",
    "ru": "Интерактивная карточка",
    "uz": "Interaktiv kartochka"
  },
  {
    "en": "Available for work",
    "ru": "Открыт к предложениям",
    "uz": "Ish takliflariga ochiqman"
  },
  {
    "en": "I build responsive and interactive web interfaces with HTML, CSS and JavaScript.",
    "ru": "Создаю адаптивные и интерактивные веб-интерфейсы на HTML, CSS и JavaScript.",
    "uz": "HTML, CSS va JavaScript yordamida moslashuvchan va interaktiv veb-interfeyslar yarataman."
  },
  {
    "en": "Years",
    "ru": "Лет",
    "uz": "Yil"
  },
  {
    "en": "Follow",
    "ru": "Подписаться",
    "uz": "Obuna bo‘lish"
  },
  {
    "en": "Following",
    "ru": "Вы подписаны",
    "uz": "Obuna bo‘lingan"
  },
  {
    "en": "Message",
    "ru": "Написать",
    "uz": "Xabar yozish"
  },
  {
    "en": "New",
    "ru": "Новинка",
    "uz": "Yangi"
  },
  {
    "en": "Accessories",
    "ru": "Аксессуары",
    "uz": "Aksessuarlar"
  },
  {
    "en": "Compact mechanical keyboard with tactile switches and customizable backlight.",
    "ru": "Компактная механическая клавиатура с тактильными переключателями и настраиваемой подсветкой.",
    "uz": "Taktil tugmalar va sozlanadigan yoritishga ega ixcham mexanik klaviatura."
  },
  {
    "en": "Add to cart",
    "ru": "В корзину",
    "uz": "Savatga qo‘shish"
  },
  {
    "en": "Added ✓",
    "ru": "Добавлено ✓",
    "uz": "Qo‘shildi ✓"
  },
  {
    "en": "Interactive dashboard for tracking income, expenses and financial statistics.",
    "ru": "Интерактивная панель для учёта доходов, расходов и финансовой статистики.",
    "uz": "Daromad, xarajatlar va moliyaviy statistikani kuzatish uchun interaktiv panel."
  },
  {
    "en": "Live Demo",
    "ru": "Открыть демо",
    "uz": "Namoyishni ochish"
  },
  {
    "en": "View Project",
    "ru": "Посмотреть проект",
    "uz": "Loyihani ko‘rish"
  },
  {
    "en": "Move your cursor over the card to reveal additional content and actions.",
    "ru": "Наведите курсор на карточку, чтобы увидеть дополнительное содержимое и действия.",
    "uz": "Qo‘shimcha mazmun va amallarni ko‘rish uchun kursorni kartochka ustiga olib keling."
  },
  {
    "en": "Play Animation",
    "ru": "Запустить анимацию",
    "uz": "Animatsiyani boshlash"
  },
  {
    "en": "Smooth continuous movement created with CSS keyframes.",
    "ru": "Плавное непрерывное движение с помощью ключевых кадров CSS.",
    "uz": "CSS asosiy kadrlari yordamida yaratilgan silliq uzluksiz harakat."
  },
  {
    "en": "Online",
    "ru": "В сети",
    "uz": "Tarmoqda"
  },
  {
    "en": "System is active",
    "ru": "Система активна",
    "uz": "Tizim faol"
  },
  {
    "en": "Content appears after the overlay slides away.",
    "ru": "Содержимое появляется после сдвига перекрывающего слоя.",
    "uz": "Mazmun ustidagi qatlam siljigandan so‘ng paydo bo‘ladi."
  },
  {
    "en": "Play Reveal",
    "ru": "Показать анимацию",
    "uz": "Animatsiyani ko‘rsatish"
  },
  {
    "en": "Your name",
    "ru": "Ваше имя",
    "uz": "Ismingiz"
  },
  {
    "en": "Next",
    "ru": "Далее",
    "uz": "Keyingi"
  },
  {
    "en": "Close modal",
    "ru": "Закрыть окно",
    "uz": "Oynani yopish"
  },
  {
    "en": "Close notification",
    "ru": "Закрыть уведомление",
    "uz": "Bildirishnomani yopish"
  },
  {
    "en": "Open navigation",
    "ru": "Открыть навигацию",
    "uz": "Navigatsiyani ochish"
  },
  {
    "en": "Close navigation",
    "ru": "Закрыть навигацию",
    "uz": "Navigatsiyani yopish"
  },
  {
    "en": "Open menu",
    "ru": "Открыть меню",
    "uz": "Menyuni ochish"
  },
  {
    "en": "Close menu",
    "ru": "Закрыть меню",
    "uz": "Menyuni yopish"
  },
  {
    "en": "Change theme",
    "ru": "Сменить тему",
    "uz": "Mavzuni almashtirish"
  },
  {
    "en": "Mini-projects",
    "ru": "Мини-проекты",
    "uz": "Mini-loyihalar"
  },
  {
    "en": "About me",
    "ru": "Обо мне",
    "uz": "Men haqimda"
  },
  {
    "en": "Back to top ↑",
    "ru": "Наверх ↑",
    "uz": "Yuqoriga ↑"
  },
  {
    "en": "Baxrom UI — Component Library",
    "ru": "Baxrom UI — Библиотека компонентов",
    "uz": "Baxrom UI — Komponentlar kutubxonasi"
  },
  {
    "en": "Animated loading states for applications and interfaces.",
    "ru": "Анимированные состояния загрузки для приложений и интерфейсов.",
    "uz": "Ilovalar va interfeyslar uchun animatsiyali yuklanish holatlari."
  },
  {
    "en": "Progress indicators for uploads, processes and tasks.",
    "ru": "Индикаторы прогресса для загрузки, процессов и выполнения задач.",
    "uz": "Yuklash, jarayonlar va vazifalar bajarilishini ko‘rsatuvchi indikatorlar."
  },
  {
    "en": "Buttons for primary actions, navigation and interactive interface states.",
    "ru": "Кнопки для основных действий, навигации и интерактивных состояний интерфейса.",
    "uz": "Asosiy amallar, navigatsiya va interfeysning interaktiv holatlari uchun tugmalar."
  },
  {
    "en": "Content switches for compact navigation between related sections.",
    "ru": "Переключатели контента для компактной навигации между связанными разделами.",
    "uz": "O‘zaro bog‘liq bo‘limlar orasida ixcham navigatsiya uchun mazmun almashgichlari."
  },
  {
    "en": "Modal windows for notifications, confirmations, forms and additional content.",
    "ru": "Модальные окна для уведомлений, подтверждений, форм и дополнительного контента.",
    "uz": "Bildirishnomalar, tasdiqlash, shakllar va qo‘shimcha mazmun uchun modal oynalar."
  },
  {
    "en": "Expandable sections for displaying additional information compactly.",
    "ru": "Раскрывающиеся блоки для компактного отображения дополнительной информации.",
    "uz": "Qo‘shimcha ma’lumotni ixcham ko‘rsatish uchun ochiladigan bo‘limlar."
  },
  {
    "en": "Brief notifications for success, errors, information and quick responses.",
    "ru": "Короткие уведомления для успешных действий, ошибок, информации и быстрых ответов.",
    "uz": "Muvaffaqiyatli amallar, xatolar, ma’lumotlar va tezkor javoblar uchun qisqa bildirishnomalar."
  },
  {
    "en": "Mobile menus and animated burger buttons for compact navigation.",
    "ru": "Мобильные меню и анимированные burger-кнопки для компактной навигации.",
    "uz": "Ixcham navigatsiya uchun mobil menyular va animatsiyali burger tugmalari."
  },
  {
    "en": "Versatile cards for profiles, products, projects and interactive content.",
    "ru": "Универсальные карточки для профилей, товаров, проектов и интерактивного контента.",
    "uz": "Profillar, mahsulotlar, loyihalar va interaktiv mazmun uchun universal kartochkalar."
  },
  {
    "en": "Baxrom UI — a collection of interactive UI components built with HTML, CSS and JavaScript.",
    "ru": "Baxrom UI — коллекция интерактивных UI-компонентов на HTML, CSS и JavaScript.",
    "uz": "Baxrom UI — HTML, CSS va JavaScript asosidagi interaktiv UI komponentlari to‘plami."
  }
];
  const excluded = 'script, style, pre, code, [data-i18n], .language__button, .ui-sidebar__item, .ui-category-header__title, .ui-component-detail__title, .ui-showcase-card__bottom h3, .ui-code__tab, .ui-component-detail__badge, .ui-hero-floating-code';
  const normalize = text => text.trim().replace(/\s+/g, ' ');
  const lookup = new Map();
  for (const phrase of phrases) lookup.set(phrase.en, phrase);
  for (const phrase of phrases) {
    for (const lang of ['ru', 'uz']) if (!lookup.has(phrase[lang])) lookup.set(phrase[lang], phrase);
  }
  const textState = new WeakMap();
  const attributeState = new WeakMap();
  function translated(value, previous, lang) {
    const phrase = previous?.rendered === value ? previous.phrase : lookup.get(normalize(value));
    if (!phrase) return null;
    const rendered = value.replace(/^(\s*)[\s\S]*?(\s*)$/, (_, before, after) => before + phrase[lang] + after);
    return { phrase, rendered };
  }
  function update() {
    const lang = ['ru', 'uz', 'en'].includes(document.documentElement.lang) ? document.documentElement.lang : 'ru';
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) { return node.parentElement.closest(excluded) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; }
    });
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const next = translated(node.data, textState.get(node), lang);
      if (!next) continue;
      textState.set(node, next);
      if (node.data !== next.rendered) node.data = next.rendered;
    }
    for (const element of document.querySelectorAll('[aria-label], [placeholder], meta[name="description"]')) {
      if (element.closest('pre, code')) continue;
      let states = attributeState.get(element);
      if (!states) attributeState.set(element, states = new Map());
      for (const attr of ['aria-label', 'placeholder', 'content']) {
        if (!element.hasAttribute(attr)) continue;
        const next = translated(element.getAttribute(attr), states.get(attr), lang);
        if (!next) continue;
        states.set(attr, next);
        if (element.getAttribute(attr) !== next.rendered) element.setAttribute(attr, next.rendered);
      }
    }
    document.title = phrases.find(p => p.en === 'Baxrom UI — Component Library')[lang];
  }
  // Existing demos replace their labels on clicks and timers. Reapply the current
  // language to those new text nodes without replacing elements or event handlers.
  const observer = new MutationObserver(() => {
    observer.disconnect();
    try { update(); } finally { observe(); }
  });
  function observe() {
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['aria-label', 'placeholder'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
  update();
  observe();
})();
