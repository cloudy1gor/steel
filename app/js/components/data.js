function data(params) {
  // TODO отправка данных на сервер (AJAX)
  // берем несколько форм на сайте и отправляем данные в server.php
  // чтобы проверить нужен локальный сервер

  const forms = document.querySelectorAll("form");
  const message = {
    loading: "Загрузка",
    success: "Мы с вами свяжумся",
    fail: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    postData(item);
  });

  // // постинг данных через XMLHttpRequest()
  // function postData(form) {
  //   form.addEventListener("submit", (e) => {
  //     e.preventDefault();

  //     const statusMessage = document.createElement("div");
  //     statusMessage.classList.add("status");
  //     statusMessage.textContent = message.loading;
  //     form.append(statusMessage);

  //     // Когда используется связка XMLHttpRequest (обьекта) и FormData - заголовок устанавливать не нужно, он установится автоматически
  //     // из-за этого мы не получили данные на сервере
  //     const request = new XMLHttpRequest();
  //     request.open("POST", "server.php");

  //     // request.setRequestHeader("Content-type", "multipart/form-data"); // для PHP
  //     request.setRequestHeader("Content-type", "application/json"); // для JSON (нужно указать заголовок)
  //     const formData = new FormData(form);

  //     // для JSON превращаем FormData
  //     const objec = {};
  //     formData.forEach(function (value, key) {
  //       objec[key] = value;
  //     });
  //     // конвертация в JSON
  //     const json = JSON.stringify(objec);

  //     request.send(formData);

  //     request.addEventListener("load", () => {
  //       if (request.status == 200) {
  //         console.log(request.response);
  //         statusMessage.textContent = message.success;
  //         // Сьрасываем форму и удаляем блок
  //         form.reset();
  //         setTimeout(() => {
  //           statusMessage.remove;
  //         }, 3000);
  //       } else {
  //         statusMessage.textContent = message.fail;
  //       }
  //     });
  //   });
  // }

  // TODO постинг данных через fetch()
  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const formData = new FormData(form);

      // для JSON превращаем FormData
      const objec = {};
      formData.forEach(function (value, key) {
        objec[key] = value;
      });

      fetch("server.php", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(objec), // конвертация в JSON
      })
        .then((data) => data.text())
        .then((data) => {
          console.log(data);
          statusMessage.textContent = message.success;
          // Сбрасываем форму и удаляем блок
          setTimeout(() => {
            statusMessage.remove();
          }, 3000);
        })
        .catch(() => {
          statusMessage.textContent = message.fail;
        })
        .finally(() => {
          form.reset();
        });
    });
  }
}

export default data;
