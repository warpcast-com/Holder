# Mini Swap App for Farcaster

یک اپلیکیشن تبدیل توکن (Swap) کوچک برای Farcaster

## ✨ ویژگی‌ها

- تبدیل توکن‌های مختلف روی Base
- محاسبه خودکار فی
- لیدربورد بلادرنگ
- سیستم امتیاز‌دهی
- بدون دیتابیس (In-Memory)
- یکپارچگی 0x API

## 🚀 شروع سریع

### 1. نصب

```bash
npm install
```

### 2. متغیرهای محیطی

فایل `.env.local` را پر کنید:

```env
ZEROX_API_KEY=your_api_key
BASE_RPC_URL=https://mainnet.base.org
ROUTER_ADDRESS=0x...
FEE_RECIPIENT=0x...
NEXT_PUBLIC_FEE_RECIPIENT=0x...
NEXT_PUBLIC_ROUTER_ADDRESS=0x...
```

### 3. اجرا

```bash
npm run dev
```

سپس به `http://localhost:3000` برو.

## 📁 ساختار

```
.
├── lib/
│   ├── inMemoryStore.ts
│   ├── scoring.ts
│   └── web3.ts
├── app/
│   ├── api/
│   │   ├── swap/
│   │   │   ├── quote/route.ts
│   │   │   └── fee/route.ts
│   │   ├── trade/record/route.ts
│   │   └── leaderboard/route.ts
│   ├── components/
│   │   ├── TradeSection.tsx
│   │   ├── Leaderboard.tsx
│   │   └── PointsCard.tsx
│   ├── page.tsx
│   └── layout.tsx
├── contracts/
│   └── FeeSwapRouter.sol
└── package.json
```

## 🔑 متغیرهای محیطی

| متغیر | توضیح |
|-------|-------|
| `ZEROX_API_KEY` | API key از 0x |
| `BASE_RPC_URL` | Base RPC |
| `ROUTER_ADDRESS` | آدرس قرارداد |
| `FEE_RECIPIENT` | دریافت‌کننده فی |

## 📝 لایسنس

MIT
