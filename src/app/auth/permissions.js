class Permissions {
  // ADMIN
  static ADMIN_SECTION = "admin_section";
  static ADMIN_CREATE = "admin_create";
  static ADMIN_READ = "admin_read";

  static ADMIN_SECTION_FA = "منوی ادمین";
  static ADMIN_CREATE_FA = "ایجاد کاربر ادمین";
  static ADMIN_READ_FA = "لیست کاربران ادمین";

  // BROKER
  static BROKER_SECTION = "broker_section";
  static BROKER_READ = "broker_read";
  static BROKER_CREATE = "broker_create";
  static BROKER_SEND_PASSWORD = "broker_send_password";
  static BROKER_REQUEST_READ = "broker_request_read";

  static BROKER_SECTION_FA = "منوی بازاریاب‌ها";
  static BROKER_READ_FA = "مشاهده لیست پروموترها";
  static BROKER_CREATE_FA = "ایجاد یک پروموتر جدید";
  static BROKER_SEND_PASSWORD_FA = "ارسال رمز عبور پروموتر";
  static BROKER_REQUEST_READ_FA = "مشاهده لیست سفارشات پروموترها";

  // CONEX
  static CONEX_CREATE = "conex_create";
  static CONEX_ASSIGN = "conex_assign";
  static CONEX_READ = "conex_read";

  static CONEX_CREATE_FA = "ایجاد یک کانکس جدید";
  static CONEX_ASSIGN_FA = "اختصاص یک کانکس به یک پروموتر";
  static CONEX_READ_FA = "مشاهده لیست کانکس ها";

  // CUSTOMER
  static CUSTOMER_SECTION = "customer_section";
  static CUSTOMER_READ = "customer_read";
  static CUSTOMER_UPDATE = "customer_update";
  static CUSTOMER_DEPOSIT_READ = "customer_deposit_read";

  static CUSTOMER_SECTION_FA = "منوی مشتری‌ها";
  static CUSTOMER_READ_FA = "مشاهده اطلاعات کاربران";
  static CUSTOMER_UPDATE_FA = "ویرایش اطلاعات کاربران";
  static CUSTOMER_DEPOSIT_READ_FA = "مشاهده لیست تراکنش‌های کاربران";

  // CUSTOMER
  static CUSTOMER_HOME_SECTION = "customer_home_section";
  static CUSTOMER_HOME_READ = "customer_home_read";

  static CUSTOMER_HOME_SECTION_FA = "منوی اصلی مشتریان";
  static CUSTOMER_HOME_READ_FA = "مشاهده اطلاعات منوی اصلی مشتریان";

  // DEPOSIT
  static DEPOSIT_READ = "deposit_read";
  static DEPOSIT_UPDATE = "deposit_update";
  static DEPOSIT_SECTION = "deposit_section";

  static DEPOSIT_SECTION_FA = "منوی تراکنش‌ها";
  static DEPOSIT_READ_FA = "مشاهده تراکنش‌ها";
  static DEPOSIT_UPDATE_FA = "ویرایش تراکنش";

  // UNIVERSAL CUSTOMER
  static UNIVERSAL_CUSTOMERS_SECTION = "universal_customers_section";
  static UNIVERSAL_CUSTOMERS_READ = "universal_customers_read";

  static UNIVERSAL_CUSTOMERS_SECTION_FA = "منوی کاربران مکان‌محور";
  static UNIVERSAL_CUSTOMERS_READ_FA = "مشاهده کاربران مکان‌محور";

  // DUMP
  static DUMP_SECTION = "dump_section";
  static DUMP_READ = "dump_read";
  static DUMP_CREATE = "dump_create";
  static DUMP_UPDATE = "dump_update";
  static DUMP_DELETE = "dump_delete";

  static DUMP_SECTION_FA = "منوی پسماندها";
  static DUMP_READ_FA = "مشاهده پسماند‌ها";
  static DUMP_CREATE_FA = "ایجاد پسماند جدید";
  static DUMP_UPDATE_FA = "ویرایش پسماند";
  static DUMP_DELETE_FA = "حذف پسماند";

  // REQUEST UNIVERSAL
  static REQUEST_UNIVERSAL_SECTION = "request_universal_section";
  static REQUEST_UNIVERSAL_READ = "request_universal_read";

  static REQUEST_UNIVERSAL_SECTION_FA = "منوی سفارشات مکان محور";
  static REQUEST_UNIVERSAL_READ_FA = "مشاهده لیست سفارشات بر روی نقشه";

  // REQUEST HOME
  static REQUEST_HOME_SECTION = "request_home_section";
  static REQUEST_HOME = "request_home";

  static REQUEST_HOME_SECTION_FA = "منوی صفحه اصلی";
  static REQUEST_HOME_FA = "مشاهده صفحه اصلی سفارشات";

  // REQUEST SELL
  static REQUEST_SELL_SECTION = "request_sell_section";
  static REQUEST_SELL = "request_sell";

  static REQUEST_SELL_SECTION_FA = "منوی گزارشات فروش";
  static REQUEST_SELL_FA = "مشاهده گزارش فروش سفارشات";

  // REQUEST
  static REQUEST_SECTION = "request_section";
  static REQUEST_READ = "request_read";
  static REQUEST_APPROVE = "request_approve";
  static REQUEST_RESET = "request_reset";
  static REQUEST_ASSIGN = "request_assign";
  static REQUEST_MOVE = "request_move";
  static REQUEST_ARRIVE = "request_arrive";
  static REQUEST_REJECT = "request_reject";
  static REQUEST_LOG_READ = "request_log_read";
  static REQUEST_SURVEY_READ = "request_survey_read";
  static REQUEST_ADD_NOTE = "request_add_note";
  static REQUEST_READ_NOTE = "request_read_note";

  static REQUEST_SECTION_FA = "منوی سفارشات";
  static REQUEST_READ_FA = "مشاهده لیست سفارشات";
  static REQUEST_APPROVE_FA = "تایید سفارشات";
  static REQUEST_RESET_FA = "بازنشانی سفارشات";
  static REQUEST_ASSIGN_FA = "تخصیص سفارش به راننده";
  static REQUEST_MOVE_FA = "اعمال حرکت راننده";
  static REQUEST_ARRIVE_FA = "اعمال رسیدن راننده";
  static REQUEST_REJECT_FA = "لغو سفارشات";
  static REQUEST_LOG_READ_FA = "مشاهده تاریخچه اتفاقات سفارشات";
  static REQUEST_SURVEY_READ_FA = "مشاهده نظرسنجی سفارشات";
  static REQUEST_READ_NOTE_FA = "مشاهده یادداشت سفارشات";
  static REQUEST_ADD_NOTE_FA = "نوشتن یادداشت سفارشات";

  // REPORT
  static REPORT_SECTION = "report_section";
  static REPORT_READ = "report_read";
  static REPORT_CUSTOMER = "report_customer";
  static REPORT_REQUEST = "report_request";
  static REPORT_CONEX = "report_conex";
  static REPORT_CANCELLED_REQUESTS = "report_cancelled_requests";

  static REPORT_SECTION_FA = "منوی گزارشات";
  static REPORT_READ_FA = "مشاهده گزارشات";
  static REPORT_CUSTOMER_FA = "گزارش‌گیری از مشتریان";
  static REPORT_REQUEST_FA = "گزارش‌گیری از سفارشات";
  static REPORT_CONEX_FA = "گزارش گیری از غرفه ها";
  static REPORT_CANCELLED_REQUESTS_FA = "گزارش‌گیری از سفارشات لغوشده";

  static permissionList = [
    {
      name: "ادمین",
      permissions: [
        {
          value: Permissions.ADMIN_SECTION,
          label: Permissions.ADMIN_SECTION_FA,
        },
        { value: Permissions.ADMIN_READ, label: Permissions.ADMIN_READ_FA },
        { value: Permissions.ADMIN_CREATE, label: Permissions.ADMIN_CREATE_FA },
      ],
    },
    {
      name: "پروموترها",
      permissions: [
        {
          value: Permissions.BROKER_SECTION,
          label: Permissions.BROKER_SECTION_FA,
        },
        { value: Permissions.BROKER_READ, label: Permissions.BROKER_READ_FA },
        {
          value: Permissions.BROKER_CREATE,
          label: Permissions.BROKER_CREATE_FA,
        },
        {
          value: Permissions.BROKER_SEND_PASSWORD,
          label: Permissions.BROKER_SEND_PASSWORD_FA,
        },
        {
          value: Permissions.BROKER_REQUEST_READ,
          label: Permissions.BROKER_REQUEST_READ_FA,
        },
      ],
    },

    {
      name: "مشتری‌ها",
      permissions: [
        {
          value: Permissions.CUSTOMER_SECTION,
          label: Permissions.CUSTOMER_SECTION_FA,
        },
        {
          value: Permissions.CUSTOMER_READ,
          label: Permissions.CUSTOMER_READ_FA,
        },
        {
          value: Permissions.CUSTOMER_UPDATE,
          label: Permissions.CUSTOMER_UPDATE_FA,
        },
        {
          value: Permissions.CUSTOMER_DEPOSIT_READ,
          label: Permissions.CUSTOMER_DEPOSIT_READ_FA,
        },
      ],
    },
    {
      name: "تراکنش‌ها",
      permissions: [
        {
          value: Permissions.DEPOSIT_SECTION,
          label: Permissions.DEPOSIT_SECTION_FA,
        },
        {
          value: Permissions.DEPOSIT_READ,
          label: Permissions.DEPOSIT_READ_FA,
        },
        {
          value: Permissions.DEPOSIT_UPDATE,
          label: Permissions.DEPOSIT_UPDATE_FA,
        },
      ],
    },
    {
      name: "پسماندها",
      permissions: [
        { value: Permissions.DUMP_SECTION, label: Permissions.DUMP_SECTION_FA },
        { value: Permissions.DUMP_READ, label: Permissions.DUMP_READ_FA },
        { value: Permissions.DUMP_CREATE, label: Permissions.DUMP_CREATE_FA },
        { value: Permissions.DUMP_UPDATE, label: Permissions.DUMP_UPDATE_FA },
      ],
    },
    {
      name: "سفارشات مکان‌محور",
      permissions: [
        {
          value: Permissions.REQUEST_UNIVERSAL_SECTION,
          label: Permissions.REQUEST_UNIVERSAL_SECTION_FA,
        },
        {
          value: Permissions.REQUEST_UNIVERSAL_READ,
          label: Permissions.REQUEST_UNIVERSAL_READ_FA,
        },
      ],
    },
    {
      name: "کاربران مکان‌محور",
      permissions: [
        {
          value: Permissions.UNIVERSAL_CUSTOMERS_SECTION,
          label: Permissions.UNIVERSAL_CUSTOMERS_SECTION_FA,
        },
        {
          value: Permissions.UNIVERSAL_CUSTOMERS_READ,
          label: Permissions.UNIVERSAL_CUSTOMERS_READ_FA,
        },
      ],
    },
    {
      name: "صفحه اصلی",
      permissions: [
        {
          value: Permissions.REQUEST_HOME_SECTION,
          label: Permissions.REQUEST_HOME_SECTION_FA,
        },
        { value: Permissions.REQUEST_HOME, label: Permissions.REQUEST_HOME_FA },
      ],
    },
    {
      name: "فروش",
      permissions: [
        {
          value: Permissions.REQUEST_SELL_SECTION,
          label: Permissions.REQUEST_SELL_SECTION_FA,
        },
        { value: Permissions.REQUEST_SELL, label: Permissions.REQUEST_SELL_FA },
      ],
    },
    {
      name: "سفارش‌ها",
      permissions: [
        {
          value: Permissions.REQUEST_SECTION,
          label: Permissions.REQUEST_SECTION_FA,
        },
        { value: Permissions.REQUEST_READ, label: Permissions.REQUEST_READ_FA },

        {
          value: Permissions.REQUEST_APPROVE,
          label: Permissions.REQUEST_APPROVE_FA,
        },
        {
          value: Permissions.REQUEST_RESET,
          label: Permissions.REQUEST_RESET_FA,
        },
        {
          value: Permissions.REQUEST_ASSIGN,
          label: Permissions.REQUEST_ASSIGN_FA,
        },
        { value: Permissions.REQUEST_MOVE, label: Permissions.REQUEST_MOVE_FA },
        {
          value: Permissions.REQUEST_ARRIVE,
          label: Permissions.REQUEST_ARRIVE_FA,
        },
        {
          value: Permissions.REQUEST_REJECT,
          label: Permissions.REQUEST_REJECT_FA,
        },
        {
          value: Permissions.REQUEST_LOG_READ,
          label: Permissions.REQUEST_LOG_READ_FA,
        },
        {
          value: Permissions.REQUEST_SURVEY_READ,
          label: Permissions.REQUEST_SURVEY_READ_FA,
        },
        {
          value: Permissions.REQUEST_READ_NOTE,
          label: Permissions.REQUEST_READ_NOTE_FA,
        },
        {
          value: Permissions.REQUEST_ADD_NOTE,
          label: Permissions.REQUEST_ADD_NOTE_FA,
        },
      ],
    },

    {
      name: "گزارشات",
      permissions: [
        {
          value: Permissions.REPORT_SECTION,
          label: Permissions.REPORT_SECTION_FA,
        },
        { value: Permissions.REPORT_READ, label: Permissions.REPORT_READ_FA },
        {
          value: Permissions.REPORT_CUSTOMER,
          label: Permissions.REPORT_CUSTOMER_FA,
        },
        {
          value: Permissions.REPORT_REQUEST,
          label: Permissions.REPORT_REQUEST_FA,
        },
        {
          value: Permissions.REPORT_CONEX,
          label: Permissions.REPORT_CONEX_FA,
        },
        {
          value: Permissions.REPORT_CANCELLED_REQUESTS,
          label: Permissions.REPORT_CANCELLED_REQUESTS_FA,
        },
      ],
    },
    {
      name: "صفحه اصلی مشتریان",
      permissions: [
        {
          value: Permissions.CUSTOMER_HOME_SECTION,
          label: Permissions.CUSTOMER_HOME_SECTION_FA,
        },
        {
          value: Permissions.CUSTOMER_HOME_READ,
          label: Permissions.CUSTOMER_HOME_READ_FA,
        },
      ],
    },
  ];
}

export default Permissions;
