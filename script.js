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

//TODO: remove daily_rate and full_name

let FINAL_FORM_DATA = {
    email: '',
    multi_rental_date_start: '',
    multi_rental_date_to: '',
    bulk_rental_vehicle_type: '',
    bulk_rental_vehicle_subtype: '',
    bulk_rental_storage: 'no',
    daily_or_monthly_rate: '',
    vehicle_rate: '',
    vehicle_units: '',
    bulk_rental_location: '',
    bulk_rental_radius_miles: '',
    bulk_rental_comment: '',
    hutk: '',
    firstname: '',
    lastname: '',
    company: '',
    phone: '',
    dot_number: '',
    city: '',
    utm_campaign: '',
    utm_source: '',
    utm_medium: '',
    utm_content: '',
    utm_term: ''
}

/**
 * An object with arrays for the different vehicle types,
 * used to populate the dropdown once the user selects a Vehicle Type
 */
const VEHICLE_CATEGORIES = {
    'truck': {
        'Select': '',
        'Flatbed Truck': 'flatbed-truck',
        'Refrigerated Box Truck': 'refrigerated-box-truck',
        'Box Truck': 'box-truck'
    },
    'tractor': {
        'Select': '',
        'Single Axle Daycab Tractor': 'single-axle-daycab',
        'Single Axle Sleeper Tractor': 'single-axle-sleeper',
        'Tandem Axle Daycab Tractor': 'tandem-axle-daycab',
        'Tandem Axle Sleeper Tractor': 'tandem-axle-sleeper'
    },
    'trailer': {
        'Select': '',
        'Dry Van Trailer': 'dry-van',
        'Flatbed Trailer': 'flatbed-trailer',
        'Refrigerated Trailer': 'refrigeratedTrailer',
        'Chassis': 'chassis'
    },
    'van': {
        'Select': '',
        'Refrigerated Cargo Van': 'refrigerated-cargo-van',
        'Cargo Van': 'cargo-van'
    }
}

/**
 * A simple counter to keep track of current step
 */
let currentStepNumber = 0;


/**
 * Global variable for window width, adjusted on resize
 */
var windowWidth = $(window).width();

// -------------------------------- EVENTS ----------------------------------------

const initializeDataLayer = () => {
    window.dataLayer = window.dataLayer || [];
}

initializeDataLayer();

const triggerGTMEvent = (triggerName) => {
    window.dataLayer.push({
        'event': triggerName,
    });
}

// -------------------------------- UTMS ----------------------------------------

/**
 * Grabs all of the query parameters 
 */
const urlParams = new URLSearchParams(window.location.search);

/**
 * Gets the UTM Campaign value
 */
const utmCampaign = urlParams.get('utm_campaign')

/**
 * Gets the UTM Source value
 */
const utmSource = urlParams.get('utm_source')

/**
 * Gets the UTM Medium value
 */
const utmMedium = urlParams.get('utm_medium')

/**
 * Gets the UTM Content value
 */
const utmContent = urlParams.get('utm_content')

/**
 * Gets the UTM Term value
 */
const utmTerm = urlParams.get('utm_term')


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
 * Form Submit Button 1st part (when email is received from cookie)
 */
const formSubmitButton = $('#form-submit-btn');

/**
 * Form Submit Button 2nd part (when email and information modal appears)
 */
const submitRequestButton = $('#submit-request-btn');

/**
 * Reference to the 'Next Step' button
 */
const nextStepButtonSelector = '#btn-next-step';

const nextStepButton = $(nextStepButtonSelector);


/**
 * Boolean that controls Next Step Button status
 * @param nextStepButton
 */
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
 * Vehicle Units validation warning reference
 */
const unitsWarning = $('#units-warning');

/**
 * Reference to the 'From' field in the summary section
 */
const fromDateSummary = $('#from-date-summary', summaryContainer);

/**
 * Vehicle Date validation warning reference
 */
const dateWarning = $('#date-warning');

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

// ------------------------------------ MODAL FIELDS ----------------------------

/**
 * Reference to the Name modal field
 */
const firstNameField = $('#first-name-field');

const lastNameField = $('#last-name-field');

/**
 * Reference to the Company modal field
 */
const yourCompanyField = $('#your-company-field');

