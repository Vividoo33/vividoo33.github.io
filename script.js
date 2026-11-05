// Vividoo — AI 技能菜單、課程、預約試算、聯絡表單
(() => {
  'use strict';
  document.documentElement.classList.replace('no-js', 'js');

  const GROUPS = [
    { id: 'data', title: '數據分析' },
    { id: 'finance', title: '財務管理' },
    { id: 'ads', title: '廣告投放與行銷成長' },
    { id: 'product', title: '競品研究與商品開發' },
    { id: 'service', title: '客服與顧客體驗' },
    { id: 'office', title: '辦公室行政與跨部門協作' },
    { id: 'personal', title: '個人助理' }
  ];

  // 每個技能 = 預設系統指令（Instructions）＋ 背景知識庫（Knowledge）
  const SKILLS = [
    {
      group: 'data',
      title: '營運數據儀表板生成器',
      pain: '每週要從好幾份報表手動拼 Excel 圖表給主管，格式每次都不一樣，數字也常對不上。',
      knowledge: '公司 KPI 定義與計算公式、儀表板版型與品牌色規範。',
      skill: '丟入銷售、流量、廣告等原始數據，自動計算營收、轉換率、客單價、ROAS 等關鍵指標，用 Claude Artifacts 生成可互動篩選的網頁儀表板，並標出異常波動與本週重點。',
      tags: ['Claude Artifacts', '互動儀表板']
    },
    {
      group: 'data',
      title: '數據報告投影片自動生成師',
      pain: '數據分析做完了，還要再花半天把圖表一張張貼進簡報、寫結論。',
      knowledge: '公司簡報範本與品牌色、月報／季報固定章節架構。',
      skill: '上傳數據或分析結果，自動挑出關鍵洞察並繪製圖表，依「結論先行」產出 8–12 頁月報投影片，可直接下載 PPTX 或匯入 Google 簡報。',
      tags: ['PPTX', 'Google 簡報']
    },
    {
      group: 'data',
      title: '電商跨平台報表清洗與 ROAS 診斷器',
      pain: '蝦皮、Momo、官網（Shopify / 91APP）導出的報表欄位名稱全都不同，人工整併耗時。',
      knowledge: '公司標準報表欄位定義檔、毛利率計算公式、各產品線成本表。',
      skill: '丟入多份原始 CSV / Excel，透過 Code Interpreter 自動統一欄位、計算扣除平台抽成與廣告費後的「真實淨利」，並標記出虧損的 SKU。',
      tags: ['Code Interpreter']
    },
    {
      group: 'data',
      title: 'GA4 轉換漏斗流失診斷師',
      pain: '看得懂流量下跌，但不知道消費者卡在哪一個結帳步驟。',
      knowledge: '網站結帳流程圖、歷史平均轉換率基準值（Benchmark）。',
      skill: '上傳 GA4 探索報表截圖或 CSV，自動計算「瀏覽商品 → 加入購物車 → 填寫資料 → 付款」各階層流失率，並依電商 UX 原則提出 3 個具體的頁面修改建議。',
      tags: ['截圖 / CSV']
    },
    {
      group: 'data',
      title: '會員 RFM 分群與喚醒策略生成',
      pain: '累積了幾萬筆會員名單，卻只會無差別群發 EDM，導致封鎖率飆升。',
      knowledge: '品牌會員制度說明、歷史檔期優惠券規則。',
      skill: '丟入去識別化的訂單紀錄（客戶 ID、最後購買日、購買頻率、總金額），自動跑完 RFM 模型分為 8 大類（如重要挽留客戶、瞌睡客戶），並為每一群寫好 LINE 推播與簡訊文案。',
      tags: ['RFM 模型']
    },
    {
      group: 'data',
      title: '滯銷品與安全庫存預警分析師',
      pain: '熱門商品常賣斷貨，冷門商品卻壓死大筆現金流。',
      knowledge: '各供應商交貨前置天數（Lead Time）、倉庫最小訂購量（MOQ）限制。',
      skill: '輸入近 30 天銷量與現有庫存表，自動算出「預計斷貨日」並生成採購建議單；同時挑出庫齡超過 90 天的滯銷品，配對熱銷品設計「加價購」或「盲盒清倉」組合。',
      tags: ['採購建議單']
    },
    {
      group: 'finance',
      title: '月結損益與現金流預估助手',
      pain: '月底才知道到底有沒有賺錢，現金缺口常常臨時才發現。',
      knowledge: '會計科目表、固定成本清單、供應商付款與平台撥款週期。',
      skill: '匯入當月營收、進貨與費用明細，自動整理成簡易損益表，並依撥款與付款週期推估未來 90 天現金流，提前標出可能資金吃緊的週次。',
      tags: ['損益表', '現金流']
    },
    {
      group: 'finance',
      title: '財務金流與發票自動核銷助手',
      pain: '綠界、藍新、LINE Pay 撥款明細與後台訂單金額對不攏（手續費尾差、跨月退貨）。',
      knowledge: '各家金流手續費率公式、會計科目代碼表。',
      skill: '同時上傳「金流撥款單」與「ERP 訂單明細」，自動逐筆勾稽，抓出未入帳、重複退款或手續費異常的訂單編號，匯出差異調節表給會計。',
      tags: ['差異調節表']
    },
    {
      group: 'finance',
      title: '帳單與收據自動整理歸檔',
      pain: '每月一堆電子發票、信用卡帳單和紙本收據，報帳時才在翻找，常常漏報或重複報。',
      knowledge: '公司報帳規範與費用類別、會計科目對照表。',
      skill: '拍照或上傳帳單、收據與信用卡明細，自動辨識日期、金額、店家與統編，歸類到費用科目，抓出重複或缺漏的單據，匯出可直接報帳的費用明細表。',
      tags: ['收據辨識', '報帳']
    },
    {
      group: 'finance',
      title: '投資標的研究與財報摘要分析師',
      pain: '想研究一檔股票或基金，要讀財報、法說會和新聞，資料太多不知道從哪裡看起。',
      knowledge: '個人關注清單、慣用的分析框架與指標（營收成長、毛利率、本益比等）。',
      skill: '上傳財報、法說會逐字稿或新聞，自動摘要關鍵財務指標與變化、整理多空觀點與風險，並產出同業比較表。僅作研究資料整理，不構成投資建議。',
      tags: ['財報摘要', '同業比較']
    },
    {
      group: 'ads',
      title: 'Meta / Google 廣告成效健檢與止損顧問',
      pain: '廣告投手每天看幾十個廣告組合，容易漏看 CPA 飆升的疲乏素材。',
      knowledge: '品牌過去一年表現最好的 Top 20 廣告數據、各品類目標 ROAS 底線。',
      skill: '貼入廣告後台數據，依 CPC、CTR、CVR 的交互關係診斷（CTR 高但 CVR 低＝落地頁與素材不符；CTR 低＝素材不吸睛），直接列出「建議立刻關閉」與「建議加碼預算」的廣告名單。',
      tags: ['Meta', 'Google Ads']
    },
    {
      group: 'ads',
      title: '高轉換痛點廣告素材（Ad Copy）裂變器',
      pain: '寫廣告文案靈感枯竭，不知道怎麼切入不同受眾的痛點。',
      knowledge: '品牌禁用字詞表（如醫療法規限制字眼）、過往高轉換文案範例庫。',
      skill: '輸入單一商品特色，套用 PAS 與 FAB 框架，針對 3 種受眾（如小資族、新手媽媽、送禮需求）一次裂變出 9 組 FB 長文、IG 短文與圖片壓字標題。',
      tags: ['PAS / FAB']
    },
    {
      group: 'ads',
      title: '高轉換一頁式銷售頁（Landing Page）架構師',
      pain: '美編做好漂亮的商品圖，但排在一起卻沒有說服力與購買衝動。',
      knowledge: '品牌視覺規範、高轉換銷售頁的黃金 8 屏結構（英雄區、痛點共鳴、原理解析、見證比較、FAQ、行動呼籲）。',
      skill: '輸入新品規格，用 Claude Artifacts 生成可互動預覽的網頁線框圖（Wireframe），附每一屏的指定文案與配圖構圖指示，設計師直接照著做。',
      tags: ['Claude Artifacts']
    },
    {
      group: 'ads',
      title: '短影音（Reels / TikTok）黃金前 3 秒腳本王',
      pain: '拍了商品介紹影片但完全沒流量，前 3 秒就被觀眾滑掉。',
      knowledge: '近期抖音 / IG 爆款開頭鉤子（Hook）清單、品牌人設語氣設定。',
      skill: '輸入要推廣的商品，自動產出含「畫面分鏡、口白台詞、音效提示、字卡重點」的 30 秒拍攝表格，並提供 5 種極具好奇心的黃金前 3 秒開頭供挑選。',
      tags: ['Reels', 'TikTok']
    },
    {
      group: 'ads',
      title: 'KOL 網紅合作成效評估與公關信生成器',
      pain: '找網紅業配不知道怎麼談價格，寄出的邀約信又常常石沉大海。',
      knowledge: '公司公關品寄送合約範本、網紅分潤計算公式。',
      skill: '貼入網紅 IG 近期貼文互動數據與粉絲數，先算出合理報價區間與預估帶貨量，再依對方近期貼文風格，寫一封極度客製化、不像罐頭訊息的邀約開發信。',
      tags: ['KOL', 'IG']
    },
    {
      group: 'product',
      title: '競品全方位分析報告生成器',
      pain: '老闆一句「去看看對手在做什麼」，就得花好幾天逛官網、翻社群、整理價格表，最後還是一堆零散截圖。',
      knowledge: '自家品牌定位、產品線與價格帶、主要競爭對手清單、分析框架（4P、SWOT）。',
      skill: '貼入競品官網、商品頁與社群貼文的連結或截圖，自動整理各家產品線、價格帶、主打賣點、促銷手法與社群經營方式，產出競品比較表與 SWOT 分析，並標出自家可切入的市場空缺與差異化建議。',
      tags: ['競品比較表', 'SWOT']
    },
    {
      group: 'product',
      title: '競品網站促銷與定價策略拆解師',
      pain: '看到競品在打折，不知道對方的滿額贈與組合價背後真正的折扣率是多少。',
      knowledge: '產業常見促銷套路庫、自家產品定價結構。',
      skill: '上傳競品活動頁的長截圖或活動規則文字，自動拆解對方的價格錨點策略（如用高價單品掩護組合包、滿額贈門檻如何拉高客單價 AOV），並為自家商城設計一套更有吸引力的反制促銷方案。',
      tags: ['定價策略', 'AOV']
    },
    {
      group: 'product',
      title: '競品萬則評論痛點挖掘機（VOC 分析）',
      pain: '想開發新品或改版，但不知道消費者對現有競品最不滿意什麼。',
      knowledge: '自家產品的規格表與核心優勢。',
      skill: '貼入蝦皮、Momo 或 Amazon 的競品 1–3 星負評與 5 星好評，自動聚類出「最常抱怨的 Top 5 缺陷」與「未被滿足的許願功能」，直接轉化為自家商品的研發方向與主打賣點。',
      tags: ['VOC 分析']
    },
    {
      group: 'product',
      title: 'SEO 語意關鍵字矩陣與部落格寫手',
      pain: '商城只靠買廣告才有流量，缺乏免費的自然搜尋長尾流量。',
      knowledge: '官網現有商品網址清單（Sitemap）、品牌專業知識庫。',
      skill: '輸入一個核心產品詞（如「葉黃素」），自動聯想比較型、痛點型、知識型搜尋意圖，寫出符合 Google E-E-A-T 標準的 2,000 字文章，並自然嵌入自家商品的購買錨點文字。',
      tags: ['E-E-A-T']
    },
    {
      group: 'product',
      title: '跨境電商多國語系在地化轉換器',
      pain: '用一般翻譯軟體翻出來的英文或日文商品頁充滿「機器味」，外國人看了不敢買。',
      knowledge: '目標市場（如日本樂天、美國 Amazon）熱門商品文案範例、當地文化禁忌與度量衡轉換表（公分轉英吋、台斤轉盎司）。',
      skill: '輸入台灣商品頁文案，不是直譯，而是轉換成符合當地文化、消費習慣與流行用語的道地銷售文案，並自動換算所有尺寸規格。',
      tags: ['日本樂天', 'Amazon']
    },
    {
      group: 'service',
      title: '電商客服機器人（LINE / 官網）',
      pain: '「什麼時候出貨？」「可以退換嗎？」同樣的問題每天回幾百次，下班後訊息沒人回就流失訂單。',
      knowledge: '商品規格與 FAQ、運費與退換貨政策、訂單查詢規則與轉真人客服條件。',
      skill: '把知識庫接上 LINE 官方帳號與官網聊天視窗，24 小時自動回覆常見問題、引導下單與查詢出貨狀態；遇到客訴、退款或情緒激動的訊息時，自動整理對話摘要轉交真人客服。',
      tags: ['LINE 官方帳號', '官網聊天']
    },
    {
      group: 'service',
      title: '奧客客訴安撫與「負評轉正」公關大師',
      pain: '客服面對情緒失控的買家或公開的惡意一星負評，不知道怎麼回才不會火上加油。',
      knowledge: '消保法 7 天鑑賞期規範、公司退換貨 SOP、補償折價券核發權限表。',
      skill: '貼入憤怒訊息或公開負評，先分析對方的「真實訴求」，再產出兩份文案：給買家的高同理心私訊與解決方案，以及公開評價區讓路人對品牌產生好感的專業回覆。',
      tags: ['客服', '公關']
    },
    {
      group: 'personal',
      title: '私人助理',
      pain: '日常雜事多，需要有人幫忙整理、提醒和草擬。',
      knowledge: '個人工作偏好、常用聯絡人。',
      skill: '交辦日常雜事，例如整理筆記、草擬訊息、查找資料並摘要重點。',
      tags: ['日常交辦']
    },
    {
      group: 'personal',
      title: '行事曆管理與每日行程助理',
      pain: '會議一個接一個，常常撞期、約時間來回喬半天，進會議室前才在找簡報。',
      knowledge: '個人作息與工作偏好、常用聯絡人與職稱、常開的會議類型與固定例會。',
      skill: '貼入今日與本週行事曆，自動排出專注時段與緩衝時間、提醒撞期並建議改期時段，草擬約會議的時間提案訊息，並為每場會議整理參與者背景與會前準備清單。',
      tags: ['行事曆', '約會議']
    },
    {
      group: 'personal',
      title: '待辦清單整理與優先排序',
      pain: '待辦散落在便利貼、LINE、Email 和會議紀錄，清單越寫越長，卻不知道該先做哪一件。',
      knowledge: '本季目標與 KPI、個人可用工時與常見任務耗時。',
      skill: '把零散待辦一次貼進來，自動合併重複事項、拆解大任務，依「重要／緊急」四象限與截止日排序並排進本週時間表，產出今日 Top 3 必做清單。',
      tags: ['四象限', '時間表']
    },
    {
      group: 'personal',
      title: '採購助理',
      pain: '要買的東西多，比價、比規格很花時間。',
      knowledge: '採購需求與預算、常用的購買管道。',
      skill: '輸入要買的品項與預算，整理各管道的價格與規格比較，列出建議選項。',
      tags: ['比價']
    },
    {
      group: 'personal',
      title: '旅遊行程規劃助理',
      pain: '規劃一趟旅行要查景點、交通、住宿和餐廳，資訊散在各個網站和社群，排到最後還是走回頭路。',
      knowledge: '個人旅遊偏好（步調、預算、飲食、住宿類型）、同行成員需求與過往旅遊紀錄。',
      skill: '輸入目的地、天數、預算與同行成員，自動規劃逐日行程與順路的交通動線，推薦符合預算的住宿與餐廳，並產出行前清單、預算表與可分享給旅伴的行程表。',
      tags: ['旅遊', '行程表']
    },
    {
      group: 'personal',
      title: '個人記帳與每月預算管理',
      pain: '每月薪水進來就不見了，不知道錢都花到哪裡，存錢目標一直達不到。',
      knowledge: '個人收入與固定支出、自訂消費分類與每月預算目標。',
      skill: '匯入信用卡與銀行明細，自動分類每筆消費、對照預算標出超支項目，產出每月收支報表與可執行的省錢建議。',
      tags: ['記帳', '預算']
    },
    {
      group: 'office',
      title: '會議逐字稿轉「行動追蹤表」生成師',
      pain: '開完 2 小時的會，兩萬字逐字稿沒人看，最後大家都忘記誰該負責什麼。',
      knowledge: '各部門成員名單與職責縮寫、標準會議紀錄格式範本。',
      skill: '丟入雜亂逐字稿，自動過濾閒聊，提煉出核心決議、懸而未決的問題，以及含「任務、負責人、Deadline」的待辦表格，可直接貼到 Notion 或 Jira。',
      tags: ['Notion', 'Jira']
    },
    {
      group: 'office',
      title: '老闆 / 高管專用「向上管理」週報提煉器',
      pain: '員工每週花 2 小時寫流水帳週報，老闆卻只想花 30 秒看結果與卡關處。',
      knowledge: '部門本季 OKR / KPI 目標清單、金字塔原理寫作規範。',
      skill: '隨手輸入這週的零碎事項與數據，自動重構為「結論先行」格式：本週核心戰果（綁定 KPI）、遭遇阻礙與解法、下週關鍵行動、需老闆拍板的決策。',
      tags: ['OKR / KPI']
    },
    {
      group: 'office',
      title: '商業提案簡報（Pitch Deck）邏輯與大綱生成師',
      pain: '面對空白的 PowerPoint 發呆，不知道 15 頁提案該怎麼鋪陳才有說服力。',
      knowledge: '麥肯錫 SCQA 簡報框架、公司過去成功的提案大綱範本。',
      skill: '輸入提案對象、預算與目標，自動規劃 10–15 頁逐頁架構，標出每頁的核心標題、論點與建議圖表，並可輸出 Markdown 匯入 Gamma 或 Canva 一鍵生成簡報。',
      tags: ['SCQA', 'Gamma / Canva']
    },
    {
      group: 'office',
      title: 'SOP 標準作業流程與新人培訓手冊生成器',
      pain: '流程都記在老鳥腦袋裡，新人進來沒人有空教，每次做錯又得重來。',
      knowledge: '公司內部系統名稱詞彙表、標準 SOP 文件排版格式。',
      skill: '老鳥邊操作邊口述一次流程（或丟入操作錄影字幕檔），自動整理成 Step-by-Step 作業指導書，加上常見錯誤防呆提醒，文末附 5 題新人驗收小測驗。',
      tags: ['語音輸入', '新人訓練']
    }
  ];

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const icon = (name) => {
    const node = el('i', `fi fi-rr-${name}`);
    node.setAttribute('aria-hidden', 'true');
    return node;
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animatedCounts = new WeakSet();
  const animateCount = (node) => {
    if (animatedCounts.has(node)) return;
    const finalText = node.textContent.trim();
    const match = finalText.match(/^(\d+)(.*)$/u);
    if (!match || reduceMotion) return;
    animatedCounts.add(node);
    const target = Number(match[1]);
    const suffix = match[2];
    const start = performance.now();
    const duration = 950;
    node.textContent = `0${suffix}`;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = progress === 1 ? finalText : `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const revealTargets = document.querySelectorAll('.section-intro, .booking-copy, .booking-card, .about-grid > *, .value-prop, .team-card, .planner-copy, .planner-form, .course-tabs-shell, .case-card');
  revealTargets.forEach((node) => node.setAttribute('data-reveal', ''));
  const staggerGridSelector = '.module-grid, .service-grid, .skill-grid, .course-grid, .case-grid, .about-grid, .team-grid';
  const revealObserver = !reduceMotion && 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        const countNode = entry.target.matches('[data-count]') ? entry.target : entry.target.querySelector('[data-count]');
        if (countNode) animateCount(countNode);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -48px 0px' })
    : null;
  let revealFallbackActive = !revealObserver;
  const revealAll = () => document.querySelectorAll('[data-reveal]').forEach((node) => node.classList.add('is-visible'));
  const observeReveal = (root = document) => {
    document.querySelectorAll(staggerGridSelector).forEach((gridRoot) => {
      gridRoot.querySelectorAll(':scope > *').forEach((child, index) => {
        child.setAttribute('data-reveal', '');
        child.style.setProperty('--reveal-delay', `${index * 60}ms`);
      });
    });
    const nodes = [];
    if (root instanceof Element && root.matches('[data-reveal]')) nodes.push(root);
    nodes.push(...root.querySelectorAll('[data-reveal]'));
    nodes.forEach((node) => {
      if (node.classList.contains('is-visible')) return;
      if (revealFallbackActive) {
        node.classList.add('is-visible');
        return;
      }
      if (revealObserver) revealObserver.observe(node);
      else node.classList.add('is-visible');
    });
  };
  observeReveal();

  const revealOnDomContentLoaded = () => {
    const nodes = [...document.querySelectorAll('[data-reveal]')];
    if (reduceMotion || !revealObserver) {
      revealFallbackActive = true;
      revealAll();
      return;
    }

    const aboveFold = nodes.filter((node) => node.getBoundingClientRect().top < window.innerHeight);
    requestAnimationFrame(() => aboveFold.forEach((node) => node.classList.add('is-visible')));
    window.setTimeout(() => {
      if (!document.querySelector('[data-reveal]:not(.is-visible)')) return;
      revealFallbackActive = true;
      revealAll();
    }, 2500);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealOnDomContentLoaded, { once: true });
  } else {
    revealOnDomContentLoaded();
  }
  document.addEventListener('focusin', (event) => {
    if (!(event.target instanceof Element)) return;
    let node = event.target.closest('[data-reveal]');
    while (node) {
      node.classList.add('is-visible');
      node = node.parentElement?.closest('[data-reveal]') ?? null;
    }
  });

  // Header surface and current section indication
  const header = document.querySelector('.site-header');
  const syncHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]:not(.btn)')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${active.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-22% 0px -64% 0px', threshold: [0, 0.1, 0.25, 0.5] });
    navLinks.forEach((link) => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) sectionObserver.observe(section);
    });
  }

  // ---------- AI 技能菜單 ----------
  const sectionsRoot = document.getElementById('skill-sections');
  const filterButtons = document.querySelectorAll('[data-filter]');

  // 卡片只顯示粗體標題，點擊後在對話框看完整配置
  const dialog = document.getElementById('skill-dialog');
  const groupTitle = Object.fromEntries(GROUPS.map((g) => [g.id, g.title]));

  const openSkill = (s, no) => {
    dialog.className = `skill-dialog sd-${s.group}`;
    document.getElementById('sd-no').textContent = no;
    document.getElementById('sd-group').textContent = groupTitle[s.group];
    document.getElementById('sd-title').textContent = s.title;
    document.getElementById('sd-tags').replaceChildren(...s.tags.map((t) => el('span', null, t)));
    document.getElementById('sd-pain').textContent = s.pain;
    document.getElementById('sd-knowledge').textContent = s.knowledge;
    document.getElementById('sd-skill').textContent = s.skill;
    dialog.showModal();
  };

  const renderCard = (s, no) => {
    const num = String(no).padStart(2, '0');
    const card = el('button', `skill-card skill-${s.group}`);
    card.type = 'button';
    card.setAttribute('aria-haspopup', 'dialog');
    card.append(el('span', 'skill-no', num), el('span', 'skill-title', s.title));
    const arrow = el('span', 'skill-arrow');
    arrow.append(icon('arrow-small-right'));
    card.append(arrow);
    card.addEventListener('click', () => openSkill(s, num));
    return card;
  };

  document.getElementById('sd-close').addEventListener('click', () => dialog.close());
  document.getElementById('sd-cta').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  // 32 個技能放在同一個等寬等高的網格，類別用底色與外框區分
  const ordered = GROUPS.flatMap((g) => SKILLS.filter((s) => s.group === g.id));
  const grid = el('div', 'skill-grid');
  const cards = ordered.map((s, i) => {
    const card = renderCard(s, i + 1);
    card.dataset.group = s.group;
    card.setAttribute('data-reveal', '');
    card.setAttribute('aria-label', `${String(i + 1).padStart(2, '0')} ${s.title}（${groupTitle[s.group]}）`);
    grid.append(card);
    return card;
  });
  sectionsRoot.append(grid);
  observeReveal(grid);

  const applyFilter = (group) => {
    cards.forEach((c) => { c.hidden = group !== 'all' && c.dataset.group !== group; });
    filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === group)));
  };

  filterButtons.forEach((b) => b.addEventListener('click', () => applyFilter(b.dataset.filter)));
  document.querySelectorAll('[data-jump-filter]').forEach((a) => {
    a.addEventListener('click', () => applyFilter(a.dataset.jumpFilter));
  });
  applyFilter('all');

  // ---------- 行動版選單 ----------
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') && nav.classList.contains('is-open')) navToggle.click();
  });

  // ---------- 預約試算 ----------
  const count = (ids) => SKILLS.filter((s) => ids.includes(s.group)).length;
  const PLANS = [
    { id: 'ecom', label: '電商技能包', sub: '數據・財務・廣告・客服', ref: `${count(['data', 'finance', 'ads', 'product', 'service'])} 個電商技能`, icon: 'shopping-cart' },
    { id: 'office', label: '辦公室技能包', sub: '會議・週報・簡報・SOP', ref: `${count(['office', 'personal'])} 個辦公室與個人助理技能`, icon: 'briefcase' },
    { id: 'edu', label: '教育訓練', sub: '工作坊・實戰營', ref: '帶團隊自己做出技能', icon: 'graduation-cap' }
  ];
  const MODES = [
    { id: 'onsite', label: '到府實體', icon: 'building' },
    { id: 'online', label: '線上直播', icon: 'play-alt' }
  ];
  const SIZE = { min: 1, max: 500, step: 1 };
  const booking = { plan: 'ecom', mode: 'onsite', size: 12 };

  const planGroup = document.getElementById('service-group');
  const modeGroup = document.getElementById('mode-group');
  const sizeValue = document.getElementById('size-value');
  const sizeDec = document.getElementById('size-dec');
  const sizeInc = document.getElementById('size-inc');

  PLANS.forEach((p) => {
    const btn = el('button', 'tile');
    btn.type = 'button';
    btn.dataset.id = p.id;
    const chip = el('span', 'icon-chip tile-icon');
    chip.append(icon(p.icon));
    const copy = el('span', 'tile-copy');
    copy.append(el('strong', null, p.label), el('span', null, p.sub));
    btn.append(chip, copy);
    btn.addEventListener('click', () => { booking.plan = p.id; renderBooking(); });
    planGroup.append(btn);
  });
  MODES.forEach((m) => {
    const btn = el('button', 'pill');
    btn.type = 'button';
    btn.dataset.id = m.id;
    btn.append(icon(m.icon), el('span', null, m.label));
    btn.addEventListener('click', () => { booking.mode = m.id; renderBooking(); });
    modeGroup.append(btn);
  });
  const clampSize = (n) => Math.min(SIZE.max, Math.max(SIZE.min, Math.round(n)));
  sizeDec.addEventListener('click', () => { booking.size = clampSize(booking.size - SIZE.step); renderBooking(); });
  sizeInc.addEventListener('click', () => { booking.size = clampSize(booking.size + SIZE.step); renderBooking(); });
  // 可直接輸入人數：輸入中即時更新摘要，離開欄位時校正到 1–500
  const readSize = () => {
    const n = Number(sizeValue.value);
    if (sizeValue.value !== '' && Number.isFinite(n)) booking.size = clampSize(n);
  };
  sizeValue.addEventListener('input', () => { readSize(); renderBooking(false); });
  sizeValue.addEventListener('change', () => { readSize(); renderBooking(); });

  function renderBooking(syncInput = true) {
    const p = PLANS.find((x) => x.id === booking.plan);
    const m = MODES.find((x) => x.id === booking.mode);
    planGroup.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === booking.plan)));
    modeGroup.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === booking.mode)));
    if (syncInput) sizeValue.value = booking.size;
    sizeDec.disabled = booking.size <= SIZE.min;
    sizeInc.disabled = booking.size >= SIZE.max;
    document.getElementById('sum-service').textContent = p.label;
    document.getElementById('sum-team').textContent = `${booking.size} 人・${m.label}`;
    document.getElementById('sum-ref').textContent = p.ref;
  }
  renderBooking();

  // 預約按鈕把選擇帶進聯絡表單，並在詳細需求先填好試算內容
  const PLAN_TO_SERVICE = { ecom: '全方位營運自動化', office: '賦能與智慧協作', edu: '課程培訓與顧問' };
  document.getElementById('booking-cta').addEventListener('click', () => {
    const p = PLANS.find((x) => x.id === booking.plan);
    const m = MODES.find((x) => x.id === booking.mode);
    document.getElementById('cf-service').value = PLAN_TO_SERVICE[booking.plan];
    const msg = document.getElementById('cf-message');
    if (!msg.value.trim()) msg.value = `想了解「${p.label}」，團隊 ${booking.size} 人，${m.label}。`;
  });

  // ---------- 課程（搬自舊網站：線上課程＋企業內訓・上班族）----------
  const COURSES = {
    online: [
      ['AI工具課程', '自動化客服機器人', '學習如何建立智能客服機器人系統，運用 AI 技術自動處理客戶諮詢，提升服務效率與客戶滿意度。從對話設計到系統整合的完整實戰教學。'],
      ['自動化工具課程', '流程自動化服務－發佈行銷文 / 客製化回信', '學習如何運用自動化工具提升行銷效率。從自動發佈行銷內容到智能客製化回信，掌握完整的流程自動化解決方案，大幅節省人力與時間成本。'],
      ['AI工具課程', '建立企業內部的知識庫系統', '學習如何建立完整的企業知識庫管理系統，整合內部文件、經驗知識與最佳實踐。從知識分類、權限管理到智慧搜尋，打造高效的企業知識管理平台。'],
      ['綜合實戰課程', 'AI 工具整合實戰營', '綜合運用多種 AI 工具打造完整的自動化解決方案。學習如何將 ChatGPT 等工具串聯，建立企業級自動化系統。'],
      ['策略規劃課程', '企業 AI 轉型策略規劃', '為企業主和管理層設計的策略課程。學習如何制定 AI 導入計畫、評估投資報酬率、建立 AI 團隊，實現成功的數位轉型。']
    ],
    office: [
      ['上班族', '用 Google Gemini 與 AI Studio 提升文書效率', '學習使用 Google Gemini 和 AI Studio 來提升日常文書工作效率'],
      ['上班族', '快速製作 AI 簡報：使用 NotebookLM 簡報及圖表資訊', '運用 NotebookLM 快速製作專業簡報與資訊圖表'],
      ['上班族', '企業知識管理與 AI 實戰工具應用製作 SOP 流程', '建立企業專屬 AI 知識庫，用 Google AI Studio 與 Notion 製作 SOP'],
      ['上班族', 'Vibe Coding：為一般人及 PM 量身定制的 AI 編程工具', '非工程師也能學會的 AI 編程工具，提升工作自動化能力'],
      ['上班族', 'AI 輔助專案管理：用 Google AI Studio 與 Vibe Coding', '結合 AI 工具提升專案管理效率與團隊協作'],
      ['上班族', '用 AI 打造高效決策儀表板：實現即時數據分析', '建立數據視覺化儀表板，支援即時決策分析'],
      ['上班族', '用 Canva 與 AI 設計強化品牌形象', '運用 Canva 和 AI 設計工具打造專業品牌視覺'],
      ['上班族', 'AI 影音行銷：短影音腳本、配音與剪輯', '從腳本撰寫到剪輯配音，全方位 AI 影音製作技巧'],
      ['上班族', '電商推薦系統：AI 導購與個性化推薦實作', '建立 AI 驅動的電商推薦系統，提升轉換率'],
      ['上班族', '掌握 LINE 官方帳號與 AI 行銷自動化', '運用 LINE 官方帳號結合 AI 實現行銷自動化']
    ]
  };
  const COURSE_LABEL = { online: '課程', office: '企業內訓・上班族' };
  const courseGrid = document.getElementById('course-grid');
  const courseCount = document.getElementById('course-count');
  const courseTabs = document.querySelectorAll('[data-course]');
  const courseTabsRoot = document.querySelector('.course-tabs');
  const courseIndicator = document.querySelector('.course-indicator');
  let activeCourse = null;
  let courseSwapTimer = 0;
  const syncCourseIndicator = (key) => {
    if (!courseTabsRoot || !courseIndicator) return;
    courseTabsRoot.dataset.activeCourse = key;
  };
  const renderCourses = (key, staggerCards = true) => {
    courseGrid.replaceChildren(...COURSES[key].map(([tag, title, desc], i) => {
      const card = el('article', 'course-card');
      card.setAttribute('data-reveal', '');
      if (!staggerCards) card.classList.add('is-visible');
      const top = el('div', 'course-top');
      const number = el('span', 'course-number');
      const chip = el('span', 'icon-chip course-icon');
      chip.append(icon('book-open-cover'));
      number.append(el('span', 'course-no', String(i + 1).padStart(2, '0')), chip);
      top.append(number, el('span', 'course-tag', `#${tag}`));
      const courseTitle = el('h3');
      courseTitle.textContent = title;
      card.append(top, courseTitle, el('p', null, desc));
      return card;
    }));
    observeReveal(courseGrid);
  };
  const showCourses = (key) => {
    const shouldAnimate = activeCourse !== null && activeCourse !== key && !reduceMotion;
    window.clearTimeout(courseSwapTimer);
    if (shouldAnimate) {
      courseGrid.classList.add('is-switching');
      courseSwapTimer = window.setTimeout(() => {
        renderCourses(key, false);
        courseGrid.classList.remove('is-switching');
      }, 160);
    } else {
      renderCourses(key);
      courseGrid.classList.remove('is-switching');
    }
    activeCourse = key;
    courseCount.textContent = `${COURSE_LABEL[key]}：共 ${COURSES[key].length} 門課程`;
    courseTabs.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.course === key)));
    requestAnimationFrame(() => syncCourseIndicator(key));
  };
  courseTabs.forEach((b) => b.addEventListener('click', () => showCourses(b.dataset.course)));
  window.addEventListener('resize', () => { if (activeCourse) syncCourseIndicator(activeCourse); }, { passive: true });
  showCourses('online');

  // Promote each case result while keeping its full sentence and label intact.
  document.querySelectorAll('.case-card').forEach((card) => {
    const result = card.querySelector('.case-result');
    const resultLabel = card.querySelector('dt:last-of-type');
    const percent = result?.textContent.match(/\d+%/u)?.[0];
    if (!result || !resultLabel || !percent) return;
    const outcome = el('div', 'case-outcome');
    const casePercent = el('span', 'case-percent');
    casePercent.append(icon('chart-line-up'), document.createTextNode(` ${percent}`));
    outcome.append(el('span', 'case-result-label', resultLabel.textContent), casePercent);
    const sentence = el('p', 'case-outcome-copy', result.textContent);
    outcome.append(sentence);
    resultLabel.remove();
    result.remove();
    card.insertBefore(outcome, card.firstElementChild);
  });

  // ---------- 聯絡表單：驗證後開啟郵件程式寄到創辦人信箱（網站本身沒有後端）----------
  const CONTACT_EMAIL = 'allisonliu33@gmail.com';
  const form = document.getElementById('contact-form');
  const status = document.getElementById('cf-status');
  const required = [
    { input: document.getElementById('cf-name'), error: document.getElementById('cf-name-error'), msg: '請輸入您的姓名' },
    { input: document.getElementById('cf-email'), error: document.getElementById('cf-email-error'), msg: '請輸入有效的電子郵件，例如 you@company.com' }
  ];
  const fieldValid = (f) => f.input.value.trim() !== '' && f.input.checkValidity();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstBad = null;
    required.forEach((f) => {
      const ok = fieldValid(f);
      if (ok) f.input.removeAttribute('aria-invalid');
      else f.input.setAttribute('aria-invalid', 'true');
      f.error.textContent = ok ? '' : f.msg;
      if (!ok && !firstBad) firstBad = f.input;
    });
    if (firstBad) { firstBad.focus(); return; }

    const data = new FormData(form);
    const lines = [
      ['姓名', data.get('name')], ['電子郵件', data.get('email')], ['聯絡電話', data.get('phone')],
      ['公司名稱', data.get('company')], ['職稱', data.get('title')], ['有興趣的服務', data.get('service')],
      ['詳細需求', data.get('message')]
    ].filter(([, v]) => v && String(v).trim()).map(([k, v]) => `${k}：${String(v).trim()}`);
    const subject = `免費諮詢預約｜${data.get('name')}${data.get('company') ? `（${data.get('company')}）` : ''}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    status.textContent = '已開啟您的郵件程式，確認內容後按下寄出即可。若沒有開啟，請直接來信或來電。';
    status.classList.add('is-success');
  });
  required.forEach((f) => f.input.addEventListener('input', () => {
    if (f.input.getAttribute('aria-invalid') === 'true' && fieldValid(f)) {
      f.input.removeAttribute('aria-invalid');
      f.error.textContent = '';
    }
  }));

  document.getElementById('year').textContent = new Date().getFullYear();
})();
