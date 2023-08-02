/**
 * A enum-like structure to make it easier to reference the indexes of the different
 * steps on the Registration Form slider/carousel.
 */
const REQUEST_FORM_STEPS = {
    VEHICLE_TYPE_STEP: 0,
    VEHICLE_NUMBER_STEP: 1,
    DATE_STEP: 2,
    LOCATION_STEP: 3,
    COMMENT_STEP: 4
}

/**
 * Object that will contain the final data to be submitted to Hubspot
 */

let FINAL_FORM_DATA = {
    email: '',
    multi_rental_date_start: '',
    multi_rental_date_to: '',
    bulk_rental_vehicle_type: '',
    bulk_rental_vehicle_subtype: '',
    bulk_rental_storage: '',
    daily_rate: '',
    vehicle_units: '',
    bulk_rental_location: '',
    bulk_rental_radius_miles: '',
    bulk_rental_comment: '',
    hutk: '',
    full_name: '',
    company: '',
    phone: '',
    dot_number: '',
    city: ''
}

let API_POST_REQUEST_BODY = {
    "fields": [
        {
            "objectTypeId": "0-1",
            "name": "multi_rental_date_start",
            "value": FINAL_FORM_DATA.multi_rental_date_start
        },
        {
            "objectTypeId": "0-1",
            "name": "email",
            "value": FINAL_FORM_DATA.email
        },
        {
            "objectTypeId": "0-1",
            "name": "multi_rental_date_to",
            "value": FINAL_FORM_DATA.multi_rental_date_to
        },
        {
            "objectTypeId": "0-1",
            "name": "bulk_rental_vehicle_type",
            "value": FINAL_FORM_DATA.bulk_rental_vehicle_type
        },
        {
            "objectTypeId": "0-1",
            "name": "bulk_rental_vehicle_subtype",
            "value": FINAL_FORM_DATA.bulk_rental_vehicle_subtype
        },
        {
            "objectTypeId": "0-1",
            "name": "daily_rate",
            "value": FINAL_FORM_DATA.daily_rate
        },
        {
            "objectTypeId": "0-1",
            "name": "vehicle_units",
            "value": FINAL_FORM_DATA.vehicle_units
        },
        {
            "objectTypeId": "0-1",
            "name": "bulk_rental_location",
            "value": FINAL_FORM_DATA.bulk_rental_location
        },
        {
            "objectTypeId": "0-1",
            "name": "bulk_rental_radius_miles",
            "value": FINAL_FORM_DATA.bulk_rental_radius_miles
        },
        {
            "objectTypeId": "0-1",
            "name": "bulk_rental_comment",
            "value": FINAL_FORM_DATA.bulk_rental_comment
        }
    ],
    "context": {
        "pageUri": "www.coop.com/multi-vehicle-request",
        "pageName": "Bulk Rental Form"
    }
}

/**
 * An object with arrays for the different vehicle types,
 * used to populate the dropdown once the user selects a Vehicle Type
 */
const VEHICLE_CATEGORIES = {
    'truck': [
        'Select',
        'Flatbed Truck',
        'Refrigerated Box Truck',
        'Box Truck',
    ],
    'tractor': [
        'Select',
        'Single Axle Daycab Tractor',
        'Single Axle Sleeper Tractor',
        'Tandem Axle Daycab Tractor',
        'Tandem Axle Sleeper Tractor'
    ],
    'trailer': [
        'Select',
        'Dry Van Trailer',
        'Flatbed Trailer',
        'Refrigerated Trailer'
    ],
    'van': [
        'Select',
        'Refrigerated Cargo Van',
        'Cargo Van'
    ]
}

/**
 * A simple counter to keep track of current step
 */
let currentStepNumber = 0;


// ----------------------- Some shared DOM elements --------------------------------

/**
 * The selector for the main container of the Registration Form.
 */
const requestFormContainerSelector = '#req-form-container';

/**
 * Reference to the main container (DOM element) of the whole Registration Form. 
 * This container is the DOM parent of all the registration steps/screens in the slider/carousel.
 */
const requestFormContainer = $(requestFormContainerSelector);

/**
 * The selector for the main container of the Summary.
 */
const summaryContainerSelector = '#summary-container';

/**
 * Reference to the main container (DOM element) of the whole Summary. 
 * This container is the DOM parent of the summary.
 */
const summaryContainer = $(summaryContainerSelector);

/**
 * Form Submit Button
 */

const formSubmitButton = $('#form-submit-btn');

const submitRequestButton = $('#submit-request-btn');

