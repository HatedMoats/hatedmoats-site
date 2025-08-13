// This tells the script to wait until the entire HTML page is loaded and ready.
document.addEventListener('DOMContentLoaded', function() {

    // === Modal Logic V2 with AJAX Form Submission ===
    
    const modal = document.getElementById('newsletter-modal');
    const openBtn = document.getElementById('open-modal-btn');
    const closeBtn = document.querySelector('.modal-content .close-button');
    const form = document.getElementById('newsletter-form');
    const formView = document.querySelector('.form-view');
    const thankYouView = document.querySelector('.thank-you-view');

    // Function to open the modal
    const openModal = () => {
        // Reset to the form view every time it opens
        formView.style.display = 'block';
        thankYouView.style.display = 'none';
        modal.style.display = 'flex';
    };

    // Function to close the modal
    const closeModal = () => {
        modal.style.display = 'none';
    };

    // --- Event Listeners ---
    // First, check if the button actually exists before adding a listener
    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents the link from jumping
            openModal();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal if user clicks outside the content box
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                closeModal();
            }
        });
    }

    // --- Form Submission Logic ---
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default page refresh
            
            const formData = new FormData(form);
            const action = form.getAttribute('action');
            
            // Send the form data to Formspree in the background
            fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // If submission is successful, show the thank you message
                    formView.style.display = 'none';
                    thankYouView.style.display = 'block';
                    form.reset(); // Clear the form
                    
                    // Automatically close the modal after 5 seconds
                    setTimeout(closeModal, 5000);
                } else {
                    alert("Oops! There was a problem submitting your form.");
                }
            }).catch(error => {
                alert("Oops! There was a problem submitting your form.");
            });
        });
    }

}); // End of the DOMContentLoaded listener