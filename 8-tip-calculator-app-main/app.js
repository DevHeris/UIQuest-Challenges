document.addEventListener('DOMContentLoaded', function () {
    const billContainer = document.querySelector('.custom-bill-input-wrapper');
    const peopleContainer = document.querySelector('.custom-noOfPeople-input-wrapper');

    billContainer.addEventListener('click', function () {
        replaceWithInput(billContainer, 'billInput');
    });

    peopleContainer.addEventListener('click', function () {
        replaceWithInput(peopleContainer, 'numberOfPeopleInput');
    });

    function replaceWithInput(container, inputId) {
        const currentValue = container.querySelector('.bill-amount')?.textContent || '0';
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.id = inputId;
        inputElement.value = currentValue;

        container.replaceWith(inputElement);

        inputElement.addEventListener('blur', function () {
            const newValue = inputElement.value || '0';
            container.innerHTML = `<div class="img-wrapper">
                                      <img src="images/icon-dollar.svg" alt="Dollar Sign">
                                   </div>
                                   <p class="bill-amount">${newValue}</p>`;

            container.addEventListener('click', function () {
                replaceWithInput(container, inputId);
            });
        });

        inputElement.focus();
    }
});