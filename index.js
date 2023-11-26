// Menu App Greeting Message
alert('Welcome! Here you can create you own CareBear Club');

// After a CareBear has been created and named, this class opens an other menu where the CareBear's appearance can be made. To make the appearance user must indicate what symbol is on the bears tummy and the overall color of the bear. You can also delete the appearance details with use of the index.
class Appearance {
    constructor(bellyBadge, color) {
        this.bellyBadge = bellyBadge;
        this.color = color;
    }
    describe() {       // A message that appears to show what characteristics this carebear has
        return `Their tummy symbol is: ${this.bellyBadge} \n Their color is: ${this.color}`;
    }
}

// Second class which contains array that holds apperance class elements
class CareBear {
    constructor(name) {
        this.name = name;
        this.apperances = [];
    }

// Functionality to add elements into the array
    addApperance(apperance) {
        // checking to see if the appearance belongs to the Appearance class or constructor 
        if (apperance instanceof Appearance) {      
            // pushes the new apperance details into the array index
            this.apperances.push(apperance);        
        } else {
            throw new Error(`You can only add an instance of Appearance. Argument is not a characteristic: ${apperance}`);   
            // if incorrect data type is enter  by user it will throw this error
        }
    }
    describe() {
        return `${this.name} has ${this.apperances.length} set of physical attributes, they are:`;
    }
}

// This is the driving force of the application and input
class Menu {   
    constructor() {
        this.careBears = [];
        // This allows for managing one Care Bear at a time
        this.selectedCareBear = null;  
    }

    // this creates the entry point of the application 
    start() {    
        let selection = this.showMainMenuOptions();

        // These are the menu options to choose from 
        while(selection != 0) {
            switch (selection) {
                case '1':
                    this.createCareBear();
                    break;
                case '2':
                    this.viewCareBear();
                    break;
                case '3':
                    this.deleteCareBear();
                    break;
                case '4':
                    this.displayCareBears();
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        // The closing message - It's the CareBear motto! 
        alert('Caring is what counts!');
    }
    
    // What the menu options to choose from are
    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new CareBear
            2) view CareBear
            3) delete CareBear
            4) display all CareBears
        `);
    }

    // The appearance menu options to choose
    showCareBearMenuOptions(careBearInfo) {
        return prompt(`
         0) back
         1) create appearance
         2) delete appearance
         --------------------
         ${careBearInfo}
        `);
    }

    // Allows to see the CareBears that have been created 
    displayCareBears() {
        let careBearString = '';
        for (let i = 0; i < this.careBears.length; i++) {
            careBearString += i + ') ' + this.careBears[i].name + '\n';
        }
        alert(careBearString);
    }
    // To create a CareBear 
    createCareBear() {
        let name = prompt('Enter name for your new CareBear:');
        this.careBears.push(new CareBear(name));
    }
    
    // To see an individual CareBear and opens the bears appearance options (must know the bear's array index location)
    viewCareBear() {
        let index = prompt('Enter the index of the CareBear you wish to view: ');
        if (index > -1 && index < this.careBears.length) {
            this.selectedCareBear = this.careBears[index];
            let description = ' CareBear Name: ' + this.selectedCareBear.name + '\n';
            description += ' ' + this.selectedCareBear.describe() + '\n';
            for (let i = 0; i < this.selectedCareBear.apperances.length; i++) {
                description += i + ')' + this.selectedCareBear.apperances[i].describe() + '\n';
            }
            let selection1 =  this.showCareBearMenuOptions(description);
            switch (selection1) {
                case '1':
                    this.createAppearance();
                    break;
                case '2':
                    this.deleteAppearance();
            }
        }
    }

    // If you want to delete a CareBear that you have created 
    deleteCareBear() {
        let index = prompt('Enter the index of the CareBear you wish to delete: ');
        if (index > -1 && index < this.careBears.length) {
            this.careBears.splice(index, 1);
        }
    }

    // To adjust the CareBear's overall appearance (belly symbol and color)
    createAppearance() {
        let bellyBadge = prompt('Enter what belly badge your CareBear should have: ');
        let color = prompt('Enter the color of your new CareBear ');
        this.selectedCareBear.apperances.push(new Appearance(bellyBadge, color));
        //this.selectedCareBear.addCareBear(new Appearance(bellyBadge, color));
    }

    // To delete the appearance you have already created
    deleteAppearance() {
        let index = prompt('Enter the index of the appearance you wish to delete: ');
        if (index > -1 && index < this.selectedCareBear.apperances.length) {
            this.selectedCareBear.apperances.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();