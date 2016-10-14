# nothrow
Encapsulates typesafe deep object/array access.

The `nothrow`-mentality is based on the fact, that any kind of
input (data which is not created from our application) should
be considered evil. 99% of the time the interface might be
compatible to a naive implementation, but there is remaining risk
of our application to terminate unexpectedly.

```typescript
    // evil
    configService.setName(uncheckedServerData.configuration.name);

    // better, but boilerplate code
    configService.setName(
        uncheckedServerData
        && uncheckedServerData.configuration
        && uncheckedServerData.configuration.name
    );
    
    // nothrow approach
    configService.setName(nothrow(() => uncheckedServerData.configuration.name));
```

## Accessing deep structures problem

Expect that our application state has an array with persons and we want the name of the first person.
We could write
```typescript
    return state.persons[0].name;
```
and run into danger that either
the array is empty and there is no first person

`Uncaught TypeError: Cannot read property 'name' of undefined`

or the person array has not yet been initialized

`Uncaught TypeError: Cannot read property '0' of undefined`

or there is actually no state at all

`Uncaught TypeError: Cannot read property 'peoples' of undefined`

which forces us to write complex checks
as conditional access
```typescript
    return state && state.persons && state.persons[0] && state.persons[0].name;
```
or 'early return'
```typescript
    if(!state)
        return undefined;
    
    if(!state.persons)
        return undefined;
    
    if(!state.persons[0])
        return undefined;
    
    return state.persons[0].name;
```

## (other) Solutions

### lodash's `get` function?

```typescript
    return _.get(state, 'persons[0].name');
```

Works, but
1. typesafetyness is gone
2. refactoring impossible


### the `nothrow` way

We access structures via accessor function and `nothrow` guarantees that no exception is thrown,
no matter if you're accessing `null` or `undefined` via index or calling any non-existing functions. 

```typescript
    import {nothrow} from 'nothrow';
    
    // returns undefined
    return nothrow(() => state.people[0].name);
     
```