/* ============================================================
   script.js
   「LUMINA BEAUTY SALON」LPに、2つの動きを追加するファイルです。

   ① フッターの年号を、自動で「今年」に更新する
   ② スクロールして各セクションが画面に入ってきたときに、
      ふわっと（フェードイン）表示させる

   JavaScriptが分からなくても、上から順番にコメントを読めば
   「何が」「なぜ」動いているかが分かるように書いています。
   ============================================================ */


/* ------------------------------------------------------------
   HTMLの読み込みが終わってから処理を始めるための書き方です。
   要素がまだ無い状態でJavaScriptが動いてエラーになるのを防ぎます。
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  updateFooterYear();
  setupScrollFadeIn();
});


/* ------------------------------------------------------------
   ① フッターの年号を自動更新する処理
   ------------------------------------------------------------ */
function updateFooterYear() {
  var yearArea = document.getElementById("current-year");

  if (!yearArea) {
    return;
  }

  var thisYear = new Date().getFullYear();
  yearArea.textContent = thisYear;
}


/* ------------------------------------------------------------
   ② スクロールで画面に入ってきたセクションを、ふわっと表示する処理

   仕組み：
   - style.cssで、class="fade-in" が付いた要素は
     「最初は透明・少し下にずれた状態」になっています。
   - この関数は「その要素が画面に入ってきたか」を監視して、
     入ってきたら is-visible というクラスを追加します。
   - is-visible が付くと、style.css側の設定でふわっと通常の見た目に戻ります。
   ------------------------------------------------------------ */
function setupScrollFadeIn() {
  var targets = document.querySelectorAll(".fade-in");

  if (targets.length === 0) {
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // 一度表示したら監視をやめる（表示済みの要素を毎回チェックする無駄を省く）
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  targets.forEach(function (target) {
    observer.observe(target);
  });
}
