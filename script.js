// عداد متحرك للنسبة
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.textContent = Math.floor(progress * (end - start) + start) + "%";
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// حساب نسبة ثابتة حسب الأسماء
function calculateLovePercentage(name1, name2) {
  let str = (name1 + name2).toLowerCase().replace(/\s+/g, "");
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }
  return (sum % 100) + 1; // نسبة بين 1 و 100
}

document.getElementById("calculateButton").addEventListener("click", function () {
  let femaleName = document.getElementById("femaleName").value.trim();
  let maleName = document.getElementById("maleName").value.trim();

  if (femaleName === "" || maleName === "") {
    alert("يرجى إدخال الاسمين معًا!");
    return;
  }

  let percentage = calculateLovePercentage(femaleName, maleName);

  // الأسماء
  document.getElementById("displayFemaleName").textContent = femaleName;
  document.getElementById("displayMaleName").textContent = maleName;

  // النسبة
  animateValue("percentage", 0, percentage, 1200);
  document.getElementById("meterFill").style.width = percentage + "%";

  // الحالة + الوصف
  let status = "";
  let desc = "";
  if (percentage > 80) {
    status = "توافق مثالي 💕";
    desc = "علاقتكما مليئة بالحب والانسجام، أنتما ثنائي رائع ومنسجم في معظم النواحي.";
  } else if (percentage > 50) {
    status = "توافق جيد 🙂";
    desc = "هناك انسجام جيد بينكما، مع بعض التحديات التي يمكن تجاوزها بالتفاهم.";
  } else if (percentage > 30) {
    status = "توافق ضعيف 🤔";
    desc = "العلاقة تحتاج جهدًا إضافيًا وصبرًا من الطرفين لبناء تفاهم أعمق.";
  } else {
    status = "صعب جدًا 😢";
    desc = "الفروقات كبيرة وقد تحتاجان إلى إعادة النظر في علاقتكما أو تعزيز التواصل.";
  }

  document.getElementById("relationshipStatus").textContent = status;
  document.getElementById("relationshipDesc").textContent = desc;

  document.getElementById("message").textContent = "تم حساب نسبة الحب بينكما! 🌸";
});