/**
 * Reference to the Phone Number modal field
 */
const phoneNumberField = $('#phone-number-field');

/**
 * Reference to the DOT Number modal field
 */
const dotField = $('#dot-field');

/**
 * Reference to the City modal field
 */
const cityField = $('#city-field');

/**
 * Reference to the Email modal field
 */
const emailField = $('#email-field-modal');

const modalSubmitButton = $('#modal-submit-btn');

const requiredModalFields = $('#first-name-field, #last-name-field, #your-company-field, #phone-number-field, #email-field-modal')

requiredModalFields.on('change', function () {
    checkModalFields();
})


// ------------------------------------ FORM -------------------------------------

/**
 * A reference to the DOM container of the elements on the step for vehicle type.
 */
const multistepForm = $('#wf-form-Hubpost-Bulk-Rental', requestFormContainer);



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

const vehicleRate = $('#vehicle-rate-field', vehicleTypeStep);

const vehicleSubtypeLabel = $('#subtype-label', vehicleTypeStep);

const storageCheckboxWrap = $('#storage-checkbox-wrap')

const storageCheckbox = $('#storage-checkbox')

const dailyOrMonthlyRate = $("#daily-monthly-dropdown")

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

/**
 * Date Picker
 */
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
    if (stepNumber == 0) {
        makeSlideBigger();
        console.log('step 0 reached')
    } else if (stepNumber == 1) {
        makeSlideSmaller();
        triggerGTMEvent('renterBulkStep1')
        vehicleNumberField.val('2')
        updateSummary(vehicleUnitsSummary, vehicleNumberField.val())
        console.log('step 1 reached')
        enableNextStepButton();
    } else if (stepNumber == 2) {
        if (fromDateField.val() && toDateField.val()) {
            enableNextStepButton();
        }
        updateSummary(vehicleUnitsSummary, vehicleNumberField.val())
        triggerGTMEvent('renterBulkStep2')
        console.log('step 2 reached')
    } else if (stepNumber == 3) {
        if (locationField.val() && radiusDropdownField.val()) {
            enableNextStepButton();
        }
        showNextStepButton();
        triggerGTMEvent('renterBulkStep3')
        console.log('step 3 reached')
    } else if (stepNumber == 4) {
        showSubmitButton();
        console.log('step 4 reached')
        triggerGTMEvent('renterBulkStep4')
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

    if (windowWidth <= 767) {
        maskContainer.attr('style', 'height: 250px !important');
        sliderContainer.attr('style', 'height: 250px !important');
    }
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

vehicleRate.on('keypress', function (evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    if (vehicleRate.val()) {
        enableNextStepButton();
    }
    return true;
})

/**
 * 
 */
vehicleRate.on('keyup', function (e) {
    e.target.value = e.target.value.replace(/[^\d]/g, '');
    if (vehicleRate.val()) {
        enableNextStepButton();
    }
    return false;
})

vehicleRate.on('change', function () {
    if (validateVehicleRate(vehicleRate)) {
        enableNextStepButton();
    } else {
        disableNextStepButton();
    }
})

phoneNumberField.keypress(function (evt) {
    allowOnlyNumbersToBeTyped(evt);

})

dotField.keypress(function (evt) {
    allowOnlyNumbersToBeTyped(evt);
})

/**
 * limits field to only numerical characters
 */

vehicleNumberField.keypress(function (evt) {
    allowOnlyNumbersToBeTyped(evt);
})

vehicleNumberField.on('change', function () {
    vehicleNumber = vehicleNumberField.val();
    vehicleUnitsCheck();
})


/**
 * Handles 'Next Step' button click
 */
nextStepButton.on('click', function () {
    if (nextStepButtonEnabled === true) {
        if (currentStepNumber >= 0 && currentStepNumber <= 3) {
            goToNextStep(currentStepNumber);
            currentStepNumber++;
            nextStepButtonEnabled = false;
            nextStepButton.attr('style', 'background-color: #8d969a')
        }
        checkCurrentStep(currentStepNumber);
    } else if (nextStepButtonEnabled === false) {
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
    if (vehicleNumber < 50) {
        vehicleNumber++
        vehicleNumberField.val(vehicleNumber);
        decreaseVehicleNumberButton.attr('style', 'background-color: #415077 !important')
        updateSummary(vehicleUnitsSummary, vehicleNumber);
    }
    vehicleUnitsCheck();
})

const vehicleUnitsCheck = () => {
    if (vehicleNumber >= 2 && vehicleNumber <= 50) {
        unitsWarning.attr('style', 'display: none')
        enableNextStepButton();
    } else {
        disableNextStepButton();
        unitsWarning.attr('style', 'display: block')
    }
}

decreaseVehicleNumberButton.on('click', function () {
    if (vehicleNumber > 2) {
        vehicleNumber--
        if (vehicleNumber == 2) {
            decreaseVehicleNumberButton.attr('style', 'background-color: #8d969a')
        }
        vehicleNumberField.val(vehicleNumber);
        updateSummary(vehicleUnitsSummary, vehicleNumber);
    }
    vehicleUnitsCheck();
})

editIconButton.on('click', function () {
    triggerWebflowSliderNavigationControl(
        getRegistrationFormNavigationControl(
            REQUEST_FORM_STEPS.VEHICLE_TYPE_STEP
        ));

    currentStepNumber = 0;
})

modalSubmitButton.on('click', function () {
    if (modalSubmitButtonEnabled === true) {
        updateSubmissionData();
        FINAL_FORM_DATA.email = emailField.val();
        formSubmissionCall();
        $('#email-overlay-wrap').css('display', 'none');
        $('#success-overlay').css('display', 'flex');
        $('body').attr('style', 'overflow: hidden !important');
        triggerGTMEvent('renterBulkRegSubmission')
    } else if (modalSubmitButton === false) {
        return false
    }
})

submitRequestButton.on('click', function () {
    var emailCookie = document.cookie.match(new RegExp('(^| )' + 'user-email' + '=([^;]+)'));
    if (emailCookie) {
        emailField.val(decodeURIComponent(emailCookie[2]))
        updateSubmissionData();
        formSubmissionCall();
        $('#success-overlay').css('display', 'flex');
        $('body').attr('style', 'overflow: hidden !important');
        triggerGTMEvent('renterBulkRegSubmission')
    }
    else {
        $('#email-overlay-wrap').css('display', 'flex');
        $('body').attr('style', 'overflow: hidden !important');
        disableModalSubmitButton();
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

    maskContainer.attr('style', 'height: 390px !important')
    sliderContainer.attr('style', 'height: 390px !important');

    vehicleTypeButtons.each(function () {
        $(this).css('background-color', '#FFFFFF');
        $(this).find('span').attr('style', 'color: #415077 !important');
        $(this).find('.v-type-icon').css('display', 'block');
        $(this).find('.v-type-icon.white').css('display', 'none');
    })


    $(this).attr('style', 'background-color: #415077 !important');
    $(this).find('span').attr('style', 'color: #FFFFFF !important');
    $(this).find('.v-type-icon').css('display', 'none');
    $(this).find('.v-type-icon.white').css('display', 'block');

    const vehicleType = $(this).attr('id').slice($(this).attr('id').indexOf('_') + 1);
    var vehicleTypeArray = VEHICLE_CATEGORIES[vehicleType];
    var option = '';
    console.log(vehicleType)
    for (var vehicleSubtypeKey in VEHICLE_CATEGORIES[vehicleType]) {
        console.log(`vehicle category key vehicleSubtypeKey: ${VEHICLE_CATEGORIES[vehicleType][vehicleSubtypeKey]}`)
        option += '<option value="' + VEHICLE_CATEGORIES[vehicleType][vehicleSubtypeKey] + '">' + vehicleSubtypeKey + '</option>';
    }

    // for (var i = 0; i < vehicleTypeArray.length; i++) {
    //     option += '<option value="' + vehicleTypeArray[i] + '">' + vehicleTypeArray[i] + '</option>';
    // }
    vehicleTypeDropdown.empty().append(option)

    FINAL_FORM_DATA.bulk_rental_vehicle_type = vehicleType

    // #region ------------- responsive changes start ---------
    if (windowWidth <= 992 && windowWidth >= 768) {
        maskContainer.attr('style', 'height: 290px !important');
        sliderContainer.attr('style', 'height: 290px !important');
    }

    if (windowWidth <= 767) {
        maskContainer.attr('style', 'height: 350px !important');
        sliderContainer.attr('style', 'height: 350px !important');
    }
    // #endregion responsive changes 
})

vehicleTypeDropdown.on('change', function () {
    storageCheckboxWrap.attr('style', 'display: none')
    console.log(vehicleTypeDropdown.val())
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

    if (vehicleTypeDropdown.val() == 'Dry Van Trailer' || vehicleTypeDropdown.val() == 'Refrigerated Trailer') {
        storageCheckboxWrap.attr('style', 'display: block')
        console.log('need storage')
    }


    // #endregion responsive changes 
})

fromDateField.on('change', function () {
    let year = fromDateField.val().slice(0, 4)
    let month = fromDateField.val().slice(5, 7)
    let day = fromDateField.val().slice(8, 10)
    let todayDate = new Date().toISOString().split('T')[0]
    FINAL_FORM_DATA.multi_rental_date_start = fromDateField.val()
    updateSummary(fromDateSummary, `${month}/${day}/${year}`)
    if (Date.parse(fromDateField.val()) < Date.parse(toDateField.val()) && Date.parse(fromDateField.val()) >= Date.parse(todayDate)) {
        enableNextStepButton();
        dateWarning.attr('style', "display: none");
    } else {
        disableNextStepButton();
        dateWarning.attr('style', "display: block");
    }
    fromDateField.val(`${month}/${day}/${year}`)
})

toDateField.on('change', function () {
    let year = toDateField.val().slice(0, 4)
    let month = toDateField.val().slice(5, 7)
    let day = toDateField.val().slice(8, 10)
    let todayDate = new Date().toISOString().split('T')[0]
    FINAL_FORM_DATA.multi_rental_date_start = toDateField.val()
    updateSummary(toDateSummary, `${month}/${day}/${year}`)
    if (Date.parse(fromDateField.val()) < Date.parse(toDateField.val()) && Date.parse(fromDateField.val()) >= Date.parse(todayDate)) {
        enableNextStepButton();
        dateWarning.attr('style', "display: none");
    } else {
        disableNextStepButton();
        dateWarning.attr('style', "display: block");
    }
    toDateField.val(`${month}/${day}/${year}`)
})

radiusDropdownField.on('change', function () {
    updateSummary(radiusSummary, radiusDropdownField.find(":selected").val())
    if (locationField.val()) {
        enableNextStepButton();
    }
})

locationField.on('change', function () {
    updateSummary(pickUpSummary, locationField.val())
    if (radiusDropdownField.val() && locationField.val()) {
        enableNextStepButton();
    }
})

/**
 * Gets data from fields and passes it to Object
 */
const updateSubmissionData = () => {
    FINAL_FORM_DATA.bulk_rental_vehicle_subtype = vehicleTypeDropdown.find(":selected").val()
    FINAL_FORM_DATA.daily_or_monthly_rate = dailyOrMonthlyRate.val();
    FINAL_FORM_DATA.vehicle_rate = vehicleRate.val();
    FINAL_FORM_DATA.vehicle_units = vehicleNumberField.val();
    FINAL_FORM_DATA.bulk_rental_location = locationField.val();
    FINAL_FORM_DATA.bulk_rental_radius_miles = radiusDropdownField.val();
    FINAL_FORM_DATA.bulk_rental_comment = commentField.val();
    FINAL_FORM_DATA.email = emailField.val();
    FINAL_FORM_DATA.firstname = firstNameField.val();
    FINAL_FORM_DATA.lastname = lastNameField.val();
    FINAL_FORM_DATA.company = yourCompanyField.val();
    FINAL_FORM_DATA.phone = phoneNumberField.val();
    FINAL_FORM_DATA.dot_number = dotField.val();
    FINAL_FORM_DATA.city = cityField.val();
    if (storageCheckbox.is(":checked")) {
        FINAL_FORM_DATA.bulk_rental_storage = 'yes'
    }
}


/**
 * Hubspot Form Submission API call
 */
async function formSubmissionCall() {
    // let requestURL = "https://api.hsforms.com/submissions/v3/integration/submit/3840745/8f60d2a1-bc0c-4ac6-a7cf-4bffeb9b3554"
    let requestURL = "https://api.coop.com/public/vehicles/bulk-rental"
    // let authToken = "Bearer pat-na1-d613ec32-87bc-4150-b471-4ee867e69c30"
    // let requestHeader = {
    //     "Authorization": authToken,
    //     "content-type": "application/json"
    // }
    // let API_POST_REQUEST_BODY = {
    //     "fields": [
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "multi_rental_date_start",
    //             "value": FINAL_FORM_DATA.multi_rental_date_start
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "email",
    //             "value": FINAL_FORM_DATA.email
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "multi_rental_date_to",
    //             "value": FINAL_FORM_DATA.multi_rental_date_to
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "bulk_rental_vehicle_type",
    //             "value": FINAL_FORM_DATA.bulk_rental_vehicle_type
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "bulk_rental_vehicle_subtype",
    //             "value": FINAL_FORM_DATA.bulk_rental_vehicle_subtype
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "bulk_rental_storage",
    //             "value": FINAL_FORM_DATA.bulk_rental_storage
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "daily_rate",
    //             "value": FINAL_FORM_DATA.daily_rate
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "daily_or_monthly_rate",
    //             "value": FINAL_FORM_DATA.daily_or_monthly_rate
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "vehicle_rate",
    //             "value": FINAL_FORM_DATA.vehicle_rate
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "vehicle_units",
    //             "value": FINAL_FORM_DATA.vehicle_units
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "bulk_rental_location",
    //             "value": FINAL_FORM_DATA.bulk_rental_location
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "bulk_rental_radius_miles",
    //             "value": FINAL_FORM_DATA.bulk_rental_radius_miles
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "bulk_rental_comment",
    //             "value": FINAL_FORM_DATA.bulk_rental_comment
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "full_name",
    //             "value": FINAL_FORM_DATA.full_name
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "firstname",
    //             "value": FINAL_FORM_DATA.firstname
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "lastname",
    //             "value": FINAL_FORM_DATA.lastname
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "company",
    //             "value": FINAL_FORM_DATA.company
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "phone",
    //             "value": FINAL_FORM_DATA.phone
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "dot_number",
    //             "value": FINAL_FORM_DATA.dot_number
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "city",
    //             "value": FINAL_FORM_DATA.city
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "utm_campaign",
    //             "value": utmCampaign
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "utm_source",
    //             "value": utmSource
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "utm_medium",
    //             "value": utmMedium
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "utm_content",
    //             "value": utmContent
    //         },
    //         {
    //             "objectTypeId": "0-1",
    //             "name": "utm_term",
    //             "value": utmTerm
    //         }
    //     ],
    //     "context": {
    //         "pageUri": "www.coop.com/multi-vehicle-request",
    //         "pageName": "Bulk Rental Form"
    //     }
    // }
    let API_POST_REQUEST_BODY = {
        "fields": {
            "multiRentalDateStart": FINAL_FORM_DATA.multi_rental_date_start,
            "multiRentalDateTo": FINAL_FORM_DATA.multi_rental_date_to,
            "email": FINAL_FORM_DATA.email,
            "bulkRentalVehicleType": FINAL_FORM_DATA.bulk_rental_vehicle_type,
            "bulkRentalVehicleSubtype": FINAL_FORM_DATA.bulk_rental_vehicle_subtype,
            "bulkRentalStorage": FINAL_FORM_DATA.bulk_rental_storage,
            "dailyOrMonthlyRate": FINAL_FORM_DATA.daily_or_monthly_rate,
            "vehicleRate": parseInt(FINAL_FORM_DATA.vehicle_rate),
            "vehicleUnits": parseInt(FINAL_FORM_DATA.vehicle_units),
            "bulkRentalLocation": FINAL_FORM_DATA.bulk_rental_location,
            "bulkRentalRadiusMiles": FINAL_FORM_DATA.bulk_rental_radius_miles,
            "bulkRentalComment": FINAL_FORM_DATA.bulk_rental_comment,
            "firstName": FINAL_FORM_DATA.firstname,
            "lastName": FINAL_FORM_DATA.lastname,
            "company": FINAL_FORM_DATA.company,
            "phone": FINAL_FORM_DATA.phone,
            "dotNumber": FINAL_FORM_DATA.dot_number,
            "city": FINAL_FORM_DATA.city,
            "utmCampaign": utmCampaign,
            "utmSource": utmSource,
            "utmMedium": utmMedium,
            "utmContent": utmContent,
            "utmTerm": utmTerm
        },
        "context": {
            "pageUri": "www.coop.com/multi-vehicle-request",
            "pageName": "Bulk Rental Form"
        }
    }
    if (hubspotCookieField.val()) {
        API_POST_REQUEST_BODY.context.hutk = hubspotCookieField.val();
    }
    try {
        const response = await fetch(requestURL, {
            method: "POST",
            body: JSON.stringify(API_POST_REQUEST_BODY),
            headers: {
                "content-type": "application/json"
            }
        })
        dataLayer.push({ 'event': 'renter_bulk_reg_submission' })
        const result = await response.json();
        console.log("Success:", result);
        console.log(API_POST_REQUEST_BODY)
    } catch (error) {
        console.error("Error:", error);
        console.log(API_POST_REQUEST_BODY)
    }
}


// --------------------------------- RESPONSIVENESS -----------------------------

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

storageCheckbox.on('click', function () {
    if (storageCheckbox.is(":checked")) {
        console.log('checked')
    }
})

storageCheckboxWrap.on('click', function () {
    if (storageCheckbox.is(":checked")) {
        console.log('checked')
    }
})

/**
 * Enables Next Step Button
 */
const enableNextStepButton = () => {
    nextStepButtonEnabled = true;
    nextStepButton.attr('style', 'background-color: #415077 !important')
}

const disableNextStepButton = () => {
    nextStepButtonEnabled = false;
    nextStepButton.attr('style', 'background-color: #8d969a !important')
}

const enableModalSubmitButton = () => {
    modalSubmitButtonEnabled = true;
    modalSubmitButton.attr('style', 'background-color: #f85731 !important')
}

const disableModalSubmitButton = () => {
    modalSubmitButtonEnabled = false;
    modalSubmitButton.attr('style', 'background-color: #8d969a !important')
}

$(multistepForm).on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        e.preventDefault();
        return false;
    }
});

