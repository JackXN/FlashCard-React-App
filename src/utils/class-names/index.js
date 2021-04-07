/**
 * Use this function to dynamically assign the className property of react components.
 *
 * Usage:
 *
 *  <span className={classNames({
 *               "oi": true,
 *               "oi-media-play": currentState.isPaused,
 *               'oi-media-pause': !currentState.isPaused
 *             })}/>
 *
 *   if currentState.isPaused === true, the className will be "oi oi-media-play" otherwise it will be "oi oi-media-pause"
 *
 * @param classNameToBoolean
 *    a map of a class name to a boolean value. If the boolean value is `true`, the class name is included, otherwise it is excluded.
 * @returns {string}
 *    a space delimited string of the class names which have a value of `true`.
 */
export default function classNames(classNameToBoolean) {
  return Object.entries(classNameToBoolean)
    .reduce(
      (classes, [className, value]) =>
        classes.concat(value ? className : undefined),
      []
    )
    .filter((className) => className !== undefined)
    .join(" ");
}
