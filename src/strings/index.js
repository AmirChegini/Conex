/* eslint-disable no-confusing-arrow */
const strings = {

  adminLogin: {
    incorrectParameter: "نام کاربری یا رمز عبور اشتباه وارد شده‌است.",
    max_attempt_reached: "رمز بیش از حد مجاز اشتباه وارد شده‌است.",
  },
  brokerLogin: {
    incorrectParameter: "نام کاربری یا رمز عبور اشتباه وارد شده‌است.",
    max_attempt_reached: "رمز بیش از حد مجاز اشتباه وارد شده‌است.",
  },
  dumps: {
    token_not_exists: "لطفا مجدا به حساب کاربری خود وارد شوید.",
    not_exists: "پسماندی با این مشخصات وجود ندارد.",
  },
  request: {
    token_not_exists: "لطفا مجدا به حساب کاربری خود وارد شوید.",
  },
  broker: {
    already_exists: "کاربری با این نام کاربری قبلا ایجاد شده است.",
      password_sent_to_broker: "رمز عبور به همکار جاروب ارسال شد.",
    broker_not_found: "حساب کاربری مورد نظر یافت نشد.",
    broker_not_exist: "بازاریابی با این مشخصات وجود ندارد.",
    not_allowed: "شما فقط به مناطق تعریف شده خود دسترسی دارید.",

  },
  authorize: {
    exception: "خطا در انجام فرایند.",
    not_authorized: "شما دسترسی لازم را ندارید.",
  },
  admin: {
    exception: "خطا در انجام فرایند.",
    not_authorized: "شما دسترسی لازم را ندارید.",
    not_exist: "ادمینی با این مشخصات وجود ندارد.",
    already_exists: "ادمینی با این شماره تلفن قبلا ایجاد شده است.",
    password_sent_to_admin: "رمز عبور با موفقیت به ادمین مورد نظر ارسال شد.",
    token_not_exists: "لطفا مجدا به حساب کاربری خود وارد شوید.",
  },
  common: {
    exception: "خطا در انجام فرایند.",
    not_authorized: "شما دسترسی لازم را ندارید.",
    forbidden: "عملیات امکان‌پذیر نمی‌باشد.",

  },
  commonWords: {
    conexName: "نام غرفه",
    conexAddress: "آدرس غرفه",
    brokerName: "نام غرفه دار",
    brokerPhone: "شماره تماس غرفه دار",
    customerName: "نام مشتری",
    customerPhone: "شماره تماس مشتری",
    region: "منطقه",
    buyPrice: "قیمت خرید",
    sellPrice: "قیمت فروش",
    paid: "پرداخت شده",
    createdAt: "زمان ایجاد",
    yes: "بله",
    no: "خیر",
    requestCount: "تعداد سفارشات",
    totalBuyPrice: "مجموع قیمت خرید پسماندها",
    totalSellPrice: "مجموع قیمت فروش پسماندها",
  },


  conex: {
    token_not_exists: "لطفا مجدا به حساب کاربری خود وارد شوید.",
    address_not_covered: "آدرس انتخابی شما، خارج از محدوده شهر تهران می‌باشد.",
    conex_not_exists: "غرفه ای با این مشحصات وجود ندارد.",
    broker_not_exists: "غرفه داذی با این مشخصات وجود ندارد.",
    not_allowed: "شما فقط به مناطق تعریف شده خود دسترسی دارید.",
  },
};

export default strings;
