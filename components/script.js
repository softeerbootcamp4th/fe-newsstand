function toggleButton(buttonId) {
    const button = document.getElementById(buttonId);
    // Remove 'active' class from all buttons
    document.querySelectorAll('.button').forEach(function(btn) {
      btn.classList.remove('active');
    });
    // Add 'active' class to the clicked button
    button.classList.add('active');
}