/**
 * Reference to the 'Next Step' button
 */
const nextStepButtonSelector = '#btn-next-step';

const nextStepButton = $(nextStepButtonSelector);

let nextStepButtonEnabled = false;

/**
 * Reference to the 'Back' button
 */

const previousStepButton = $('#btn-previous-step');

/**
 * Reference to the 'Mask' container in WF
 */

const maskContainerSelector = '#wf-mask';

const maskContainer = $(maskContainerSelector);

/**
 * Reference to the 'Slider' container in WF
 */

const sliderContainerSelector = '#wf-slider';

const sliderContainer = $(sliderContainerSelector);

/**
 * Reference to the hidden 'Hubspot UTK' cookie form field
 */

const hubspotCookieField = $('#hubspot-utk-field');

// ----------------------- SUMMARY FIELDS -------------------------


const editIconButton = $('#edit-icon', summaryContainer);

/**
 * Reference to the 'Vehicle Type' field in the summary section
 */
const vehicleTypeSummary = $('#vehicle-type-summary', summaryContainer);

/**
 * Reference to the 'Units' field in the summary section
 */
const vehicleUnitsSummary = $('#vehicle-units-summary', summaryContainer);

/**
 * Reference to the 'From' field in the summary section
 */
const fromDateSummary = $('#from-date-summary', summaryContainer);

/**
 * Reference to the 'To' field in the summary section
 */
const toDateSummary = $('#to-date-summary', summaryContainer);

/**
 * Reference to the 'Pick Up' field in the summary section
 */
const pickUpSummary = $('#pick-up-summary', summaryContainer);

/**
 * Reference to the 'Pick Up' field in the summary section
 */
const radiusSummary = $('#radius-summary', summaryContainer);


// ------------------------------------ FORM -------------------------------------

/**
 * A reference to the DOM container of the elements on the step for vehicle type.
 */
const multistepForm = $('#wf-form-Hubpost-Bulk-Rental', requestFormContainer);

const emailField = $('#email-field-modal');

const emailSubmitButton = $('#email-submit-btn')


// ------------------------ STEP 1 FIELDS (Vehicle Type) -----------------------------

/**
 * A reference to the DOM container of the elements on the step for vehicle type.
 */
const vehicleTypeStep = $('#vehicle-type-step', requestFormContainer);

/**
 * A reference to the 'Truck' vehicle type button
 */
const vehicleTypeTruckButton = $('#btn-v-type_truck', vehicleTypeStep);

/**
 * A reference to the 'Tractor' vehicle type button
 */
const vehicleTypeTractorButton = $('#btn-v-type_tractor', vehicleTypeStep);

/**
 * A reference to the 'Tractor' vehicle type button
 */
const vehicleTypeTrailerButton = $('#btn-v-type_trailer', vehicleTypeStep);

/**
 * A reference to the 'Van' vehicle type button
 */
const vehicleTypeVanButton = $('#btn-v-type_van', vehicleTypeStep);


const vehicleTypeButtons = $('#btn-v-type_truck, #btn-v-type_tractor, #btn-v-type_trailer, #btn-v-type_van')


const vehicleTypeDropdown = $('#vehicle-type-dropdown', vehicleTypeStep);

const vehicleDailyRate = $('#vehicle-rate-field', vehicleTypeStep);

const vehicleSubtypeLabel = $('#subtype-label', vehicleTypeStep);


// ------------------------ STEP 2 FIELDS (Vehicle Number) -----------------------------

/**
 * A reference to the DOM container of the elements on the step for vehicle number.
 */
const vehicleNumberStep = $('#vehicle-number-step', requestFormContainer);

/**
 * A reference to the 'Minus' vehicle units button
 */
const decreaseVehicleNumberButton = $('#btn-v-units-minus', vehicleNumberStep);

/**
 * A reference to the 'Plus' vehicle units button
 */
const increaseVehicleNumberButton = $('#btn-v-units-plus', vehicleNumberStep);

/**
 * A reference to the 'Vehicle Units' field
 */
const vehicleNumberField = $('#v-units-field', vehicleNumberStep);

let vehicleNumber = 2;

// ------------------------ STEP 3 FIELDS (Date Step) -----------------------------

/**
 * A reference to the DOM container of the elements on the step for date.
 */
const dateStep = $('#date-step', requestFormContainer);

/**
 * A reference to the 'From' date field
 */
const fromDateField = $('#from-date-field', dateStep);

/**
 * A reference to the 'To' date field
 */
const toDateField = $('#to-date-field', dateStep);


