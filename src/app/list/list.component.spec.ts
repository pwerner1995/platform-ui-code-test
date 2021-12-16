import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;

  beforeEach(() => {
    component = new ListComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('unselected providers', () => {
    it('should have an initial length of 3', () => {
      expect(component.unselectedProviders.length).toEqual(3);
    });

    it('should have an id', () => {
      expect(component.unselectedProviders[0].id).toEqual('1');
    });

    it('should have a name', () => {
      expect(component.unselectedProviders[0].name).toEqual('John');
    });

    it('should have an address', () => {
      expect(component.unselectedProviders[0].address).toEqual('123 Greenway Blvd');
    });

    it('should have a phone', () => {
      expect(component.unselectedProviders[0].phone).toEqual('8991234321');
    });
  });

  describe('selected providers', () => {
    it('should have no initial length', () => {
      expect(component.selectedProviders.length).toEqual(0);
    });
  });

  describe('selectProvider', () => {

    it('should add a provider to selectedProviders', () => {
      const provider = {
          id: '1',
          name: 'Peter',
          address: '111 Valley Rd',
          phone: '1234567'
      };

      component.selectProvider(provider);

      expect(component.selectedProviders.length).toEqual(1);
    });
});

describe('removeProvider', () => {

    it('should remove a provider from selectedProviders', () => {
      component.selectedProviders = [
          {
            id: '1',
            name: 'Peter',
            address: '111 Valley Rd',
            phone: '1234567'
          }
      ];

      const provider = component.selectedProviders[0];

      component.removeProvider(provider);

      expect(component.selectedProviders.length).toEqual(0);
    });
});

describe('saveLocally', () => {

    it('should save data into local storage', () => {
      const localStore = {};
      component.selectedProviders = [];
      component.unselectedProviders = [
        {
          id: '1',
          name: 'John',
          address: '123 Greenway Blvd',
          phone: '8991234321'
        },
        {
          id: '2',
          name: 'Mary',
          address: '443 Windwhisper Road',
          phone: '2233211903'
        },
        {
          id: '3',
          name: 'Jason',
          address: '9992 Pumpkin Hollow',
          phone: '4343219384'
        }
      ];

      spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
          return localStore[key] = value;
      });

      spyOn(localStorage, 'getItem').and.callFake(function (key) {
          return localStore[key];
      });

      component.saveProviderLists();

      const local_selectedProviders   = JSON.parse(localStorage.getItem('selectedProviders'));
      const local_unselectedProviders = JSON.parse(localStorage.getItem('unselectedProviders'));

      expect(local_selectedProviders.length).toEqual(component.selectedProviders.length);
      expect(local_unselectedProviders.length).toEqual(component.unselectedProviders.length);

    });
});

});
