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
    hutk: ''
}

/**
 * An object with arrays for the different vehicle types,
 * used to populate the dropdown once the user selects a Vehicle Type
 */
const VEHICLE_CATEGORIES = {
    'truck': [
        'CDL Refrigerated Straight Truck',
        'CDL Straight Truck',
        'Flatbed Truck',
        'Non-CDL Refrigerated Straight Truck',
        'Non-CDL Straight Truck',
        'Refrigerated Small Box Truck',
        'Small Box Truck',
        'Stakebody Truck',
        'Specialty'
    ],
    'tractor': [
        'Single Axle Daycab',
        'Tandem Axle Daycab',
        'Tandem Axle Sleeper',
        'Specialty'
    ],
    'trailer': [
        'Dry Van',
        'Flatbed',
        'Refrigerated Trailer',
        'Specialty',
        'Chassis'
    ],
    'van': [
        'Refrigerated Sprinter Van',
        'Sprinter Van',
        'Specialty'
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

/**
 * Reference to the 'Back' button
 */
const previousStepButtonSelector = '#btn-previous-step';

const previousStepButton = $(previousStepButtonSelector);

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

let vehicleNumber = 0;

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
 * A reference to the 'Radius' field
 */
const radiusField = $('#radius-field', locationStep);


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
function getHubspotCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        hubspotCookieField.val(`${match[2]}`);
        FINAL_FORM_DATA.hutk = match[2];
    }
    else {
        console.log('--something went wrong---');
    }
}

getHubspotCookie('hubspotutk');

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
    if (stepNumber < 1) {
        makeSlideBigger();
        showNextStepButton();
    } else if (stepNumber > 0 && stepNumber < 4) {
        makeSlideSmaller();
        showNextStepButton();
    } else if (stepNumber === 4) {
        console.log('final step reached');
        showSubmitButton();
    }
}

const showSubmitButton = () => {
    nextStepButton.css('display', "none");
    submitRequestButton.css('display', 'block');
}

const showNextStepButton = () => {
    nextStepButton.css('display', "block");
    submitRequestButton.css('display', 'none');
}

const makeSlideBigger = () => {
    maskContainer.css('height', '500px');
    sliderContainer.attr('style', 'height: 500px !important');
    previousStepButton.css('display', 'none');
}

const makeSlideSmaller = () => {
    maskContainer.css('height', '290px');
    sliderContainer.attr('style', 'height: 290px !important');
    previousStepButton.css('display', 'flex');
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
 * Goes to the Request Form "Vehicle Type" step.
 */
const goToVehicleTypeStep = () => {
    triggerWebflowSliderNavigationControl(getRegistrationFormNavigationControl(REQUEST_FORM_STEPS.VEHICLE_TYPE_STEP));
};

/**
 * Goes to the Request Form "Vehicle Number" step.
 */
const goToVehicleNumberStep = () => {
    triggerWebflowSliderNavigationControl(getRegistrationFormNavigationControl(REQUEST_FORM_STEPS.VEHICLE_NUMBER_STEP));
};

/**
 * Goes to the Request Form "Date" step.
 */
const goToDateStep = () => {
    triggerWebflowSliderNavigationControl(getRegistrationFormNavigationControl(REQUEST_FORM_STEPS.DATE_STEP));
};

/**
 * Goes to the Request Form "Location" step.
 */
const goToLocationStep = () => {
    triggerWebflowSliderNavigationControl(getRegistrationFormNavigationControl(REQUEST_FORM_STEPS.LOCATION_STEP));
};

/**
 * Goes to the Request Form "Comment" step.
 */
const goToCommentStep = () => {
    triggerWebflowSliderNavigationControl(getRegistrationFormNavigationControl(REQUEST_FORM_STEPS.COMMENT_STEP));
};

/**
 * Gets name of the step from it's number.
 */
const getStepNameByNumber = (obj, value) =>
    Object.keys(obj).find(key => obj[key] === value);

// --------------------------------- HANDLERS ---------------------------------

/**
 * Handles 'Next Step' button click
 */
nextStepButton.on('click', function () {
    if (currentStepNumber >= 0 && currentStepNumber <= 3) {
        goToNextStep(currentStepNumber);
        currentStepNumber++;
    }
    checkCurrentStep(currentStepNumber);
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
    vehicleNumber++;
    vehicleNumberField.val(vehicleNumber);
})

decreaseVehicleNumberButton.on('click', function () {
    if (vehicleNumber > 0) {
        vehicleNumber--;
        vehicleNumberField.val(vehicleNumber);
    }
})

editIconButton.on('click', function () {
    triggerWebflowSliderNavigationControl(
        getRegistrationFormNavigationControl(
            REQUEST_FORM_STEPS.VEHICLE_TYPE_STEP
        ));

    currentStepNumber = 0;
})

submitRequestButton.on('click', function () {
    updateSubmissionData();
    formSubmissionCall();
    formSubmitButton.trigger('click');
})

/**
 * Handles clicks on one of the Vehicle Type options
 */

vehicleTypeButtons.on('click', function () {
    const vehicleType = $(this).attr('id').slice($(this).attr('id').indexOf('_') + 1);
    var vehicleTypeArray = VEHICLE_CATEGORIES[vehicleType];
    var option = '';
    for (var i = 0; i < vehicleTypeArray.length; i++) {
        option += '<option value="' + vehicleTypeArray[i] + '">' + vehicleTypeArray[i] + '</option>';
    }
    vehicleTypeDropdown.empty().append(option)

    FINAL_FORM_DATA.bulk_rental_vehicle_type = vehicleType
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
    FINAL_FORM_DATA.bulk_rental_radius_miles = radiusField.val();
    FINAL_FORM_DATA.bulk_rental_comment = commentField.val();

    console.log(FINAL_FORM_DATA);
}


/**
 * Hubspot Form Submission API call
 */
async function formSubmissionCall() {
    try {
      const response = await fetch("https://api.hsforms.com/submissions/v3/integration/submit/3840745/fa312bc2-e466-4ff5-9225-ebca231883c2", {
        method: "POST",
        body: JSON.stringify({
            "fields": [
                {
                    "objectTypeId": "0-1",
                    "name": "multi_rental_date_start",
                    "value": FINAL_FORM_DATA.multi_rental_date_start
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
                "hutk": FINAL_FORM_DATA.hutk, // include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
                "pageUri": "www.coop.com/multi-vehicle-request",
                "pageName": "Bulk Rental Form"
            }
        }),
        headers: {
            "Authorization": "Bearer pat-na1-d613ec32-87bc-4150-b471-4ee867e69c30",
            "content-type": "application/json"
        }
    })
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }


console.log("%cMultistep Form Code Loaded", "color: blue; font-size: 20px");