$('[data-toggle="datepicker"]').datepicker({
    format: 'yyyy-mm-dd'
});
// Available date placeholders:
// Year: yyyy
// Month: mm
// Day: dd
if (window.innerWidth < 768) {
    $('[data-toggle="datepicker"]').attr('readonly', 'readonly')
}


// ------------------------ STEP 4 FIELDS (Location Step) -----------------------------

/**
 * A reference to the DOM container of the elements on the step for location.
 */
const locationStep = $('#location-step', requestFormContainer);

/**
 * A reference to the 'Location' field
 */
const locationField = $('#location-field', locationStep);

/**
 * A reference to the 'Radius' dropdown
 */
const radiusDropdownField = $('#radius-dropdown', locationStep);


// ------------------------ STEP 5 FIELDS (Comment Step) -----------------------------

/**
 * A reference to the DOM container of the elements on the step for comment.
 */
const commentStep = $('#comment-step', requestFormContainer);

/**
 * A reference to the 'Comment' field
 */
const commentField = $('#comment-field', commentStep);

// ------------------------ MISC FUNCTIONS ----------------------------------

/**
 * Grabs the value of a cookie based on it's name.
 * Used to get the value of 'hubspotutk' and pass it to a hidden form field.
 */
function getCookies() {
    var hubspotCookie = document.cookie.match(new RegExp('(^| )' + 'hubspotutk' + '=([^;]+)'));
    if (hubspotCookie) {
        hubspotCookieField.val(`${hubspotCookie[2]}`);
        API_POST_REQUEST_BODY.context.hutk = hubspotCookie[2];
    }
    else {
        console.log('--something went wrong---');
    }
}

getCookies();

/**
 * Returns a reference to the Webflow Slider navigation control at the given index
 * @param {*} index 
 */
const getWebflowSliderNavigationControl = (index, sliderContainer) => {
    const sliderNavContainer = $('.w-slider-nav', sliderContainer); // Webflow slider navigation container
    const navItems = $('.w-slider-dot', sliderNavContainer); // Webflow sider navigation items
    return $(navItems.get(index));
};

/**
 * Gets a reference to the given navigation control within the Request Form
 * @param {*} index 
 */
const getRegistrationFormNavigationControl = (index) => {
    return getWebflowSliderNavigationControl(index, requestFormContainer);
};

/**
 * Manually triggers the given Webflow Slider navigation element/control
 * @param {*} navControl 
 */
const triggerWebflowSliderNavigationControl = (navControl) => {
    /*
        Triggering the "click" event causes navigation to occur
     */
    navControl.trigger('click');
};

/**
 * Adjust several features based on what step the user is currently in
 */
const checkCurrentStep = (stepNumber) => {
    if (stepNumber === 0) {
        makeSlideBigger();
    } else if (stepNumber === 1) {
        nextStepButtonEnabled = true;
        nextStepButton.attr('style', 'background-color: #415077')
        makeSlideSmaller();
    } else if (stepNumber === 2) {
        if (fromDateField.val() && toDateField.val()) {
            nextStepButtonEnabled = true;
            nextStepButton.attr('style', 'background-color: #415077')
        }
    } else if (stepNumber === 3) {
        if (locationField.val() && radiusDropdownField.val()) {
            nextStepButtonEnabled = true;
            nextStepButton.attr('style', 'background-color: #415077')
        }
        showNextStepButton();
    } else if (stepNumber === 4) {
        showSubmitButton();
    }
}

const showSubmitButton = () => {
    nextStepButton.attr('style', 'display: none !important');
    submitRequestButton.attr('style', 'display: flex !important');
}

const showNextStepButton = () => {
    nextStepButton.attr('style', 'display: flex !important');
    submitRequestButton.attr('style', 'display: none !important');
}

/**
 * Advances to next step and updates 
 */
const goToNextStep = (stepNumber) => {
    triggerWebflowSliderNavigationControl(
        getRegistrationFormNavigationControl(
            REQUEST_FORM_STEPS[getStepNameByNumber(REQUEST_FORM_STEPS, stepNumber + 1)]
        ));
}

/**
 * Advances to next step and updates 
 */
const goToPreviousStep = (stepNumber) => {
    triggerWebflowSliderNavigationControl(
        getRegistrationFormNavigationControl(
            REQUEST_FORM_STEPS[getStepNameByNumber(REQUEST_FORM_STEPS, stepNumber - 1)]
        ));
}


/**
 * Gets name of the step from it's number.
 */
const getStepNameByNumber = (obj, value) =>
    Object.keys(obj).find(key => obj[key] === value);

