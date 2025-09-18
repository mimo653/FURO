// === 【完成版】おすすめ提案機能付き JavaScript ===

document.addEventListener('DOMContentLoaded', function() {

    // --------------------------------------------------
    // ◆ BGM選択機能のコード ◆
    // --------------------------------------------------
    const bgmList ={
        yuttari: ['ジブリジャズ', 'city pop', 'カフェ BGM','ゆったりプレイリスト','ヒーリングミュージック'],
        genki: ['元気が出る 曲 プレイリスト', 'ロックフェス 定番曲', 'K-POP ヒットソング', 'J-POPヒットソング', '洋楽ヒットソング', 'フェス 洋楽'],
        waraitai: ['オードリー ラジオ', 'サンドウィッチマン コント', 'ゲーム実況 爆笑','ジャルジャル コント', '水曜どうでしょう', '芸人 漫才'],
        tsukare: ['癒やし BGM', '焚き火 ASMR', 'ヒーリングミュージック', 'ちるいプレイリスト', '自律神経に優しい音楽', 'ジブリ ジャズ'],
        natsukashi: ['2000年代 J-POP ヒットソング', '90年代 アニソンメドレー', 'ボカロ 神曲', '懐かしのアニソンメドレー', '懐かしのCMソング', '2000年代 K-POPヒットソング', '名曲クラシック']
    };

    const moodButtons = document.querySelectorAll('.mood-button');
    const decideButton = document.getElementById('fortune-btn');
    const suggestionDisplay = document.getElementById('suggestion-display'); // 新しく作った表示エリア
    const rerollButton = document.getElementById('reroll-btn'); // 「選びなおす」ボタンを取得！
    
    // デバッグ用：rerollButtonが正しく取得されているか確認
    console.log('rerollButton:', rerollButton);
    console.log('rerollButton element:', document.getElementById('reroll-btn'));
    
    // 初期状態で「選びなおす」ボタンが隠れているか確認
    const initialRerollBtn = document.getElementById('reroll-btn');
    if (initialRerollBtn) {
        console.log('初期状態のreroll-btn:', initialRerollBtn);
        console.log('初期状態のclassList:', initialRerollBtn.classList.toString());
        console.log('初期状態のstyle.display:', initialRerollBtn.style.display);
    }

    let selectedMood = null;
    let currentSuggestion = null;

    // 気分ボタンがクリックされたときの処理
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mood = button.dataset.mood;
            if (button.classList.contains('selected')) {
                button.classList.remove('selected');
                selectedMood = null;
            } else {
                moodButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                selectedMood = mood;
            }
            
            // 気分を選び直したら表示をリセット
            resetSuggestionDisplay();
        });
    });

    // 「BGMを決める」ボタンがクリックされたときの処理
    if (decideButton) {
        decideButton.addEventListener('click', () => {
            if (selectedMood) {
                // おすすめを提案する関数を呼び出す
                proposeSuggestion(selectedMood);
            } else {
                alert('まずは今日の気分を選んでな！');
            }
        });
    }
    
    // 「選びなおす」ボタンがクリックされたときの処理
    const rerollBtn = document.getElementById('reroll-btn');
    if (rerollBtn) {
        rerollBtn.addEventListener('click', () => {
            if (selectedMood) {
                proposeSuggestion(selectedMood); // もう一回おすすめを提案
            }
        });
        console.log('選びなおすボタンのイベントリスナーを設定しました');
    } else {
        console.error('選びなおすボタンが見つからないため、イベントリスナーを設定できません');
    }

    // おすすめタイトル表示エリアがクリックされたときの処理
    if (suggestionDisplay) {
        suggestionDisplay.addEventListener('click', () => {
            if(currentSuggestion) {
                // YouTube検索を開く
                openYoutubeSearch(currentSuggestion);
            }
        });
    }

    // おすすめを提案する関数
    function proposeSuggestion(mood) {
        const keywordList = bgmList[mood];
        if (!keywordList) return;

        const randomIndex = Math.floor(Math.random() * keywordList.length);
        currentSuggestion = keywordList[randomIndex]; // 今のおすすめを覚えておく

        // おすすめタイトルを表示
        suggestionDisplay.textContent = `「${currentSuggestion}」はどうや？`;
        suggestionDisplay.classList.remove('hidden');
        
        // 「BGMを決める」ボタンを非表示にする
        if (decideButton) {
            decideButton.classList.add('hidden');
        }
        
        // 「選びなおす」ボタンのコンテナを表示
        const rerollContainer = document.querySelector('.reroll-container');
        if (rerollContainer) {
            rerollContainer.classList.remove('hidden');
            console.log('選びなおすボタンを表示しました');
        } else {
            console.error('reroll-container要素が見つかりません');
        }
    }

    // おすすめ表示をリセットする関数
    function resetSuggestionDisplay() {
        // おすすめ表示エリアを非表示
        if (suggestionDisplay) {
            suggestionDisplay.classList.add('hidden');
        }
        
        // 選びなおすボタンのコンテナを非表示
        const rerollContainer = document.querySelector('.reroll-container');
        if (rerollContainer) {
            rerollContainer.classList.add('hidden');
        }
        
        // 「BGMを決める」ボタンを再表示
        if (decideButton) {
            decideButton.classList.remove('hidden');
        }
        
        // 現在のおすすめをクリア
        currentSuggestion = null;
    }

    // YouTube検索を開く関数
    function openYoutubeSearch(keyword) {
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`;
        window.open(searchUrl, '_blank');
    }

    // --------------------------------------------------
    // ◆ カレンダー機能のコード ◆
    // --------------------------------------------------
    const calendarElement = document.getElementById('calendar');
    const completeButton = document.getElementById('complete-btn');
    
    const today = new Date(2025, 8, 1);
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();

    // 入浴記録の管理
    const BATH_RECORDS_KEY = 'bathRecords';
    
    // localStorageから入浴記録を読み込む
    function loadBathRecords() {
        const records = localStorage.getItem(BATH_RECORDS_KEY);
        return records ? JSON.parse(records) : {};
    }
    
    // localStorageに入浴記録を保存する
    function saveBathRecords(records) {
        localStorage.setItem(BATH_RECORDS_KEY, JSON.stringify(records));
    }
    
    // 日付のキーを生成する（例: "2025-09-15"）
    function getDateKey(year, month, day) {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
    
    // 入浴記録を追加・削除する
    function toggleBathRecord(year, month, day) {
        const records = loadBathRecords();
        const dateKey = getDateKey(year, month, day);
        
        if (records[dateKey]) {
            delete records[dateKey];
        } else {
            records[dateKey] = true;
        }
        
        saveBathRecords(records);
        return records[dateKey] || false; // 記録が追加されたかどうかを返す
    }
    
    // 指定した日付に記録があるかチェックする
    function hasBathRecord(year, month, day) {
        const records = loadBathRecords();
        const dateKey = getDateKey(year, month, day);
        return records[dateKey] || false;
    }

    function generateCalendar(year, month) {
        const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
        const days = ['日', '月', '火', '水', '木', '金', '土'];
        let firstDay = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let calendarHtml = `<div class="calendar-header"><button id="prev-month">‹</button><div class="month-year">${year}年 ${monthNames[month]}</div><button id="next-month">›</button></div><div class="calendar-grid">`;
        days.forEach(day => { calendarHtml += `<div class="day-name">${day}</div>`; });
        for (let i = 0; i < firstDay; i++) { calendarHtml += `<div></div>`; }
        for (let day = 1; day <= daysInMonth; day++) {
            let isToday = (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) ? 'today' : '';
            let isCompleted = hasBathRecord(year, month, day) ? 'completed' : '';
            calendarHtml += `<div class="day ${isToday} ${isCompleted}" data-day="${day}" data-year="${year}" data-month="${month}">${day}</div>`;
        }
        calendarHtml += `</div>`;
        calendarElement.innerHTML = calendarHtml;
        
        // 月送りボタンのイベントリスナー
        document.getElementById('prev-month').addEventListener('click', () => { 
            currentMonth--; 
            if (currentMonth < 0) { 
                currentMonth = 11; 
                currentYear--; 
            } 
            generateCalendar(currentYear, currentMonth); 
        });
        document.getElementById('next-month').addEventListener('click', () => { 
            currentMonth++; 
            if (currentMonth > 11) { 
                currentMonth = 0; 
                currentYear++; 
            } 
            generateCalendar(currentYear, currentMonth); 
        });
        
        // 日付セルのクリックイベントリスナー（選択機能）
        const dayElements = calendarElement.querySelectorAll('.day');
        dayElements.forEach(dayElement => {
            dayElement.addEventListener('click', () => {
                // 現在選択されている日付を取得
                const currentlySelected = calendarElement.querySelector('.day.selected-date');
                
                // 同じ日付をクリックした場合は選択を解除
                if (dayElement === currentlySelected) {
                    dayElement.classList.remove('selected-date');
                    updateCompleteButtonText(null);
                    return;
                }
                
                // 前の選択を解除
                if (currentlySelected) {
                    currentlySelected.classList.remove('selected-date');
                }
                
                // 新しい日付を選択
                dayElement.classList.add('selected-date');
                
                // 選択された日付の情報を取得
                const day = parseInt(dayElement.dataset.day);
                const year = parseInt(dayElement.dataset.year);
                const month = parseInt(dayElement.dataset.month);
                
                // ボタンのテキストを更新
                updateCompleteButtonText({ year, month, day });
            });
        });
    }
    
    // コインエフェクトの管理
    function createCoinEffect() {
        const coinCount = 8; // コインの数
        const container = document.body;
        
        for (let i = 0; i < coinCount; i++) {
            const coin = document.createElement('div');
            coin.className = 'coin-effect';
            
            // ランダムな開始位置（画面上部）
            const startX = Math.random() * (window.innerWidth - 20);
            const startY = -30;
            
            coin.style.left = startX + 'px';
            coin.style.top = startY + 'px';
            
            // コイン画像を使用するため、色の設定は不要
            
            container.appendChild(coin);
            
            // アニメーション終了後にコインを削除
            setTimeout(() => {
                if (coin.parentNode) {
                    coin.parentNode.removeChild(coin);
                }
            }, 3000);
        }
        
        // コインの音を再生
        playCoinSound();
    }
    
    // コインの音を再生する関数
    function playCoinSound() {
        try {
            const audio = new Audio('coin.mp3');
            audio.volume = 0.3; // 音量を調整
            audio.play().catch(e => {
                console.log('コインの音が再生できませんでした:', e);
            });
        } catch (e) {
            console.log('コインの音ファイルが見つかりません:', e);
        }
    }

    // ボタンのテキストを更新する関数
    function updateCompleteButtonText(selectedDate) {
        if (!completeButton) return;
        
        if (!selectedDate) {
            // 選択されていない場合はデフォルトテキスト
            completeButton.textContent = '入浴完了！';
            return;
        }
        
        const { year, month, day } = selectedDate;
        const hasRecord = hasBathRecord(year, month, day);
        
        if (hasRecord) {
            completeButton.textContent = '入浴を取り消す';
        } else {
            completeButton.textContent = '入浴完了！';
        }
    }
    
    // 「入浴完了！」ボタンのイベントリスナー
    if (completeButton) {
        completeButton.addEventListener('click', () => {
            // 現在選択されている日付を取得
            const selectedDay = calendarElement.querySelector('.day.selected-date');
            
            if (!selectedDay) {
                alert('まずカレンダーから日付を選んでな！');
                return;
            }
            
            const day = parseInt(selectedDay.dataset.day);
            const year = parseInt(selectedDay.dataset.year);
            const month = parseInt(selectedDay.dataset.month);
            
            // 記録をトグル
            const isRecorded = toggleBathRecord(year, month, day);
            
            // カレンダーを再生成して表示を更新
            generateCalendar(currentYear, currentMonth);
            
            // 選択状態を解除
            selectedDay.classList.remove('selected-date');
            updateCompleteButtonText(null);
            
            // 記録が追加された場合のみコインエフェクトを実行
            if (isRecorded) {
                createCoinEffect();
                alert('入浴記録を追加したで！お疲れ様！');
            } else {
                alert('入浴記録を取り消したで！');
            }
        });
    }
    
    generateCalendar(currentYear, currentMonth);

});