// magic.js
$(document).ready(function () {

    // process the form
    $('form').submit(function (event) {

        $('.form-group').removeClass('has-error'); // remove the error class
        $('.help-block').remove(); // remove the error text

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
            'email': $('input[name=email]').val(),
            'password': $('input[name=password]').val()
        };

        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: 'signin_result.php', // the url where we want to POST
            data: formData, // our data object
            dataType: 'json', // what type of data do we expect back from the server
            encode: true
        })
                // using the done promise callback
                .done(function (data) {

                    // log data to the console so we can see
                    console.log(data);

                    // here we will handle errors and validation messages
                    if (!data.success) {

                        // handle errors for name ---------------
                        if (data.errors.email) {
                            $('#email-group').addClass('has-error'); // add the error class to show red input
                            $('#email-group').append('<div class="help-block">' + data.errors.email + '</div>'); // add the actual error message under our input
                        }

                        // handle errors for email ---------------
                        if (data.errors.password) {
                            $('#password-group').addClass('has-error'); // add the error class to show red input
                            $('#password-group').append('<div class="help-block">' + data.errors.password + '</div>'); // add the actual error message under our input
                        }

                        

                    } else {

                        // ALL GOOD! just show the success message!
                        $('form').append('<div class="alert alert-success">' + data.message + '</div>');

                        // usually after form submission, you'll want to redirect
                        
                       window.location = "user_menu.php"; // redirect a user to another page

                    }
                })

                // using the fail promise callback
                .fail(function (data) {

                    // show any errors
                    // best to remove for production
                    console.log(data);
                    
                    $('form').append('<div class="alert alert-danger">' + data.message + '</div>');
                    
                });

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});