const initializeForm = () => {
    maskContainer.css('height', '290px');
    sliderContainer.attr('style', 'height: 290px !important');
}

initializeForm();

const updateSummary = (field, value) => {
    field.text(value);
}

// --------------------------------- HANDLERS ---------------------------------

// prevents typing on date fields
fromDateField.keypress(function (e) {
    return false
});

toDateField.keypress(function (e) {
    return false
});

vehicleNumberField.keypress(function (e) {
    return false
})

vehicleDailyRate.on('change', function () {
    if (vehicleDailyRate.val()) {
        nextStepButtonEnabled = true;
        nextStepButton.attr('style', 'background-color: #415077')
    }
})

/**
 * Handles 'Next Step' button click
 */
nextStepButton.on('click', function () {
    if (nextStepButtonEnabled) {
        if (currentStepNumber >= 0 && currentStepNumber <= 3) {
            goToNextStep(currentStepNumber);
            currentStepNumber++;
        }
        checkCurrentStep(currentStepNumber);
        nextStepButtonEnabled = false;
        nextStepButton.attr('style', 'background-color: #8d969a')
    } else {
        return false;
    }
})

/**
 * Handles 'Next Step' button click
 */
previousStepButton.on('click', function () {
    if (currentStepNumber >= 1 && currentStepNumber <= 4) {
        goToPreviousStep(currentStepNumber);
        currentStepNumber--;
    }
    checkCurrentStep(currentStepNumber);
})

increaseVehicleNumberButton.on('click', function () {
    vehicleNumber++
    vehicleNumberField.val(vehicleNumber);
    decreaseVehicleNumberButton.attr('style', 'background-color: #415077')
    updateSummary(vehicleUnitsSummary, vehicleNumber);
})

decreaseVehicleNumberButton.on('click', function () {
    if (vehicleNumber > 2) {
        vehicleNumber--
        if (vehicleNumber == 2) {
            decreaseVehicleNumberButton.attr('style', 'background-color: #8d969a')
        }
        vehicleNumberField.val(vehicleNumber);
        updateSummary(vehicleUnitsSummary, vehicleNumber);
    }
})

editIconButton.on('click', function () {
    triggerWebflowSliderNavigationControl(
        getRegistrationFormNavigationControl(
            REQUEST_FORM_STEPS.VEHICLE_TYPE_STEP
        ));

    currentStepNumber = 0;
})

emailSubmitButton.on('click', function () {
    updateSubmissionData();
    FINAL_FORM_DATA.email = emailField.val();
    formSubmissionCall();
    $('#email-overlay-wrap').css('display', 'none');
    $('#success-overlay').css('display', 'flex');
    $('body').attr('style', 'overflow: hidden !important');
})

submitRequestButton.on('click', function () {
    var emailCookie = document.cookie.match(new RegExp('(^| )' + 'user-email' + '=([^;]+)'));
    if (emailCookie) {
        emailField.val(decodeURI(emailCookie[2]))
        updateSubmissionData();
        formSubmissionCall();
        $('#success-overlay').css('display', 'flex');
        $('body').attr('style', 'overflow: hidden !important');
    }
    else {
        $('#email-overlay-wrap').css('display', 'flex');
        $('body').attr('style', 'overflow: hidden !important');
    }
})


// TODO: remove this, no longer needed since we are using popup after submission

const hideAfterSubmission = () => {
    $('#btn-wrapper').css('display', 'none');
}

/**
 * Handles clicks on one of the Vehicle Type options
 */

vehicleTypeButtons.on('click', function () {
    updateSummary(vehicleTypeSummary, 'Pending');

    // #region ------------- responsive changes start ---------
    maskContainer.attr('style', 'height: 390px !important')
    sliderContainer.attr('style', 'height: 390px !important');

    if (windowWidth <= 992 && windowWidth >= 768) {
        maskContainer.attr('style', 'height: 290px !important');
        sliderContainer.attr('style', 'height: 290px !important');
    }

    if (windowWidth <= 767) {
        maskContainer.attr('style', 'height: 350px !important');
        sliderContainer.attr('style', 'height: 350px !important');
    }

    vehicleTypeButtons.each(function () {
        $(this).css('background-color', '#FFFFFF');
        $(this).find('span').css('color', '#415077');
        $(this).find('.v-type-icon').css('display', 'block');
        $(this).find('.v-type-icon.white').css('display', 'none');
    })

    // #endregion responsive changes 

    $(this).css('background-color', '#415077');
    $(this).find('span').css('color', '#FFFFFF');
    $(this).find('.v-type-icon').css('display', 'none');
    $(this).find('.v-type-icon.white').css('display', 'block');

    const vehicleType = $(this).attr('id').slice($(this).attr('id').indexOf('_') + 1);
    var vehicleTypeArray = VEHICLE_CATEGORIES[vehicleType];
    var option = '';
    for (var i = 0; i < vehicleTypeArray.length; i++) {
        option += '<option value="' + vehicleTypeArray[i] + '">' + vehicleTypeArray[i] + '</option>';
    }
    vehicleTypeDropdown.empty().append(option)

    FINAL_FORM_DATA.bulk_rental_vehicle_type = vehicleType
})

