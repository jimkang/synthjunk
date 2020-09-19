export function nestPropDefs(propDefs) {
  var groups = [];
  propDefs.forEach(putInGroup);
  return groups;

  function putInGroup(propDef) {
    var keyPropName;

    if (propDef.conditionProp) {
      keyPropName = propDef.conditionProp;
    } else {
      keyPropName = propDef.propName;
    }

    let group = findInGroups(keyPropName);
    if (!group) {
      group = {
        keyPropName,
        displayName: propDef.displayName,
        dependents: []
      };
      groups.push(group);
    }
    // A key property goes into its own group's
    // dependents list.
    group.dependents.push(propDef);
  }

  function findInGroups(keyPropName) {
    return groups.find(groupKeyMatchesCondition);

    function groupKeyMatchesCondition(group) {
      return group.keyPropName === keyPropName;
    }
  }
}
