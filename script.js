// === 【完�E版】おすすめ提案機�E付き JavaScript ===

document.addEventListener('DOMContentLoaded', function() {

    // --------------------------------------------------
    // ◁EBGM選択機�EのコーチE◁E    // --------------------------------------------------
    const bgmList ={
        yuttari: ['ジブリジャズ', 'city pop', 'カフェ BGM','めE��たりプレイリスチE,'ヒ�EリングミュージチE��'],
        genki: ['允E��が出めE曲 プレイリスチE, 'ロチE��フェス 定番曲', 'K-POP ヒットソング', 'J-POPヒットソング', '洋楽ヒットソング', 'フェス 洋楽'],
        waraitai: ['オードリー ラジオ', 'サンドウィチE��マン コンチE, 'ゲーム実況E爁E��E,'ジャルジャル コンチE, '水曜どぁE��しょぁE, '芸人 漫扁E],
        tsukare: ['癒やぁEBGM', '焚き火 ASMR', 'ヒ�EリングミュージチE��', 'ちるいプレイリスチE, '自律神経に優しい音楽', 'ジブリ ジャズ'],
        natsukashi: ['2000年代 J-POP ヒットソング', '90年代 アニソンメドレー', 'ボカロ 神曲', '懐かし�Eアニソンメドレー', '懐かし�ECMソング', '2000年代 K-POPヒットソング', '名曲クラシチE��']
    };

    const moodButtons = document.querySelectorAll('.mood-button');
    const decideButton = document.getElementById('fortune-btn');
    const suggestionDisplay = document.getElementById('suggestion-display'); // 新しく作った表示エリア
    const rerollButton = document.getElementById('reroll-btn'); // 「選びなおす」�Eタンを取得！E    
    // チE��チE��用�E�rerollButtonが正しく取得されてぁE��か確誁E    console.log('rerollButton:', rerollButton);
    console.log('rerollButton element:', document.getElementById('reroll-btn'));
    
    // 初期状態で「選びなおす」�Eタンが隠れてぁE��か確誁E    const initialRerollBtn = document.getElementById('reroll-btn');
    if (initialRerollBtn) {
        console.log('初期状態�Ereroll-btn:', initialRerollBtn);
        console.log('初期状態�EclassList:', initialRerollBtn.classList.toString());
        console.log('初期状態�Estyle.display:', initialRerollBtn.style.display);
    }

    let selectedMood = null;
    let currentSuggestion = null;

    // 気�EボタンがクリチE��されたとき�E処琁E    moodButtons.forEach(button => {
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
            
            // 気�Eを選び直したら表示をリセチE��
            resetSuggestionDisplay();
        });
    });

    // 「BGMを決める」�EタンがクリチE��されたとき�E処琁E    if (decideButton) {
        decideButton.addEventListener('click', () => {
            if (selectedMood) {
                // おすすめを提案する関数を呼び出ぁE                proposeSuggestion(selectedMood);
            } else {
                alert('まず�E今日の気�Eを選んでな�E�E);
            }
        });
    }
    
    // 「選びなおす」�EタンがクリチE��されたとき�E処琁E    const rerollBtn = document.getElementById('reroll-btn');
    if (rerollBtn) {
        rerollBtn.addEventListener('click', () => {
            if (selectedMood) {
                proposeSuggestion(selectedMood); // もう一回おすすめを提桁E            }
        });
        console.log('選びなおすボタンのイベントリスナ�Eを設定しました');
    } else {
        console.error('選びなおすボタンが見つからなぁE��め、イベントリスナ�Eを設定できません');
    }

    // おすすめタイトル表示エリアがクリチE��されたとき�E処琁E    if (suggestionDisplay) {
        suggestionDisplay.addEventListener('click', () => {
            if(currentSuggestion) {
                // YouTube検索を開ぁE                openYoutubeSearch(currentSuggestion);
            }
        });
    }

    // おすすめを提案する関数
    function proposeSuggestion(mood) {
        const keywordList = bgmList[mood];
        if (!keywordList) return;

        const randomIndex = Math.floor(Math.random() * keywordList.length);
        currentSuggestion = keywordList[randomIndex]; // 今�Eおすすめを覚えておく

        // おすすめタイトルを表示
        suggestionDisplay.textContent = `、E{currentSuggestion}」�EどぁE���E�`;
        suggestionDisplay.classList.remove('hidden');
        
        // 「BGMを決める」�Eタンを非表示にする
        if (decideButton) {
            decideButton.classList.add('hidden');
        }
        
        // 「選びなおす」�EタンのコンチE��を表示
        const rerollContainer = document.querySelector('.reroll-container');
        if (rerollContainer) {
            rerollContainer.classList.remove('hidden');
            console.log('選びなおすボタンを表示しました');
        } else {
            console.error('reroll-container要素が見つかりません');
        }
    }

    // おすすめ表示をリセチE��する関数
    function resetSuggestionDisplay() {
        // おすすめ表示エリアを非表示
        if (suggestionDisplay) {
            suggestionDisplay.classList.add('hidden');
        }
        
        // 選びなおすボタンのコンチE��を非表示
        const rerollContainer = document.querySelector('.reroll-container');
        if (rerollContainer) {
            rerollContainer.classList.add('hidden');
        }
        
        // 「BGMを決める」�Eタンを�E表示
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
    // ◁Eカレンダー機�EのコーチE◁E    // --------------------------------------------------
    const calendarElement = document.getElementById('calendar');
    const completeButton = document.getElementById('complete-btn');
    
    const today = new Date(2025, 8, 1);
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();

    // 入浴記録の管琁E    const BATH_RECORDS_KEY = 'bathRecords';
    
    // localStorageから入浴記録を読み込む
    function loadBathRecords() {
        const records = localStorage.getItem(BATH_RECORDS_KEY);
        return records ? JSON.parse(records) : {};
    }
    
    // localStorageに入浴記録を保存すめE    function saveBathRecords(records) {
        localStorage.setItem(BATH_RECORDS_KEY, JSON.stringify(records));
    }
    
    // 日付�Eキーを生成する（侁E "2025-09-15"�E�E    function getDateKey(year, month, day) {
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
        return records[dateKey] || false; // 記録が追加されたかどぁE��を返す
    }
    
    // 持E��した日付に記録があるかチェチE��する
    function hasBathRecord(year, month, day) {
        const records = loadBathRecords();
        const dateKey = getDateKey(year, month, day);
        return records[dateKey] || false;
    }

    function generateCalendar(year, month) {
        const monthNames = ["1朁E, "2朁E, "3朁E, "4朁E, "5朁E, "6朁E, "7朁E, "8朁E, "9朁E, "10朁E, "11朁E, "12朁E];
        const days = ['日', '朁E, '火', '水', '木', '釁E, '圁E];
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
        
        // 月送りボタンのイベントリスナ�E
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
        
        // 日付セルのクリチE��イベントリスナ�E�E�選択機�E�E�E        const dayElements = calendarElement.querySelectorAll('.day');
        dayElements.forEach(dayElement => {
            dayElement.addEventListener('click', () => {
                // 現在選択されてぁE��日付を取征E                const currentlySelected = calendarElement.querySelector('.day.selected-date');
                
                // 同じ日付をクリチE��した場合�E選択を解除
                if (dayElement === currentlySelected) {
                    dayElement.classList.remove('selected-date');
                    updateCompleteButtonText(null);
                    return;
                }
                
                // 前�E選択を解除
                if (currentlySelected) {
                    currentlySelected.classList.remove('selected-date');
                }
                
                // 新しい日付を選抁E                dayElement.classList.add('selected-date');
                
                // 選択された日付�E惁E��を取征E                const day = parseInt(dayElement.dataset.day);
                const year = parseInt(dayElement.dataset.year);
                const month = parseInt(dayElement.dataset.month);
                
                // ボタンのチE��ストを更新
                updateCompleteButtonText({ year, month, day });
            });
        });
    }
    
    // コインエフェクト�E管琁E    function createCoinEffect() {
        const coinCount = 8; // コインの数
        const container = document.body;
        
        for (let i = 0; i < coinCount; i++) {
            const coin = document.createElement('div');
            coin.className = 'coin-effect';
            
            // ランダムな開始位置�E�画面上部�E�E            const startX = Math.random() * (window.innerWidth - 20);
            const startY = -30;
            
            coin.style.left = startX + 'px';
            coin.style.top = startY + 'px';
            
            // コイン画像を使用するため、色の設定�E不要E            
            container.appendChild(coin);
            
            // アニメーション終亁E��にコインを削除
            setTimeout(() => {
                if (coin.parentNode) {
                    coin.parentNode.removeChild(coin);
                }
            }, 3000);
        }
        
        // コインの音を�E甁E        playCoinSound();
    }
    
    // コインの音を�E生する関数
    function playCoinSound() {
        try {
            const audio = new Audio('coin.mp3');
            audio.volume = 0.3; // 音量を調整
            audio.play().catch(e => {
                console.log('コインの音が�E生できませんでした:', e);
            });
        } catch (e) {
            console.log('コインの音ファイルが見つかりません:', e);
        }
    }

    // ボタンのチE��ストを更新する関数
    function updateCompleteButtonText(selectedDate) {
        if (!completeButton) return;
        
        if (!selectedDate) {
            // 選択されてぁE��ぁE��合�EチE��ォルトテキスチE            completeButton.textContent = '入浴完亁E��E;
            return;
        }
        
        const { year, month, day } = selectedDate;
        const hasRecord = hasBathRecord(year, month, day);
        
        if (hasRecord) {
            completeButton.textContent = '入浴を取り消す';
        } else {
            completeButton.textContent = '入浴完亁E��E;
        }
    }
    
    // 「�E浴完亁E��」�Eタンのイベントリスナ�E
    if (completeButton) {
        completeButton.addEventListener('click', () => {
            // 現在選択されてぁE��日付を取征E            const selectedDay = calendarElement.querySelector('.day.selected-date');
            
            if (!selectedDay) {
                alert('まずカレンダーから日付を選んでな�E�E);
                return;
            }
            
            const day = parseInt(selectedDay.dataset.day);
            const year = parseInt(selectedDay.dataset.year);
            const month = parseInt(selectedDay.dataset.month);
            
            // 記録をトグル
            const isRecorded = toggleBathRecord(year, month, day);
            
            // カレンダーを�E生�Eして表示を更新
            generateCalendar(currentYear, currentMonth);
            
            // 選択状態を解除
            selectedDay.classList.remove('selected-date');
            updateCompleteButtonText(null);
            
            // 記録が追加された場合�Eみコインエフェクトを実衁E            if (isRecorded) {
                createCoinEffect();
                alert('入浴記録を追加したで�E�お疲れ様！E);
            } else {
                alert('入浴記録を取り消したで�E�E);
            }
        });
    }
    
    generateCalendar(currentYear, currentMonth);



});

    const moodButtons = document.querySelectorAll('.mood-button');
    const decideButton = document.getElementById('fortune-btn');
    const suggestionDisplay = document.getElementById('suggestion-display'); // 新しく作った表示エリア
    const rerollButton = document.getElementById('reroll-btn'); // 「選びなおす」�Eタンを取得！E    
    // チE��チE��用�E�rerollButtonが正しく取得されてぁE��か確誁E    console.log('rerollButton:', rerollButton);
    console.log('rerollButton element:', document.getElementById('reroll-btn'));
    
    // 初期状態で「選びなおす」�Eタンが隠れてぁE��か確誁E    const initialRerollBtn = document.getElementById('reroll-btn');
    if (initialRerollBtn) {
        console.log('初期状態�Ereroll-btn:', initialRerollBtn);
        console.log('初期状態�EclassList:', initialRerollBtn.classList.toString());
        console.log('初期状態�Estyle.display:', initialRerollBtn.style.display);
    }

    let selectedMood = null;
    let currentSuggestion = null;

    // 気�EボタンがクリチE��されたとき�E処琁E    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mood = button.dataset.mood;
            if (button.classList.contains('selected')) {
                button.classList.remove('selected');
                selectedMood = null;
            } else {
                moodButtons.forEach(btn => btn.classList.remove('selected'));