vehicleTypeDropdown.on('change', function () {
    updateSummary(vehicleTypeSummary, vehicleTypeDropdown.find(":selected").val());
    // #region ------------- responsive changes start ---------

    maskContainer.attr('style', 'height: 500px !important');
    sliderContainer.attr('style', 'height: 500px !important');

    if (windowWidth <= 992 && windowWidth >= 768) {
        maskContainer.attr('style', 'height: 400px !important');
        sliderContainer.attr('style', 'height: 400px !important');
    }

    if (windowWidth <= 767) {
        maskContainer.attr('style', 'height: 460px !important');
        sliderContainer.attr('style', 'height: 460px !important');
    }

    // #endregion responsive changes 
})

fromDateField.on('change', function () {
    updateSummary(fromDateSummary, fromDateField.val().replace())
})

toDateField.on('change', function () {
    updateSummary(toDateSummary, toDateField.val())
})

radiusDropdownField.on('change', function () {
    updateSummary(radiusSummary, radiusDropdownField.find(":selected").val())
})

locationField.on('change', function () {
    updateSummary(pickUpSummary, locationField.val())
})

/**
 * Gets data from fields and passes it to Object
 */
const updateSubmissionData = () => {
    FINAL_FORM_DATA.bulk_rental_vehicle_subtype = vehicleTypeDropdown.find(":selected").val()
    FINAL_FORM_DATA.daily_rate = vehicleDailyRate.val();
    FINAL_FORM_DATA.vehicle_units = vehicleNumberField.val();
    FINAL_FORM_DATA.multi_rental_date_start = fromDateField.val();
    FINAL_FORM_DATA.multi_rental_date_to = toDateField.val();
    FINAL_FORM_DATA.bulk_rental_location = locationField.val();
    FINAL_FORM_DATA.bulk_rental_radius_miles = radiusDropdownField.val();
    FINAL_FORM_DATA.bulk_rental_comment = commentField.val();
    FINAL_FORM_DATA.email = emailField.val();
}


/**
 * Hubspot Form Submission API call
 */
async function formSubmissionCall() {
    let requestURL = "https://api.hsforms.com/submissions/v3/integration/submit/3840745/fa312bc2-e466-4ff5-9225-ebca231883c2"
    let authToken = "Bearer pat-na1-d613ec32-87bc-4150-b471-4ee867e69c30"
    let requestHeader = {
        "Authorization": authToken,
        "content-type": "application/json"
    }
    try {
        const response = await fetch(requestURL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: requestHeader
        })
        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}


// --------------------------------- RESPONSIVENESS -----------------------------

/**
 * Global variable for window width, adjusted on resize
 */
var windowWidth = $(window).width();

$(window).resize(function () {
    windowWidth = $(window).width();
    // desktop medium breakpoint
    if (windowWidth <= 1400 && windowWidth > 1200) {
        requestFormContainer.attr('style', 'width: 800px')
    }
    // desktop small breakpoint
    if (windowWidth <= 1200 && windowWidth >= 992) {
        requestFormContainer.attr('style', 'width: 600px')
    }
});


const makeSlideBigger = () => {
    previousStepButton.attr('style', 'display: none !important');
    maskContainer.attr('style', 'height: 500px !important');
    sliderContainer.attr('style', 'height: 500px !important');

    if (windowWidth <= 992 && windowWidth >= 768) {
        maskContainer.attr('style', 'height: 400px !important');
        sliderContainer.attr('style', 'height: 400px !important');
    }
}

const makeSlideSmaller = () => {
    previousStepButton.attr('style', 'display: flex !important');
    maskContainer.attr('style', 'height: 290px !important');
    sliderContainer.attr('style', 'height: 290px !important');

    if (windowWidth <= 992 && windowWidth >= 768) {
        maskContainer.attr('style', 'height: 190px !important');
        sliderContainer.attr('style', 'height: 190px !important');
    }
}
