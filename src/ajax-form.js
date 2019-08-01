
            /**
             * { This is an event listener module that submits any form with class '.ajax_form' using ajax 
             * to the specified action in the form}
             * 
             * you can pass a callback in the form attribute as data-function="this_function"
             * this_function will be called after form submission and the respones received will be passed into it as 
             * parameters
             * 
             * the form must have id attribute
             */

          $("body").on("submit", ".ajax_form", function (e) {
             e.preventDefault();

                $form = e.currentTarget;
                var formData = new FormData($form);

                $submit_btn = $($form).find(':submit');
                $($submit_btn).attr("disabled", true);
                $($submit_btn).append(" <i class='fa fa-spinner fa-spin'></i>");

                  $function =  $($form).attr('data-function');
                  
                    $.ajax({
                        type: "POST",
                        url: $form.action,
                        data: formData,
                        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                        processData: false, // NEEDED, DON'T OMIT THIS
                        cache: false,
                        success: function(data) {                                                      
                            $($submit_btn).attr("disabled", false);
                            $($submit_btn).html($submit_btn[0].textContent);

                            if (typeof(window[$function])=='function') {
                                window[$function](data);
                            }
                        },
                        error: function (data) {
                        },
                        complete: function(){
                            

                        }
                    });
            });