/**
 *   const getUTMsFromURL = () => {
  let params = new URL(document.location).searchParams;
  let name = params.get("name"); // is the string "Jonathan Smith".
  let age = parseInt(params.get("age")); // is the number 18
}
 */

const validateEmail = (field) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (field.val().match(emailRegex)) {
        console.log('valid email')
        return true
    } else {
        console.log('invalid email')
        return false
    }
}

const validateDOT = (field) => {
    if (field.val().length >= 3 && field.val().length <= 7) {
        console.log('valid DOT')
        enableModalSubmitButton();
        return true
    } else if (field.val().length == 0) {
        console.log('valid DOT')
        enableModalSubmitButton();
        return true
    } else {
        console.log('invalid DOT')
        disableModalSubmitButton();
        return false
    }
}

const validatePhone = (field) => {
    if (field.val().length === 10) {
        console.log('valid Phone')
        return true
    } else {
        console.log('invalid Phone')
        return false
    }
}

const validateVehicleRate = (field) => {
    if (field.val().length > 0) {
        return true
    }
}

const allowOnlyNumbersToBeTyped = (evt) => {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

emailField.on('change', function () {
    validateEmail(emailField);
})

dotField.on('change', function () {
    if (validateDOT(dotField) && checkModalFields()) {
        enableModalSubmitButton();
    } else {
        disableModalSubmitButton();
    }
})

phoneNumberField.on('change', function () {
    validatePhone(phoneNumberField);
})

const checkModalFields = () => {
    let modalFieldsFilledOut = 0;
    requiredModalFields.each(function () {
        if ($(this).val()) {
            modalFieldsFilledOut++
        }
    })
    if (modalFieldsFilledOut === 5
        && validateEmail(emailField)
        && validatePhone(phoneNumberField)
    ) {
        enableModalSubmitButton();
        return true
    } else {
        modalFieldsFilledOut = 0;
        disableModalSubmitButton();
        return false
    }
}

$('#close-email').on('click', function () {
    $('#email-overlay-wrap').attr('style', 'display: none')
})

$('#new-request-btn').on('click', function () {
    window.location.reload()
})