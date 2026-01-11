const buttons = document.querySelectorAll('.payment-tabs button');
const modalBlocks = document.querySelectorAll('#product-modal');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const index = btn.dataset.target;

    // button active
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // modal_block active
    modalBlocks.forEach(m => m.classList.remove('active'));
    modalBlocks[index].classList.add('active');
  });
});



// =============================  Bonus  =============================
let bonusModalState = {
  maxBonus: 1500,
  currentInput: ''
};

document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('bonusToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      if (this.classList.contains('active2')) {
        this.classList.remove('active2');
        closeBonusModal();
      } else {
        // Agar active2 bo'lmasa, qo'shish va modal ochish
        this.classList.add('active2');
        openBonusModal();
      }
    });
  }
});

function openBonusModal() {
  const modal = document.getElementById('bonusModal');
  modal.classList.add('bonus-active');
  document.body.style.overflow = 'hidden';
}

function closeBonusModal(event) {
  // Agar bonusToggle bosilgan bo'lsa, faqat modal yopish (active2 allaqachon o'chirilgan)
  if (event && event.target && event.target.id === 'bonusToggle') {
    const modal = document.getElementById('bonusModal');
    modal.classList.remove('bonus-active');
    document.body.style.overflow = '';
    clearBonusInput();
    return;
  }

  // Agar modal tashqarisiga bosilgan bo'lsa yoki X ga bosilgan bo'lsa
  // Faqat modal yopish, active2 ni SAQLAB qolish
  if (!event || event.target.id === 'bonusModal') {
    const modal = document.getElementById('bonusModal');

    modal.classList.remove('bonus-active');
    document.body.style.overflow = '';
    clearBonusInput();
  }
}

function validateBonusInput() {
  const input = document.getElementById('bonusInput');
  const icons = document.getElementById('bonusIcons');
  const checkIcon = document.getElementById('bonusCheckIcon');
  const error = document.getElementById('bonusError');
  const btn = document.getElementById('bonusApplyBtn');
  const checking = document.querySelector('.bonus-modal-icon-check');

  const value = input.value.replace(/[^0-9]/g, '');
  input.value = value;
  bonusModalState.currentInput = value;

  if (value === '') {
    input.classList.remove('bonus-valid', 'bonus-error');
    icons.style.display = 'none';
    error.style.display = 'none';
    btn.classList.remove('bonus-enabled');
    return;
  }

  icons.style.display = 'flex';
  checking.style.display = 'block';
  // btn.classList.add('bonus-enabled');


  const numValue = parseInt(value);
  if (numValue > bonusModalState.maxBonus) {
    // Xato holati - faqat clear icon ko'rsatish
    btn.classList.remove('bonus-enabled');
    btn.setAttribute('disabled', 'disabled');
    input.classList.remove('bonus-valid');
    input.classList.add('bonus-error');
    error.style.display = 'block';
    checking.style.display = 'none';
    checkIcon.style.display = 'none'; // check icon yashirish
  } else {
    // To'g'ri holat - ikkala icon ham ko'rsatish
    btn.classList.add('bonus-enabled');
    input.classList.remove('bonus-error');
    input.classList.add('bonus-valid');
    error.style.display = 'none';
    checkIcon.style.display = 'flex'; // check icon ko'rsatish
  }
  // btn.classList.add('bonus-enabled');

}

function clearBonusInput() {
  const input = document.getElementById('bonusInput');
  const icons = document.getElementById('bonusIcons');
  const checkIcon = document.getElementById('bonusCheckIcon');
  const error = document.getElementById('bonusError');
  const btn = document.getElementById('bonusApplyBtn');
  // const checking = document.querySelector('.bonus-modal-icon-check');


  input.value = '';
  error.style.display = 'none';
  input.classList.remove('bonus-valid', 'bonus-error');
  icons.style.display = 'none';
  checkIcon.style.display = 'flex';
  btn.classList.remove('bonus-enabled');
  bonusModalState.currentInput = '';
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeBonusModal();
  }
}); 



//  ============================ yana qoshimcha =====
(function() {
    const giftCardDropdownSelected = document.getElementById('giftCardDropdownSelected');
    const giftCardDropdownMenu = document.getElementById('giftCardDropdownMenu');
    const giftCardAmountWrapper = document.getElementById('giftCardAmountWrapper');
    const giftCardAmountInput = document.getElementById('giftCardAmount');
    const giftCardApplyBtn = document.getElementById('giftCardApplyBtn');
    const giftCardStaticInfo = document.getElementById('giftCardStaticInfo');
    const availableAmount = document.getElementById('availableAmount');
    const expiryDate = document.getElementById('expiryDate');
    
    let selectedCardData = null;

    // Toggle dropdown
    giftCardDropdownSelected.addEventListener('click', function() {
        this.classList.toggle('gift-card-dropdown-open');
        giftCardDropdownMenu.classList.toggle('gift-card-dropdown-show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.gift-card-dropdown-wrapper')) {
            giftCardDropdownSelected.classList.remove('gift-card-dropdown-open');
            giftCardDropdownMenu.classList.remove('gift-card-dropdown-show');
        }
    });

    // Handle item selection
    const giftCardItems = document.querySelectorAll('.gift-card-dropdown-item');
    giftCardItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const number = this.getAttribute('data-number');
            const balance = this.getAttribute('data-balance');
            const expiry = this.getAttribute('data-expiry');
            
            selectedCardData = {
                number: number,
                balance: balance,
                expiry: expiry
            };
            
            // Remove active class from all items
            giftCardItems.forEach(function(card) {
                card.classList.remove('gift-card-dropdown-item-active');
            });
            
            // Add active class to clicked item
            this.classList.add('gift-card-dropdown-item-active');
            
            // Update selected display
            giftCardDropdownSelected.textContent = number;
            giftCardDropdownSelected.classList.remove('gift-card-dropdown-open');
            giftCardDropdownMenu.classList.remove('gift-card-dropdown-show');
            
            // Show amount input wrapper
            giftCardAmountWrapper.style.display = 'block';
            
            // Show static info
            giftCardStaticInfo.style.display = 'flex';
            availableAmount.textContent = balance + '₽';
            expiryDate.textContent = expiry;
            
            // Reset input
            giftCardAmountInput.value = '';
            giftCardApplyBtn.style.display = 'none';
        });
    });

    // Show apply button when typing
    giftCardAmountInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        
        if (this.value.length > 0) {
            giftCardApplyBtn.style.display = 'block';
        } else {
            giftCardApplyBtn.style.display = 'none';
        }
    });

    // Handle apply button click
    giftCardApplyBtn.addEventListener('click', function() {
        const amount = giftCardAmountInput.value;
        if (amount && selectedCardData) {
            console.log('Applied amount:', amount, 'from card:', selectedCardData.number);
            // Add your logic here
        }
    });
})();