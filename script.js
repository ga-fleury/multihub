/**
 * A enum-like structure to make it easier to reference the indexes of the different
 * steps on the Registration Form slider/carousel.
 */

// An 'empty step' has been added because Webflow will always skip the first step
const REQUEST_FORM_STEPS = {
    VEHICLE_TYPE_STEP: 0,
    VEHICLE_NUMBER_STEP: 1,
    DATE_STEP: 2,
    LOCATION_STEP: 3,
    COMMENT_STEP: 4
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
const multistepForm = $('#hubspot-multistep-form', requestFormContainer);


// ------------------------ STEP 1 FIELDS (Vehicle Type) -----------------------------

/**
 * A reference to the DOM container of the elements on the step for vehicle type.
 */
const vehicleTypeStep = $('#vehicle-type-step', requestFormContainer);

/**
 * A reference to the 'Truck' vehicle type button
 */
const vehicleTypeTruckButton = $('#btn-v-type-truck', vehicleTypeStep);

/**
 * A reference to the 'Tractor' vehicle type button
 */
const vehicleTypeTractorButton = $('#btn-v-type-tractor', vehicleTypeStep);

/**
 * A reference to the 'Tractor' vehicle type button
 */
const vehicleTypeTrailerButton = $('#btn-v-type-trailer', vehicleTypeStep);

/**
 * A reference to the 'Van' vehicle type button
 */
const vehicleTypeVanButton = $('#btn-v-type-van', vehicleTypeStep);

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
    format: 'mm-dd-yyyy'
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
 * 
 */
const checkCurrentStep = (stepNumber) => {
    if (stepNumber < 1) {
        makeSlideBigger();
        transformNextStepButton();
    } else if (stepNumber > 0 && stepNumber < 4) {
        makeSlideSmaller();
        transformNextStepButton();
    } else if (stepNumber === 4) {
        makeSlideSmaller();
        transformtSubmitButton();
    }
}

const transformtSubmitButton = () => {
    nextStepButton.css('background-color', "#F85731");
    nextStepButton.innerHTML('Submit Request');
}

const transformNextStepButton = () => {
    nextStepButton.css('background-color', "#415077");
    nextStepButton.innerHTML('Next Step');
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


console.log("%cMultistep Form Code Loaded", "color: blue; font-size: 20px");