//=============================================================================
// VisuStella MZ - Elements & Status Menu Core
// VisuMZ_1_ElementStatusCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ElementStatusCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ElementStatusCore = VisuMZ.ElementStatusCore || {};
VisuMZ.ElementStatusCore.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.14] [ElementStatusCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Elements_and_Status_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Elements & Status Menu Core plugin gives you more control over in-game
 * elemental rate calculations, providing Trait Sets to streamline assigning
 * elements to actors and enemies, and updating the Status Menu to display all
 * that information properly.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Element Rate control from target side and user side.
 * * Elemental Absorption and Elemental Reflection added.
 * * Assign items and skills to have multiple elements.
 * * Elemental rates can be adjusted from additive and multiplicative notetags.
 * * Forcing Elemental Rates and nullifying Elemental properties.
 * * Trait Sets added to mass assign traits through the usage of notetags.
 * * Trait Sets used to assign Elements, SubElements, Genders, Races, Natures,
 *   Alignments, Blessings, Curses, Zodiacs, and Variants.
 * * Randomized Trait Sets with weights to make enemies more dynamic.
 * * The ability to change traits midway through the game by Plugin Commands.
 * * Updated Status Menu Layout to display all this new information.
 * * Control over the information category tabs in the Status Menu.
 * * Change up the actor's Biography midway through the game by Plugin Command.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Element Damage Calculation
 *
 * - Elemental damage was calculated in one very specific way in RPG Maker MZ:
 * getting the target's elemental resistance found across various database
 * objects and applying the damage to that rate. This plugin extends that by
 * giving more ways to extend the target's elemental damage rate as add in a
 * facet which introduces the attacker's elemental bonus damage, too.
 *
 * ---
 *
 * Multi-Elemental Calculation
 *
 * - By default in RPG Maker MZ, if there are multiple elements assigned to an
 * action, then the element with the highest rate is taken. This plugin will
 * give you, the game dev, the decision on how this is handled: the default
 * maximum rate, a minimum rate, a multiplicative product, an additive sum, or
 * an average of all the elemental rates calculated.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Element-Related Notetags ===
 *
 * The following are element-related notetags.
 *
 * ---
 *
 * <Multi-Element: x>
 * <Multi-Element: x,x,x>
 *
 * <Multi-Element: name>
 * <Multi-Element: name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - Gives this action an additional element (alongside the Damage element)
 *   when calculating damage.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <Multi-Element Rule: Maximum>
 * <Multi-Element Rule: Minimum>
 * <Multi-Element Rule: Multiply>
 * <Multi-Element Rule: Additive>
 * <Multi-Element Rule: Average>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the multi-element ruling for this action to either 'Maximum',
 *   'Minimum', 'Multiply', 'Additive', or 'Average'.
 * - If this notetag is not used, refer to the default ruling set by the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Force Action Element: Null>
 *
 * <Force Action Element: x>
 * <Force Action Element: x,x,x>
 *
 * <Force Action Element: name>
 * <Force Action Element: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces any actions performed by this unit to be the specific element(s).
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - If multiples of this notetag are found across various Database objects,
 *   priority will go in the order of states, actor, enemy, class, equips.
 *
 * ---
 *
 * <Force Received Element id Rate: x%>
 * <Force Received Element id Rate: x.x>
 *
 * <Force Received Element name Rate: x%>
 * <Force Received Element name Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the unit to receive elemental damage at x multiplier.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <Received Element id Plus: +x%>
 * <Received Element id Plus: +x.x>
 *
 * <Received Element name Plus: +x%>
 * <Received Element name Plus: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Received Element id Rate: x%>
 * <Received Element id Rate: x.x>
 *
 * <Received Element name Rate: x%>
 * <Received Element name Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage multiplicatively after applying plus
 *   and before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 *
 * ---
 *
 * <Received Element id Flat: +x%>
 * <Received Element id Flat: +x.x>
 *
 * <Received Element name Flat: +x%>
 * <Received Element name Flat: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Dealt Element id Plus: +x%>
 * <Dealt Element id Plus: +x.x>
 *
 * <Dealt Element name Plus: +x%>
 * <Dealt Element name Plus: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Dealt Element id Rate: x%>
 * <Dealt Element id Rate: x.x>
 *
 * <Dealt Element name Rate: x%>
 * <Dealt Element name Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage multiplicatively after applying plus and
 *   before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 *
 * ---
 *
 * <Dealt Element id Flat: +x%>
 * <Dealt Element id Flat: +x.x>
 *
 * <Dealt Element name Flat: +x%>
 * <Dealt Element name Flat: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Element Absorb: x>
 * <Element Absorb: x,x,x>
 *
 * <Element Absorb: name>
 * <Element Absorb: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Gives the unit the ability to absorb damage from element.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to absorb more elements.
 * - Absorption is calculated after all other element rates have been made.
 *
 * ---
 *
 * <Element Reflect: x>
 * <Element Reflect: x,x,x>
 *
 * <Element Reflect: name>
 * <Element Reflect: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Gives the unit the ability to reflect damage from element.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to reflect more elements.
 * - Reflection occurs before any damage is calculated and dealt.
 * - Elemental Reflection will take priority over Magic Reflection.
 *
 * ---
 *
 * <Bypass Element Reflect>
 *
 * - Used for: Skill, Item Notetags
 * - Makes this skill/item unable to be reflected by Element Reflect effect.
 *
 * ---
 *
 * === JavaScript Notetags: Element-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine dynamic element-related effects.
 *
 * ---
 *
 * <JS Force Received Element id Rate: code>
 * <JS Force Received Element name Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the unit to receive elemental damage at a code-determined rate.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Received Element id Plus: code>
 * <JS Received Element name Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Received Element id Rate: code>
 * <JS Received Element name Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively after applying plus and
 *   before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Received Element id Flat: code>
 * <JS Received Element name Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Dealt Element id Plus: code>
 * <JS Dealt Element name Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Dealt Element id Rate: code>
 * <JS Dealt Element name Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively after applying plus and
 *   before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Dealt Element id Flat: code>
 * <JS Dealt Element name Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * === Trait Set Notetags ===
 *
 * Trait Sets are used to apply various properties to actor and enemy units as
 * a whole depending on what the trait set is. Use the following notetags to
 * determine how to properly assign the desired Trait Set.
 *
 * WARNING: Trait Sets only work if they are enabled in the Plugin Parameters:
 * ElementStatusCore => General Trait Set Settings => Enable Trait Sets?
 *
 * ---
 *
 * <Element: name>
 * <SubElement: name>
 * <Gender: name>
 * <Race: name>
 * <Nature: name>
 * <Alignment: name>
 * <Blessing: name>
 * <Curse: name>
 * <Zodiac: name>
 * <Variant: name>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the specific Trait Set(s) for the actor or enemy unit.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - If any of these notetags are unused, the Trait Set will default to the one
 *   determined in the Plugin Parameters.
 *
 * Examples:
 *
 * <Element: Fire>
 * <SubElement: Thunder>
 * <Gender: Male>
 * <Nature: Jolly>
 * <Alignment: Chaotic Good>
 * <Zodiac: Aries>
 *
 * ---
 *
 * <Trait Sets>
 *  Element:    name
 *  SubElement: name
 *  Gender:     name
 *  Race:       name
 *  Nature:     name
 *  Alignment:  name
 *  Blessing:   name
 *  Curse:      name
 *  Zodiac:     name
 *  Variant:    name
 * </Trait Sets>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the Trait Set(s) for the actor or enemy unit.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - You may remove the Trait Set types (ie. Blessing and Curse) that you don't
 *   want to assign anything to from the list.
 * - If any of these sets are unused, the Trait Set will default to the one
 *   determined in the Plugin Parameters.
 *
 * Example:
 *
 * <Trait Sets>
 *  Element:    Fire
 *  SubElement: Thunder
 *  Gender:     Male
 *  Nature:     Jolly
 *  Alignment:  Chaotic Good
 *  Zodiac:     Aries
 * </Trait Sets>
 *
 * ---
 *
 * <Random type>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Random type>
 *
 * - Used for: Actor, Enemy Notetags
 * - Assigns a random Trait Set for this Trait Set 'type'.
 * - Replace 'type' with 'Element', 'SubElement', 'Gender', 'Race', 'Nature',
 *   'Alignment', 'Blessing', 'Curse', 'Zodiac', or 'Variant' depending on
 *   which you're trying to randomize.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - This would bypass the innate settings determined in the Plugin Parameters.
 *
 * Examples:
 *
 * <Random Gender>
 *  Male: 75
 *  Female: 25
 * </Random Gender>
 * 
 * <Random Variant>
 *  Mighty: 10
 *  Major: 20
 *  Greater: 60
 *  Normal: 200
 *  Lesser: 10
 *  Minor
 *  Puny
 * </Random Variant>
 *
 * ---
 *
 * <No Random Trait Sets>
 *
 * - Used for: Actor, Enemy Notetags
 * - Prevents random Trait Sets from being assigned to this actor/enemy unit.
 *
 * ---
 *
 * <Trait Set Name Format>
 *  text
 * </Trait Set Name Format>
 *
 * - Used for: Enemy Notetags
 * - Enemy names can be affected by the Trait Sets they have. Replace 'text'
 *   with the format you wish to see them have.
 * - Insert [Name] into 'text' to determine where the enemy's name goes.
 * - Insert [Letter] into 'text' to determine where the enemy's letter goes.
 * - Insert [Element] into 'text' to determine where the format text goes.
 * - Insert [SubElement] into 'text' to determine where the format text goes.
 * - Insert [Gender] into 'text' to determine where the format text goes.
 * - Insert [Race] into 'text' to determine where the format text goes.
 * - Insert [Nature] into 'text' to determine where the format text goes.
 * - Insert [Alignment] into 'text' to determine where the format text goes.
 * - Insert [Blessing] into 'text' to determine where the format text goes.
 * - Insert [Curse] into 'text' to determine where the format text goes.
 * - Insert [Zodiac] into 'text' to determine where the format text goes.
 * - Insert [Variant] into 'text' to determine where the format text goes.
 * 
 * Example:
 *
 * <Trait Set Name Format>
 *  [Alignment] [Nature] [Element] [Name][Gender] [Letter]
 * </Trait Set Name Format>
 *
 * ---
 *
 * <traitname Battler Name: filename>
 *
 * <traitname Battler Names>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Battler Names>
 *
 * - Used for: Enemy Notetags
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'traitname' with the name of the Trait Set (ie. Male, Female).
 * - Replace 'filename' with the battler graphic to associate with that
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 *   Trait Set.
 *
 * Examples:
 *
 * <Male Battler Name: Spider1>
 * <Female Battler Name: Spider2>
 *
 * <Male Battler Names>
 *  Rogue: 25
 *  Fighter: 10
 *  Warrior
 * </Male Battler Names>
 *
 * ---
 *
 * <traitname Battler Hue: x>
 *
 * <traitname Battler Hues>
 *  x: weight
 *  x: weight
 *  x: weight
 * </traitname Battler Hues>
 *
 * - Used for: Enemy Notetags
 * - Allows certain Trait Sets to cause battlers to use a different hue.
 * - Replace 'traitname' with the name of the Trait Set (ie. Male, Female).
 * - Replace 'x' with a number from 0 to 360 depicting the hue to become.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 *
 * Examples:
 *
 * <Male Battler Hue: 160>
 * <Female Battler Hue: 275>
 *
 * <Female Battler Hues>
 *  275: 10
 *  325: 5
 *  345
 * </Female Battler Hues>
 *
 * ---
 * 
 * <Equip Trait Requirement: name>
 * <Equip Trait Requirement: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Makes this piece of equipment equippable by only actors with those traits.
 * - If there are multiple traits required, all of them have to be met.
 * - If multiple trait types share the same trait name, the listed name will
 *   count for all of them.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Changing trait sets mid-game will remove unmatched traits.
 * - Usage Example: <Equip Trait Requirement: Female> makes the item only
 *   equippable by female actors as long as they are tagged as female.
 * 
 * ---
 *
 * === Actor Biography Notetag ===
 *
 * The following notetag is used for the Status Menu if the updated Status Menu
 * Layout option has been enabled from the Plugin Parameters.
 *
 * ---
 *
 * <Biography>
 *  text
 *  text
 *  text
 * </Biography>
 *
 * - Used for: Actor Notetags
 * - Determines the actor's biography shown in the Status Menu.
 * - Replace 'text' with the text intended.
 * - Text Codes are allowed.
 * - The biography can be changed mid-game through Plugin Commands.
 * - If this notetag isn't used, then the actor's profile message is displayed
 *   as the biography.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Biography (Group)
 * Actor: Change Biography (Range)
 * Actor: Change Biography (JS)
 * - Changes the biography of the selected actor(s).
 * - Each version has a different means of selecting Actor ID's.
 * 
 *   Step 1: Target ID
 *   - Select which Actor ID(s) to affect.
 *
 *   Step 2: Biography
 *   - Change the biography for target actor(s) to this.
 *   - Text codes allowed. 
 *   - %1 - Actor's name.
 *
 * ---
 *
 * Actor: Change Trait Sets (Group)
 * Actor: Change Trait Sets (Range)
 * Actor: Change Trait Sets (JS)
 * - Changes the Trait Set(s) of the selected actor(s).
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Target ID
 *   - Select which Actor ID(s) to affect.
 *
 *   Step 2: Change Trait Set
 *   - Element
 *   - SubElement
 *   - Gender
 *   - Race
 *   - Nature
 *   - Alignment
 *   - Blessing
 *   - Curse
 *   - Zodiac
 *   - Variant
 *     - Change to the name of the Trait Set to switch actor(s) to.
 *     - "Unchanged" to leave alone.
 *     - "Random" to randomize.
 *       - Random will use the random pool dictated by the Plugin Parameters
 *         and the Trait Set weights determined there as well.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Trait Sets (Group)
 * Enemy: Change Trait Sets (Range)
 * Enemy: Change Trait Sets (JS)
 * - Changes the Trait Set(s) of the selected enemy(ies).
 * - Each version has a different means of selecting Enemy Indexes.
 *
 *   Step 1: Target ID
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Change Trait Set
 *   - Element
 *   - SubElement
 *   - Gender
 *   - Race
 *   - Nature
 *   - Alignment
 *   - Blessing
 *   - Curse
 *   - Zodiac
 *   - Variant
 *     - Change to the name of the Trait Set to switch target(s) to.
 *     - "Unchanged" to leave alone.
 *     - "Random" to randomize.
 *       - Random will use the random pool dictated by the Plugin Parameters
 *         and the Trait Set weights determined there as well.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Element Rulings
 * ============================================================================
 *
 * These Plugin Parameters control the rulings for Element-related mechanics.
 * These play an important part in determine what to do when multiple elements
 * are present, how to calculate the elemental rates, and 
 *
 * ---
 *
 * Rulings
 * 
 *   Multi-Element Ruling:
 *   - Ruling on how to calculate element rate when there are  multiple
 *     elements used for damage calculation.
 *     - Maximum (largest rate of all elements)
 *     - Minimum (smallest rate of all elements)
 *     - Multiplicative (product of all elements used)
 *     - Additive (sum of all elements used)
 *     - Average (of all the elements used)
 * 
 *   JS: Maximum Rate:
 *   - Determine how maximum element rate is calculated.
 * 
 *   JS: Minimum Rate:
 *   - Determine how minimum element rate is calculated.
 * 
 *   JS: Multiply Rate:
 *   - Determine how a multiplied element rate is calculated.
 * 
 *   JS: Additive Rate:
 *   - Determine how an additive element rate is calculated.
 * 
 *   JS: Average Rate:
 *   - Determine how an average element rate is calculated.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Received Rate:
 *   - Determine how the element rate for the receiving target is calculated.
 * 
 *   JS: Finalize Rate:
 *   - Determine how the finalized element rate before damage is calculated.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Menu Settings
 * ============================================================================
 *
 * The Status Menu Settings determine how the Status Menu appears and the
 * various objects that exist within it. The option to update it to a more
 * updated menu also exists, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Status Menu Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the
 *     menu scene layout?
 *     - Upper Help, Top Category
 *     - Upper Help, Bottom Category
 *     - Lower Help, Top Category
 *     - Lower Help, Bottom Category
 * 
 *   Trait Set Font Size:
 *   - The font size used for Trait Set Descriptions.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Category Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Category Window.
 *
 * ---
 *
 * Displayed Parameters
 * 
 *   Column 1:
 *   Column 2:
 *   Column 3:
 *   - A list of the parameters that will be displayed in column 1.
 *   - Basic Parameters (ie. MaxHP, ATK, LUK)
 *   - X Parameters (ie. HIT, EVA, CRI)
 *   - S Parameters (ie. PDR, MDR, EXR)
 *
 * ---
 *
 * Elements
 * 
 *   Excluded Elements:
 *   - These element ID's are excluded from the Status Menu list.
 * 
 *   IDs: Column 1:
 *   IDs: Column 2:
 *   - The list of element ID's to show in column 1/2.
 *   - If neither column has ID's, list all elements.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Biography:
 *   - Vocabulary for 'Biography'.
 * 
 *   Damage: Absorb:
 *   - Vocabulary for 'Damage: Absorb'.
 * 
 *   Damage: Received:
 *   - Vocabulary for 'Damage: Received'.
 * 
 *   Damage: Dealt:
 *   - Vocabulary for 'Damage: Dealt'.
 * 
 *   Skill Types:
 *   - Vocabulary for 'Skill Types'.
 * 
 *   Weapon Types:
 *   - Vocabulary for 'Weapon Types'.
 * 
 *   Armor Types:
 *   - Vocabulary for 'Armor Types'.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Menu Categories
 * ============================================================================
 *
 * These Plugin Parameters allow you, the game dev, to add new categories to
 * the Status Menu as you please, and change up how the information is found
 * and displayed within the Status Menu. This will only apply if the Updated
 * Status Menu Layout is enabled.
 *
 * ---
 *
 * Category
 * 
 *   Symbol:
 *   - Symbol used for this category.
 * 
 *   Icon:
 *   - Icon used for this category.
 *   - Use 0 for no icon.
 * 
 *   Text:
 *   - Text name used for this category.
 * 
 *   JS: Draw Data:
 *   - Code used to determine what appears in the data window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Trait Set Settings
 * ============================================================================
 *
 * Trait Sets are new properties added to RPG Maker MZ through this plugin.
 * They're used to streamline the process of applying traits to actors and
 * enemies through the database.
 *
 * Instead of having to manually adjust the elemental rate of each enemy,
 * you can now assign them to a Trait Set (through the Plugin Parameters) and
 * then assign that Trait Set to an enemy or batch of enemies instead. This
 * means that all enemies with <Element: Fire> would be weak and resistance to
 * the same elements determined by the Elemental Fire Trait Set.
 *
 * These Plugin Parameters adjust how Trait Sets are handled on a general scale
 * within your game.
 *
 * ---
 *
 * General
 * 
 *   Enable Trait Sets?:
 *   - Enable Trait Sets? This must be enabled for Trait Sets to have any kind
 *     of effect on battlers.
 * 
 *   Enemy Name Format:
 *   - Enemy name format on how Trait Sets affect how enemy names appear.
 *   - Choose from the list or customize it.
 *     - [name] [letter]
 *     - [element] [name] [letter]
 *     - [element] [subelement] [name] [letter]
 *     - [name][gender] [letter]
 *     - [race] [name][gender] [letter]
 *     - [alignment] [name][gender] [letter]
 *     - [blessing] [name][gender] [letter]
 *     - [curse] [name][gender] [letter]
 *     - [name][gender]([zodiac]) [letter]
 *     - [variant] [name][gender] [letter]
 *     - [variant] [nature] [name][gender] [letter]
 *     - [variant] [nature] [element] [name][gender] [letter]
 *     - [alignment] [variant] [nature] [element] [name][gender] [letter]
 *     - ...and more...
 *
 * ---
 *
 * Trait Columns
 *
 *   Column 1 Traits:
 *   Column 2 Traits:
 *   - List of the traits that appear in this column.
 *   - Used by default in the Properties category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Trait Set Types
 * ============================================================================
 *
 * Trait Sets are new properties added to RPG Maker MZ through this plugin.
 * They're used to streamline the process of applying traits to actors and
 * enemies through the database.
 *
 * Instead of having to manually adjust the elemental rate of each enemy,
 * you can now assign them to a Trait Set (through the Plugin Parameters) and
 * then assign that Trait Set to an enemy or batch of enemies instead. This
 * means that all enemies with <Element: Fire> would be weak and resistance to
 * the same elements determined by the Elemental Fire Trait Set.
 *
 * There are 10 different types of Trait Set Types out there that you can
 * assign to actors and enemies and they all work the same way, just under
 * different categories.
 *
 * ---
 *
 * Element
 * SubElement
 * Gender
 * Race
 * Nature
 * Alignment
 * Blessing
 * Curse
 * Zodiac
 * Variant
 * 
 *   Name:
 *   - Name of this Trait Set. Also used as a reference key
 * 
 *   Display Text:
 *   - How the Trait Set is displayed in game when selected.
 *   - Text codes are allowed.
 * 
 *   Help Description:
 *   - Help description for this Trait Set if required.
 * 
 *   Format Text:
 *   - The text that's added onto an enemy's name if this Trait Set is used.
 * 
 *   Valid for Random?:
 *   - Is this Trait Set valid for random selection?
 * 
 *   Random Weight:
 *   - Default weight of this Trait Set if valid for random.
 * 
 *   Traits:
 * 
 *   Element Rates:
 *   - The elemental damage rates received for this Trait Set.
 *   - The modifiers are multiplicative.
 * 
 *   Basic Parameters:
 *   - The basic parameter rates altered by this Trait set.
 *   - The modifiers are multiplicative.
 * 
 *   X Parameters:
 *   - The X parameter rates altered by this Trait set.
 *   - The modifiers are additive.
 * 
 *   S Parameters:
 *   - The S parameter rates altered by this Trait set.
 *   - The modifiers are multiplicative.
 * 
 *   Passive States:
 *   - Passive states that are applied to this Trait Set.
 *   - Requires VisuMZ_1_SkillsStatesCore.
 *   - Refer to VisuMZ_1_SkillsStatesCore's documentation for more details.
 * 
 *   Equipment:
 * 
 *   Weapon Types:
 *   - Additional weapon types usable by this Trait Set.
 * 
 *   Armor Types:
 *   - Additional armor types usable by this Trait Set.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.14: May 28, 2021
 * * Bug Fixes!
 * ** Added fail safe to prevent passive state melding from traits to crash the
 *    game when cache fails to collect data. Fix by Irina.
 * 
 * Version 1.13: May 21, 2021
 * * Documentation Update
 * ** Added for Trait "Passive States" section:
 * *** Refer to VisuMZ_1_SkillsStatesCore's documentation for more details.
 * 
 * Version 1.12: April 30, 2021
 * * Bug Fixes!
 * ** When changing traits to a random value, load up any passive states and
 *    other effects that may have changed. Fix made by Arisu.
 * 
 * Version 1.11: February 26, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 29, 2021
 * * Bug Fixes!
 * ** <Multi-Element: x> notetags should now work properly. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Irina:
 * *** <Equip Trait Requirement: name>
 * **** Makes this piece of equipment equippable by only actors with those
 *      traits. If there are multiple traits required, all of them have to be
 *      met. If multiple trait types share the same trait name, the listed name
 *      will count for all of them.
 * **** Usage Example: <Equip Trait Requirement: Female> makes the item only
 *      equippable by female actors as long as they are tagged as female.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL.
 * *** Status Menu Settings > Elements > IDs: Column 1 added
 * *** Status Menu Settings > Elements > IDs: Column 2 added
 * **** The list of element ID's to show in column 1/2.
 * **** If neither column has ID's, list all elements.
 * ***** If you do not update the drawn JS found in the Status Menu Categories
 *       Plugin Parameters, these new settings won't do anything.
 * * Feature Update!
 * ** Plugin Parameter updates made by Irina and sponsored by AndyL.
 * *** Status Menu Categories > Parameters updated
 * **** Default draw options now have a slightly thicker padding to make the
 *      parameter values easier to read.
 * *** Status Menu Categories > Elements updated
 * **** Default draw options now factor in multiple columns as applied by the
 *      new plugin parameters above.
 * *** Status Menu Categories > Access updated
 * **** Skill Types, Weapon Types, and Armor Types are now centered in the
 *      various data columns to allow for better reading.
 * ** Default settings have been added to the Plugin Parameters. If you want to
 *    acquire these settings for an already-existing project, do either of the
 *    following:
 * *** Delete the existing VisuMZ_1_ElementStatusCore.js in the Plugin Manager
 *     list and install the newest version.
 * *** Or create a new project, install VisuMZ_1_ElementStatusCore.js there,
 *     then copy over the "Status Menu Categories" parameters found in the
 *     Plugin Parameters to your current project.
 *
 * Version 1.09: January 8, 2021
 * * Bug Fixes!
 * ** Default "JS: Draw Data" code for Plugin Parameters > Status Menu
 *    Categories > Elements has been updated to account for Trait Type
 *    visibility for both Element and Sub-Element. This won't update normally
 *    as it is a part of the Plugin Parameters. You will need to either delete
 *    the reinstall the plugin into the Plugin Manager list or copy and paste
 *    the Status Menu Categories plugin parameters from a fresh install. Fix
 *    made by Irina.
 * 
 * Version 1.08: November 29, 2020
 * * Bug Fixes!
 * ** Trait Set bonuses for X Parameters and S Parameters no longer increase
 *    exponentially with each other. Fix made by Arisu.
 * 
 * Version 1.07: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.06: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Yanfly.
 *
 * Version 1.05: October 4, 2020
 * * Bug Fixes!
 * ** Main Menu Portraits are now forced to pre-load prior to entering the
 *    Status Menu scene to ensure images will properly appear.
 *    Fix made by Irina.
 * 
 * Version 1.04: September 20, 2020
 * * Bug Fixes!
 * ** The "Column 1 and 2 Traits" plugin parameters for "General Trait Set"
 *    should now work. You will need to readjust them again. Fix by Arisu.
 * ** The "Elements" Status Menu Categories tab has its "JS: Draw Data"
 *    updated to display the percentages properly for Dealt Damage bonuses.
 *    This won't update normally as it's a part of the plugin parameters. You
 *    would need to do either a fresh install, copy from the sample project,
 *    or change the code bit yourself. To change to code bit, look for this:
 *      let dealtText = '%1%'.format(dealt);
 *    and change it to:
 *      let dealtText = '%1%'.format(Math.round(dealt * 100));
 *    Fix made by Irina.
 * 
 * Version 1.03: September 6, 2020
 * * Documentation Update!
 * ** <Dealt Element id Flat: +x%> notetag gets a more indepth explanation.
 * *** This does not add on flat bonus damages after calculating elemental
 *     rates. This merely adds onto it at the end after applying rates if
 *     the formula from above is unchanged.
 * * New Features!
 * ** New Plugin Parameters added in Status Menu Settings for disabling the
 *    back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Trait Set bonuses for X Parameters and S Parameters now show up properly
 *    in the Status Menu. Fix made by Yanfly.
 * ** Trait Set Sideview Battler Solo Weapon and Solo Motion notetags are now
 *    fixed to register properly with Battle Core. Fix made by Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states now work with Skills & States Core. Fix made by Yanfly.
 * ** Fixed S parameters not working. Fix made by Yanfly.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeBiographyGroup
 * @text Actor: Change Biography (Group)
 * @desc Changes the biography of the selected actor(s).
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Biography:json
 * @text Step 2: Biography
 * @type note
 * @desc Change the biography for target actor(s) to this.
 * Text codes allowed. %1 - Actor's name.
 * @default "This is %1's new biography."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeBiographyRange
 * @text Actor: Change Biography (Range)
 * @desc Changes the biography of the selected actor(s).
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Biography:json
 * @text Step 2: Biography
 * @type note
 * @desc Change the biography for target actor(s) to this.
 * Text codes allowed. %1 - Actor's name.
 * @default "This is %1's new biography."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeBiographyJS
 * @text Actor: Change Biography (JS)
 * @desc Changes the biography of the selected actor(s).
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Biography:json
 * @text Step 2: Biography
 * @type note
 * @desc Change the biography for target actor(s) to this.
 * Text codes allowed. %1 - Actor's name.
 * @default "This is %1's new biography."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTraitSetsGroup
 * @text Actor: Change Trait Sets (Group)
 * @desc Changes the Trait Set(s) of the selected actor(s).
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTraitSetsRange
 * @text Actor: Change Trait Sets (Range)
 * @desc Changes the Trait Set(s) of the selected actor(s).
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTraitSetsJS
 * @text Actor: Change Trait Sets (JS)
 * @desc Changes the Trait Set(s) of the selected actor(s).
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTraitSetsGroup
 * @text Enemy: Change Trait Sets (Group)
 * @desc Changes the Trait Set(s) of the selected enemy(ies).
 * Select from a group of enemy indexes to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type number[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTraitSetsRange
 * @text Enemy: Change Trait Sets (Range)
 * @desc Changes the Trait Set(s) of the selected enemy(ies).
 * Select from a range of enemy indexes to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type number
 * @desc Select which Enemy Index to start from.
 * @default 0
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type number
 * @desc Select which Index to end at.
 * @default 7
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTraitSetsJS
 * @text Enemy: Change Trait Sets (JS)
 * @desc Changes the Trait Set(s) of the selected enemy(ies).
 * Select from a group of enemy indexes using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Enemy Indexes to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ElementStatusCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ElementRules:struct
 * @text Element Rulings
 * @type struct<ElementRules>
 * @desc The rulings for Element-related mechanics.
 * @default {"Rulings":"","MultiRule:str":"multiply","RuleMaxCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet max = 0;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    max = Math.max(max, target.elementRate(elementId) * sign);\\n}\\nreturn max;\"","RuleMinCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet min = 0;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    min = Math.min(min, target.elementRate(elementId) * sign);\\n}\\nreturn min;\"","RuleMultiplyCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet rate = 1;\\nlet sign = 1;\\nfor (const elementId of elements) {\\n    if (absorbed.includes(elementId)) sign = -1;\\n    rate *= target.elementRate(elementId);\\n}\\nreturn rate * sign;\"","RuleAdditiveCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet rate = 0;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    rate += target.elementRate(elementId) * sign;\\n}\\nreturn rate;\"","RuleAverageCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst rate = action.elementsRateSum(target, elements);\\nreturn rate / elements.length;\"","Formulas":"","ReceivedRateJS:func":"\"// Declare Constants\\nconst elementId = arguments[0];\\nconst target = this;\\nconst base = 1;\\nconst plus = target.getReceiveElementPlus(elementId);\\nconst rate = target.getReceiveElementRate(elementId);\\nconst flat = target.getReceiveElementFlat(elementId);\\n\\n// Determine Return Value\\nreturn Math.max(0, (base + plus) * rate + flat);\"","FinalizeRateJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst action = this;\\nconst elements = action.elements();\\nconst targetRate = action.calcTargetElementRate(target, elements);\\nconst sign = targetRate >= 0 ? 1 : -1;\\nconst base = Math.abs(targetRate);\\nconst plus = action.calcUserElementDamagePlus(target, elements);\\nconst rate = action.calcUserElementDamageRate(target, elements);\\nconst flat = action.calcUserElementDamageFlat(target, elements);\\n\\n// Determine Return Value\\nreturn sign * Math.max((base + plus) * rate + flat, 0);;\""}
 *
 * @param StatusMenu:struct
 * @text Status Menu Settings
 * @type struct<StatusMenu>
 * @desc The settings for the Status Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/top","TraitDescriptionFontSize:num":"18","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"icon","CmdTextAlign:str":"center","Parameters":"","Col1:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","Col2:arraystr":"[\"HIT\",\"EVA\",\"CRI\",\"CEV\",\"MEV\",\"MRF\",\"CNT\",\"HRG\",\"MRG\",\"TRG\"]","Col3:arraystr":"[\"TGR\",\"GRD\",\"REC\",\"PHA\",\"MCR\",\"TCR\",\"PDR\",\"MDR\",\"FDR\",\"EXR\"]","Elements":"","ExcludeElements:arraynum":"[]","ElementsCol1:arraynum":"[]","ElementsCol2:arraynum":"[]","Vocabulary":"","VocabBiography:str":"Biography","VocabDmgAbsorb:str":"Absorbs %1%","VocabDmgReceive:str":"Elemental Resistance","VocabDmgDealt:str":"Bonus Damage","VocabStype:str":"Skill Types","VocabWtype:str":"Weapon Types","VocabAtype:str":"Armor Types"}
 *
 * @param StatusMenuList:arraystruct
 * @text Status Menu Categories
 * @parent StatusMenu:struct
 * @type struct<StatusCategory>[]
 * @desc This is a list of categories that appear in the 
 * Status Menu Scene.
 * @default ["{\"Symbol:str\":\"general\",\"Icon:num\":\"84\",\"Text:str\":\"General\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst maxExp = '-------';\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nconst basicDataHeight = lineHeight * 6.5;\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst halfWidth = this.innerWidth / 2;\\\\nlet rect = new Rectangle(0, 0, halfWidth, this.innerHeight);\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Smaller Data Area\\\\nlet sx = rect.x;\\\\nlet sy = Math.max(rect.y, rect.y + (rect.height - basicDataHeight));\\\\nlet sw = rect.width;\\\\nlet sh = rect.y + rect.height - sy;\\\\n\\\\n// Draw Actor Name\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight, 2);\\\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\\\n\\\\n// Draw Actor Level\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawActorLevel(actor, sx, sy);\\\\n\\\\n// Draw Actor Class\\\\nconst className = actor.currentClass().name;\\\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawTextEx(className, sx, sy, sw);\\\\n\\\\n// Draw Actor Icons\\\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawActorIcons(actor, sx, sy);\\\\n\\\\n// Draw Gauges\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, this.innerHeight - sy);\\\\nthis.placeGauge(actor, \\\\\\\"hp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nthis.placeGauge(actor, \\\\\\\"mp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nif ($dataSystem.optDisplayTp) {\\\\n    this.placeGauge(actor, \\\\\\\"tp\\\\\\\", sx, sy);\\\\n}\\\\n\\\\n// Declare Second Half\\\\nrect = new Rectangle(halfWidth, 0, halfWidth, this.innerHeight);\\\\n\\\\n// Draw EXP\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawItemDarkRect(rect.x, rect.y, rect.width, lineHeight, 2);\\\\nthis.drawText(TextManager.exp, rect.x, rect.y, rect.width, 'center');\\\\nconst expHeight = lineHeight * 5;\\\\nthis.drawItemDarkRect(rect.x, rect.y + lineHeight * 1, rect.width, lineHeight * 2);\\\\nthis.drawItemDarkRect(rect.x, rect.y + lineHeight * 3, rect.width, lineHeight * 2);\\\\nconst expTotal = TextManager.expTotal.format(TextManager.exp);\\\\nconst expNext = TextManager.expNext.format(TextManager.level);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(expTotal, rect.x + padding, rect.y + lineHeight * 1, rect.width - padding * 2);\\\\nthis.drawText(expNext, rect.x + padding, rect.y + lineHeight * 3, rect.width - padding * 2);\\\\nthis.resetTextColor();\\\\nconst expTotalValue = actor.currentExp();\\\\nconst expNextValue = actor.isMaxLevel() ? maxExp : actor.nextRequiredExp();\\\\nthis.drawText(expTotalValue, rect.x + padding, rect.y + lineHeight * 1, rect.width - padding * 2, 'right');\\\\nthis.drawText(expNextValue, rect.x + padding, rect.y + lineHeight * 3, rect.width - padding * 2, 'right');\\\\n\\\\n// Write Actor Biography\\\\ny = rect.y + expHeight;\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, lineHeight, 2);\\\\nthis.drawText(TextManager.statusMenuBiography, rect.x, y, rect.width, 'center');\\\\nthis.resetTextColor();\\\\ny += lineHeight;\\\\nconst bioText = actor.getBiography();\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\nthis.drawTextEx(bioText, rect.x + padding, y, rect.width - padding * 2);\\\"\"}","{\"Symbol:str\":\"parameters\",\"Icon:num\":\"87\",\"Text:str\":\"Parameters\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nconst basicDataHeight = this.basicDataHeight();\\\\nconst padding = this.itemPadding() * 2;\\\\nconst thirdWidth = Math.floor(this.innerWidth / 3);\\\\nlet x = 0;\\\\nlet y = 0;\\\\nlet paramWidth = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Parameter Rect\\\\nlet rect = new Rectangle(0, 0, thirdWidth, this.innerHeight);\\\\n\\\\n// Declare Parameters\\\\nconst params1 = this.getParameterList(1);\\\\nconst params2 = this.getParameterList(2);\\\\nconst params3 = this.getParameterList(3);\\\\nconst maxLength = Math.max(params1.length, params2.length, params3.length);\\\\nconst nameWidth = rect.width - padding * 2 - this.textWidth('88888');\\\\nconst topY = Math.max((this.innerHeight - (maxLength * lineHeight)) / 2, 0);\\\\n\\\\n// Draw Parameters 1\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params1) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Parameters 2\\\\nrect.x += rect.width;\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params2) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Parameters 3\\\\nrect.x += rect.width;\\\\nrect.width = this.innerWidth - rect.x;\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params3) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\"\"}","{\"Symbol:str\":\"properties\",\"Icon:num\":\"83\",\"Text:str\":\"Properties\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst traitCol1 = Window_StatusData.traitCol1;\\\\nconst traitCol2 = Window_StatusData.traitCol2;\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst traitHeight = (this.innerHeight / Math.max(traitCol1.length, traitCol2.length)) - lineHeight;\\\\nconst width = this.innerWidth / 2;\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, width);\\\\n\\\\n// Draw Trait Set 1\\\\nfor (const type of traitCol1) {\\\\n    const traitType = DataManager.traitSetType(type);\\\\n    const traitSet = actor.traitSet(type);\\\\n    this.drawItemDarkRect(0, y, width, lineHeight, 2);\\\\n    const labelText = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2'.format(traitType.Label, traitSet.Display);\\\\n    this.drawTextEx(labelText, padding, y, width - padding * 2);\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(0, y, width, traitHeight);\\\\n    this.drawTextEx(traitSet.Description, padding, y, width - padding * 2);\\\\n    y += traitHeight;\\\\n    this.resetDescriptionFontSize();\\\\n}\\\\n\\\\n// Draw Filler Rect 1\\\\nif (this.innerHeight - y > 0) {\\\\n    this.drawItemDarkRect(0, y, width, this.innerHeight - y);\\\\n}\\\\n\\\\n// Draw Trait Set 2\\\\ny = 0;\\\\nfor (const type of traitCol2) {\\\\n    const traitType = DataManager.traitSetType(type);\\\\n    const traitSet = actor.traitSet(type);\\\\n    this.drawItemDarkRect(width, y, width, lineHeight, 2);\\\\n    const labelText = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2'.format(traitType.Label, traitSet.Display);\\\\n    this.drawTextEx(labelText, width + padding, y, width - padding * 2);\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(width, y, width, traitHeight);\\\\n    this.drawTextEx(traitSet.Description, width + padding, y, width - padding * 2);\\\\n    y += traitHeight;\\\\n    this.resetDescriptionFontSize();\\\\n}\\\\n\\\\n// Draw Filler Rect 1\\\\nif (this.innerHeight - y > 0) {\\\\n    this.drawItemDarkRect(width, y, width, this.innerHeight - y);\\\\n}\\\"\"}","{\"Symbol:str\":\"elements\",\"Icon:num\":\"64\",\"Text:str\":\"Elements\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst labelFmt = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2';\\\\nconst traitType1 = DataManager.traitSetType('Element');\\\\nconst traitSet1 = actor.traitSet('Element');\\\\nconst traitType2 = DataManager.traitSetType('SubElement');\\\\nconst traitSet2 = actor.traitSet('SubElement');\\\\nconst traitHeight = (this.innerHeight / Math.max(Window_StatusData.traitCol1.length, Window_StatusData.traitCol2.length)) - lineHeight;\\\\nlet x = 0;\\\\nlet y = 0;\\\\nlet width = this.innerWidth / 2;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, width);\\\\n\\\\n// Draw Element Trait Sets\\\\nif (traitType1.Visible || traitType2.Visible) {\\\\n    this.drawItemDarkRect(x, y, width, lineHeight, 2);\\\\n    this.drawItemDarkRect(width, y, width, lineHeight, 2);\\\\n    if (traitType1.Visible) {\\\\n        this.drawTextEx(labelFmt.format(traitType1.Label, traitSet1.Display), padding, y, width - padding * 2);\\\\n    }\\\\n    if (traitType2.Visible) {\\\\n        this.drawTextEx(labelFmt.format(traitType2.Label, traitSet2.Display), width + padding, y, width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(x, y, width, traitHeight);\\\\n    this.drawItemDarkRect(width, y, width, traitHeight);\\\\n    if (traitType1.Visible) {\\\\n        this.drawTextEx(traitSet1.Description, padding, y, width - padding * 2);\\\\n    }\\\\n    if (traitType2.Visible) {\\\\n        this.drawTextEx(traitSet2.Description, width + padding, y, width - padding * 2);\\\\n    }\\\\n    this.resetDescriptionFontSize();\\\\n    this.resetFontSettings();\\\\n    y += traitHeight;\\\\n}\\\\nconst topY = y;\\\\n\\\\n// Prepare Elemental Data\\\\nconst elementCol1 = this.getElementIDsCol1();\\\\nconst elementCol2 = this.getElementIDsCol2();\\\\nlet columnData;\\\\nif (elementCol2.length > 0) {\\\\n    columnData = ['Resist','Resist','Bonus','Bonus'];\\\\n} else {\\\\n    columnData = ['Resist','Bonus'];\\\\n}\\\\nconst dataRows = Math.max(elementCol1.length, elementCol2.length, 1);\\\\nconst dataCols = columnData.length;\\\\n\\\\n// Draw Elemental Data\\\\nthis.drawItemDarkRect(width * 0, y, width, lineHeight, 2);\\\\nthis.drawItemDarkRect(width * 1, y, width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuDmgReceive, width * 0, y, width, 'center');\\\\nthis.drawText(TextManager.statusMenuDmgDealt, width * 1, y, width, 'center');\\\\ny += lineHeight;\\\\nthis.setDescriptionFontSizeToTraitSet();\\\\nconst smallLineHeight = this.textSizeEx(' ').height;\\\\n\\\\n// Draw Elemental Table\\\\nfor (let i = 0; i < dataRows; i++) {\\\\n    for (let j = 0; j < dataCols; j++) {\\\\n        // Draw Dark Rect\\\\n        const colWidth = this.innerWidth / dataCols;\\\\n        this.drawItemDarkRect(colWidth * j, y, colWidth, smallLineHeight);\\\\n\\\\n        // Draw Element Name\\\\n        let elementID = elementCol1[i];\\\\n        if (dataCols === 4) {\\\\n            elementID = (j % 2 === 0) ? elementCol1[i] : elementCol2[i];\\\\n        }\\\\n        if (!elementID) continue;\\\\n        const name = $dataSystem.elements[elementID];\\\\n        this.drawTextEx(name, colWidth * (j + 1/3) + padding, y, colWidth*2/3);\\\\n        const type = columnData[j];\\\\n\\\\n        // Draw Resistance Data\\\\n        this.resetFontSettings();\\\\n        let drawText = '';\\\\n        if (type === 'Resist') {\\\\n            const rate = actor.elementRate(elementID);\\\\n            const flippedRate = (rate - 1) * -1;\\\\n            this.changeTextColor(ColorManager.paramchangeTextColor(flippedRate));\\\\n            drawText = '%1%'.format(Math.round(flippedRate * 100));\\\\n            if (actor.getAbsorbedElements().includes(elementID)) {\\\\n                this.changeTextColor(ColorManager.powerUpColor());\\\\n                drawText = TextManager.statusMenuDmgAbsorb.format(Math.round(rate * 100));\\\\n            } else if (rate > 1) {\\\\n                drawText = '%1'.format(drawText);\\\\n            } else if (rate <= 1) {\\\\n                drawText = '+%1'.format(drawText);\\\\n            }\\\\n\\\\n        // Draw Bonus Damage Data\\\\n        } else if (type === 'Bonus') {\\\\n            const dealtPlus = actor.getDealtElementPlus(elementID);\\\\n            const dealtRate = actor.getDealtElementRate(elementID);\\\\n            const dealtFlat = actor.getDealtElementFlat(elementID);\\\\n            const dealt = ((1 + dealtPlus) * dealtRate + dealtFlat) - 1;\\\\n            this.changeTextColor(ColorManager.paramchangeTextColor(dealt));\\\\n            drawText = '%1%'.format(Math.round(dealt * 100));\\\\n            if (dealt >= 0) drawText = '+%1'.format(drawText);\\\\n        }\\\\n\\\\n        // Draw Value\\\\n        this.contents.drawText(drawText, colWidth * j, y, (colWidth/3) - padding, smallLineHeight, 'right');\\\\n    }\\\\n    y += smallLineHeight;\\\\n}\\\\n\\\\n// Closing the Table\\\\nfor (let j = 0; j < dataCols; j++) {\\\\n    const colWidth = this.innerWidth / dataCols;\\\\n    this.drawItemDarkRect(colWidth * j, y, colWidth, this.innerHeight - y);\\\\n}\\\"\"}","{\"Symbol:str\":\"access\",\"Icon:num\":\"137\",\"Text:str\":\"Access\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst thirdWidth = Math.floor(this.innerWidth / 3);\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Parameter Rect\\\\nlet rect = new Rectangle(0, 0, thirdWidth, this.innerHeight);\\\\n\\\\n// Draw Skill Types\\\\nx = rect.x;\\\\ny = 0;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuStype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const stypeId of actor.skillTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (stypeId > 0) {\\\\n        const text = $dataSystem.skillTypes[stypeId];\\\\n        const padding = Math.round((rect.width - this.stypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Weapon Types\\\\nrect.x += rect.width;\\\\nx = rect.x;\\\\ny = 0;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuWtype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const wtypeId of actor.weaponTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (wtypeId > 0) {\\\\n        const text = $dataSystem.weaponTypes[wtypeId];\\\\n        const padding = Math.round((rect.width - this.wtypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Armor Types\\\\nrect.x += rect.width;\\\\nx = rect.x;\\\\ny = 0;\\\\nrect.width = this.innerWidth - rect.x;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuAtype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const atypeId of actor.armorTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (atypeId > 0) {\\\\n        const text = $dataSystem.armorTypes[atypeId];\\\\n        const padding = Math.round((rect.width - this.atypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\"\"}","{\"Symbol:str\":\"cancel\",\"Icon:num\":\"82\",\"Text:str\":\"Finish\",\"DrawJS:func\":\"\\\"this.drawFirstCategoryData();\\\"\"}"]
 *
 * @param TraitBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param TraitSetSettings:struct
 * @text General Trait Set Settings
 * @type struct<TraitSetSettings>
 * @desc The settings for Trait Sets as a whole.
 * @default {"General":"","Enable:eval":"true","EnemyNameFmt:str":"[variant] [name][gender] [letter]","TraitColumns":"","TraitCol1:arraystr":"[\"Gender\",\"Nature\",\"Blessing\",\"Zodiac\"]","TraitCol2:arraystr":"[\"Race\",\"Alignment\",\"Curse\",\"Variant\"]"}
 *
 * @param Element:struct
 * @text Main Element Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Element","Label:str":"Element","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Neutral\",\"Display:str\":\"\\\\i[160]Neutral\",\"Description:json\":\"\\\"No strengths or weaknesses.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"8\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Fire\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[64]Fire\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire and \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Flame\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ice\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[65]Ice\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[65]Ice and \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Frost\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Thunder\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[66]Thunder\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[66]Thunder and \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Electric\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Water\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[67]Water\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water and \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Aqua\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Earth\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[68]Earth\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[68]Earth and \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Stone\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wind\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[69]Wind\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[69]Wind and \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Air\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Light\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Light\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bright\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Darkness\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Darkness\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Shadow\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param SubElement:struct
 * @text Sub Element Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Sub-Element","Label:str":"Sub-Element","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"-\",\"Display:str\":\"-\",\"Description:json\":\"\\\"\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"8\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Fire\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[64]Fire\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire and \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Flame\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ice\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[65]Ice\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[65]Ice and \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Frost\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Thunder\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[66]Thunder\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[66]Thunder and \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Electric\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Water\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[67]Water\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water and \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Aqua\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Earth\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[68]Earth\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[68]Earth and \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Stone\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wind\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[69]Wind\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[69]Wind and \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Air\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Light\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Light\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bright\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Darkness\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Darkness\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Shadow\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Gender:struct
 * @text Gender Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Gender","Label:str":"Gender","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Unknown\",\"Display:str\":\"\\\\I[160]Unknown\",\"Description:json\":\"\\\"Uncertain to this unit's gender.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Male\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[165]Male\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has stronger physical attributes.\\\\\\\\nThis unit has weaker magical attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♂\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"50\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.95\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Female\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[162]Female\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has stronger magical attributes.\\\\\\\\nThis unit has weaker physical attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♀\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"50\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.05\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Both\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[84]Both\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"⚥\\\",\\\"RandomValid:eval\\\":\\\"false\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Race:struct
 * @text Race Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Race","Label:str":"Race","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Uncategorized\",\"Display:str\":\"\\\\I[16]Uncategorized\",\"Description:json\":\"\\\"This race's attributes have not been determined.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Human\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[82]Human\\\",\\\"Description:json\\\":\\\"\\\\\\\"This race has neutral attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Human\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"High Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[101]High Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"High Elves have more MaxMP and less MaxHP.\\\\\\\\nHigh Elves can equip Canes and Magic Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"High Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"6\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"2\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wood Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[102]Wood Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Wood Elves have more AGI and less DEF.\\\\\\\\nWood Elves can equip Bows and Crossbows.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Wood Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"7\\\\\\\",\\\\\\\"8\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dark Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Dark Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Dark Elves have more ATK and less MAT.\\\\\\\\nDark Elves can equip Daggers and Swords.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dark Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"1\\\\\\\",\\\\\\\"2\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dwarf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[223]Dwarf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Dwarves have more MaxHP and less AGI.\\\\\\\\nDwarves can equip Flails and Heavy Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dwarvin\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"3\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"4\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gnome\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[140]Gnome\\\",\\\"Description:json\\\":\\\"\\\\\\\"Gnomes have more AGI and less DEF.\\\\\\\\nGnomes can equip Daggers and Light Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Gnomish\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"1\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"3\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Hafling\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[142]Hafling\\\",\\\"Description:json\\\":\\\"\\\\\\\"Haflings have more LUK and less MaxMP.\\\\\\\\nHaflings can equip Sword and Small Shields.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hafling\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"2\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"5\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wolfkin\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[105]Wolfkin\\\",\\\"Description:json\\\":\\\"\\\\\\\"Wolfkin have more ATK and less MAT.\\\\\\\\nWolfkin can equip Claws and Gloves.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Wolfkin\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"10\\\\\\\",\\\\\\\"11\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Felyne\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[100]Felyne\\\",\\\"Description:json\\\":\\\"\\\\\\\"Felyne have more MAT and less ATK.\\\\\\\\nFelyne can equip Whips and Canes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Felyne\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"5\\\\\\\",\\\\\\\"6\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lizardman\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[99]Lizardman\\\",\\\"Description:json\\\":\\\"\\\\\\\"Lizardmen have more DEF and less LUK.\\\\\\\\nLizardmen can equip Axes and Spears.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lizardman\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.90\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"4\\\\\\\",\\\\\\\"12\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Nature:struct
 * @text Nature Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Nature","Label:str":"Nature","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Chill\",\"Display:str\":\"\\\\I[84]Chill\",\"Description:json\":\"\\\"This unit has neutral parameters.\\\"\",\"FmtText:str\":\"Chill\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Hardy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[50]Hardy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hardy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lonely\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[51]Lonely\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lonely\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Adamant\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[52]Adamant\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Adamant\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Naughty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[53]Naughty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Naughty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Brave\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[54]Brave\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Brave\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Bold\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[50]Bold\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bold\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Docile\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[51]Docile\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Docile\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Impish\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[52]Impish\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Impish\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lax\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[53]Lax\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lax\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Relaxed\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[54]Relaxed\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Relaxed\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Modest\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[50]Modest\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Modest\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Mild\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[51]Mild\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Mild\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Bashful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[52]Bashful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bashful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Rash\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[53]Rash\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Rash\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Quiet\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[54]Quiet\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Quiet\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Calm\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[50]Calm\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Calm\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gentle\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[51]Gentle\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Gentle\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Careful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[52]Careful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Careful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Quirky\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[53]Quirky\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Quirky\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Sassy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[54]Sassy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Sassy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Timid\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[50]Timid\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Timid\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Hasty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[51]Hasty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hasty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Jolly\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[52]Jolly\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Jolly\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Naive\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[53]Naive\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Naive\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Serious\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[54]Serious\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Serious\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Alignment:struct
 * @text Alignment Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Alignment","Label:str":"Alignment","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Neutral\",\"Display:str\":\"\\\\I[160]Neutral\",\"Description:json\":\"\\\"This unit's alignment is completely neutral.\\\"\",\"FmtText:str\":\"Neutral\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Lawful Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Lawful Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Neutral Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Neutral Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Chaotic Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lawful Neutral\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[160]Lawful Neutral\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water, \\\\\\\\\\\\\\\\I[68]Earth, \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire, \\\\\\\\\\\\\\\\I[65]Ice, \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Neutral\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Neutral\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[160]Chaotic Neutral\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire, \\\\\\\\\\\\\\\\I[65]Ice, \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water, \\\\\\\\\\\\\\\\I[68]Earth, \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Neutral\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lawful Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Lawful Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Neutral Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Neutral Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Chaotic Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Blessing:struct
 * @text Blessing Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Blessing","Label:str":"Blessing","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"No Blessing\",\"Display:str\":\"\\\\I[160]No Blessing\",\"Description:json\":\"\\\"This unit has not received a blessing.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"6\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Dextrous\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Dextrous\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased HIT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dextrous\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Elusive\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Elusive\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased EVA.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Elusive\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Impact\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Impact\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased CRI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Impactful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Healthy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Healthy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate HP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Healthy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Focused\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Focused\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate MP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Focused\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Energetic\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Energetic\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate TP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Energetic\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Curse:struct
 * @text Curse Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Curse","Label:str":"Curse","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"No Curse\",\"Display:str\":\"\\\\I[160]No Curse\",\"Description:json\":\"\\\"This unit has not been cursed.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"6\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Clumsy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Clumsy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less HIT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Clumsy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dazed\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Dazed\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less EVA.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dazed\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Fitful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Fitful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less CRI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Fitful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Drained\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Drained\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit receives less healing.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Drained\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Inefficient\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Inefficient\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit uses more MP.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Inefficient\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Unmotivated\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Unmotivated\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit gaines less TP.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Unmotivated\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Zodiac:struct
 * @text Zodiac Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Zodiac","Label:str":"Zodiac","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Unknown\",\"Display:str\":\"\\\\I[160]Unknown\",\"Description:json\":\"\\\"This unit's Zodiac is unknown.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Aries\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Aries\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♈\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Taurus\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Taurus\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♋\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gemini\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Gemini\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♊\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Cancer\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Cancer\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♋\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Leo\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Leo\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♌\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Virgo\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Virgo\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♍\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Libra\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Libra\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♎\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Scorpio\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Scorpio\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♏\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Sagittarius\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Sagittarius\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to LUK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♐\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.05\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Capricon\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Capricon\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♑\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Aquarius\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Aquarius\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♒\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Pisces\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Pisces\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♓\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ophiuchus\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Ophiuchus\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit is the rare Ophiuchus zodiac.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"⛎\\\",\\\"RandomValid:eval\\\":\\\"false\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Variant:struct
 * @text Variant Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Variant","Label:str":"Variant","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Normal\",\"Display:str\":\"\\\\I[160]Normal\",\"Description:json\":\"\\\"This is your average unit.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"100\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Mighty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Mighty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Mighty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"5\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.30\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.30\\\",\\\"GoldRate:num\\\":\\\"1.50\\\",\\\"DropRate:num\\\":\\\"2.00\\\"}\",\"{\\\"Name:str\\\":\\\"Major\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Major\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Major\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.20\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.20\\\",\\\"GoldRate:num\\\":\\\"1.25\\\",\\\"DropRate:num\\\":\\\"1.50\\\"}\",\"{\\\"Name:str\\\":\\\"Greater\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Greater\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Greater\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"20\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.10\\\",\\\"GoldRate:num\\\":\\\"1.15\\\",\\\"DropRate:num\\\":\\\"1.25\\\"}\",\"{\\\"Name:str\\\":\\\"Lesser\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Lesser\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lesser\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"20\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.90\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.90\\\",\\\"GoldRate:num\\\":\\\"0.95\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Minor\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Minor\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Minor\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.80\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.80\\\",\\\"GoldRate:num\\\":\\\"0.90\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Puny\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Puny\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Puny\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"5\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.70\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.70\\\",\\\"GoldRate:num\\\":\\\"0.85\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Element Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~ElementRules:
 *
 * @param Rulings
 *
 * @param MultiRule:str
 * @text Multi-Element Ruling
 * @parent Rulings
 * @type select
 * @option Maximum (largest rate of all elements)
 * @value max
 * @option Minimum (smallest rate of all elements)
 * @value min
 * @option Multiplicative (product of all elements used)
 * @value multiply
 * @option Additive (sum of all elements used)
 * @value additive
 * @option Average (of all the elements used)
 * @value average
 * @desc Ruling on how to calculate element rate when there are 
 * multiple elements used for damage calculation.
 * @default multiply
 *
 * @param RuleMaxCalcJS:func
 * @text JS: Maximum Rate
 * @parent Rulings
 * @type note
 * @desc Determine how maximum element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet max = 0;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    max = Math.max(max, target.elementRate(elementId) * sign);\n}\nreturn max;"
 *
 * @param RuleMinCalcJS:func
 * @text JS: Minimum Rate
 * @parent Rulings
 * @type note
 * @desc Determine how minimum element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet min = 0;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    min = Math.min(min, target.elementRate(elementId) * sign);\n}\nreturn min;"
 *
 * @param RuleMultiplyCalcJS:func
 * @text JS: Multiply Rate
 * @parent Rulings
 * @type note
 * @desc Determine how a multiplied element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet rate = 1;\nlet sign = 1;\nfor (const elementId of elements) {\n    if (absorbed.includes(elementId)) sign = -1;\n    rate *= target.elementRate(elementId);\n}\nreturn rate * sign;"
 *
 * @param RuleAdditiveCalcJS:func
 * @text JS: Additive Rate
 * @parent Rulings
 * @type note
 * @desc Determine how an additive element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet rate = 0;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    rate += target.elementRate(elementId) * sign;\n}\nreturn rate;"
 *
 * @param RuleAverageCalcJS:func
 * @text JS: Average Rate
 * @parent Rulings
 * @type note
 * @desc Determine how an average element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst rate = action.elementsRateSum(target, elements);\nreturn rate / elements.length;"
 *
 * @param Formulas
 *
 * @param ReceivedRateJS:func
 * @text JS: Received Rate
 * @parent Formulas
 * @type note
 * @desc Determine how the element rate for the receiving target is calculated.
 * @default "// Declare Constants\nconst elementId = arguments[0];\nconst target = this;\nconst base = 1;\nconst plus = target.getReceiveElementPlus(elementId);\nconst rate = target.getReceiveElementRate(elementId);\nconst flat = target.getReceiveElementFlat(elementId);\n\n// Determine Return Value\nreturn Math.max(0, (base + plus) * rate + flat);"
 *
 * @param FinalizeRateJS:func
 * @text JS: Finalize Rate
 * @parent Formulas
 * @type note
 * @desc Determine how the finalized element rate before damage is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst action = this;\nconst elements = action.elements();\nconst targetRate = action.calcTargetElementRate(target, elements);\nconst sign = targetRate >= 0 ? 1 : -1;\nconst base = Math.abs(targetRate);\nconst plus = action.calcUserElementDamagePlus(target, elements);\nconst rate = action.calcUserElementDamageRate(target, elements);\nconst flat = action.calcUserElementDamageFlat(target, elements);\n\n// Determine Return Value\nreturn sign * Math.max((base + plus) * rate + flat, 0);;"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Status Menu Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Top Category
 * @value upper/top
 * @option Upper Help, Bottom Category
 * @value upper/bottom
 * @option Lower Help, Top Category
 * @value lower/top
 * @option Lower Help, Bottom Category
 * @value lower/bottom
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/top
 *
 * @param TraitDescriptionFontSize:num
 * @text Trait Set Font Size
 * @parent General
 * @type number
 * @min 1
 * @desc The font size used for Trait Set Descriptions.
 * @default 18
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Category Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Category Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Category Window.
 * @default center
 *
 * @param Parameters
 * @text Displayed Parameters
 * 
 * @param Col1:arraystr
 * @text Column 1
 * @parent Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in column 1.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param Col2:arraystr
 * @text Column 2
 * @parent Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in column 2.
 * @default ["HIT","EVA","CRI","CEV","MEV","MRF","CNT","HRG","MRG","TRG"]
 *
 * @param Col3:arraystr
 * @text Column 3
 * @parent Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in column 3.
 * @default ["TGR","GRD","REC","PHA","MCR","TCR","PDR","MDR","FDR","EXR"]
 *
 * @param Elements
 *
 * @param ExcludeElements:arraynum
 * @text Excluded Elements
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc These element ID's are excluded from the Status Menu list.
 * @default []
 *
 * @param ElementsCol1:arraynum
 * @text IDs: Column 1
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc The list of element ID's to show in column 1.
 * If neither column has ID's, list all elements.
 * @default []
 *
 * @param ElementsCol2:arraynum
 * @text IDs: Column 2
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc The list of element ID's to show in column 2.
 * If neither column has ID's, list all elements.
 * @default []
 *
 * @param Vocabulary
 *
 * @param VocabBiography:str
 * @text Biography
 * @parent Vocabulary
 * @desc Vocabulary for 'Biography'.
 * @default Biography
 *
 * @param VocabDmgAbsorb:str
 * @text Damage: Absorb
 * @parent Vocabulary
 * @desc Vocabulary for 'Damage: Absorb'.
 * @default Absorbs %1%
 *
 * @param VocabDmgReceive:str
 * @text Damage: Received
 * @parent Vocabulary
 * @desc Vocabulary for 'Damage: Received'.
 * @default Elemental Resistance
 *
 * @param VocabDmgDealt:str
 * @text Damage: Dealt
 * @parent Vocabulary
 * @desc Vocabulary for 'Damage: Dealt'.
 * @default Bonus Damage
 *
 * @param VocabStype:str
 * @text Skill Types
 * @parent Vocabulary
 * @desc Vocabulary for 'Skill Types'.
 * @default Skill Types
 *
 * @param VocabWtype:str
 * @text Weapon Types
 * @parent Vocabulary
 * @desc Vocabulary for 'Weapon Types'.
 * @default Weapon Types
 *
 * @param VocabAtype:str
 * @text Armor Types
 * @parent Vocabulary
 * @desc Vocabulary for 'Armor Types'.
 * @default Armor Types
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusCategory:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc Symbol used for this category.
 * @default Symbol
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc Text name used for this category.
 * @default Untitled
 *
 * @param DrawJS:func
 * @text JS: Draw Data
 * @type note
 * @desc Code used to determine what appears in the data window.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * General Trait Set Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSetSettings:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Trait Sets?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Trait Sets? This must be enabled for Trait Sets to
 * have any kind of effect on battlers.
 * @default false
 *
 * @param EnemyNameFmt:str
 * @text Enemy Name Format
 * @parent General
 * @type combo
 * @option [name] [letter]
 * @option [element] [name] [letter]
 * @option [element] [subelement] [name] [letter]
 * @option [name][gender] [letter]
 * @option [race] [name][gender] [letter]
 * @option [alignment] [name][gender] [letter]
 * @option [blessing] [name][gender] [letter]
 * @option [curse] [name][gender] [letter]
 * @option [name][gender]([zodiac]) [letter]
 * @option [variant] [name][gender] [letter]
 * @option [variant] [nature] [name][gender] [letter]
 * @option [variant] [nature] [element] [name][gender] [letter]
 * @option [alignment] [variant] [nature] [element] [name][gender] [letter]
 * @option [alignment] [variant] [nature] [blessing] [element] [name][gender] [letter]
 * @option [alignment] [variant] [nature] [curse] [element] [name][gender] [letter]
 * @desc Enemy name format on how Trait Sets affect how enemy names
 * appear. Choose from the list or customize it.
 * @default [variant] [name][gender] [letter]
 *
 * @param TraitColumns
 * @text Trait Columns
 *
 * @param TraitCol1:arraystr
 * @text Column 1 Traits
 * @parent TraitColumns
 * @type select[]
 * @option Main Element
 * @value Element
 * @option Sub Element
 * @value SubElement
 * @option Gender
 * @value Gender
 * @option Race
 * @value Race
 * @option Nature
 * @value Nature
 * @option Alignment
 * @value Alignment
 * @option Blessing
 * @value Blessing
 * @option Curse
 * @value Curse
 * @option Zodiac
 * @value Zodiac
 * @option Variant
 * @value Variant
 * @desc List of the traits that appear in this column.
 * Used by default in the Properties category.
 * @default ["Gender","Nature","Blessing","Zodiac"]
 *
 * @param TraitCol2:arraystr
 * @text Column 2 Traits
 * @parent TraitColumns
 * @type select[]
 * @option Main Element
 * @value Element
 * @option Sub Element
 * @value SubElement
 * @option Gender
 * @value Gender
 * @option Race
 * @value Race
 * @option Nature
 * @value Nature
 * @option Alignment
 * @value Alignment
 * @option Blessing
 * @value Blessing
 * @option Curse
 * @value Curse
 * @option Zodiac
 * @value Zodiac
 * @option Variant
 * @value Variant
 * @desc List of the traits that appear in this column.
 * Used by default in the Properties category.
 * @default ["Race","Alignment","Curse","Variant"]
 *
 */
/* ----------------------------------------------------------------------------
 * Trait Set Type Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSetType:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Trait Set Type.
 * @default Untitled
 *
 * @param Label:str
 * @text Label
 * @desc How this Trait Set Type is labeled in the Status Menu.
 * Text codes are allowed.
 * @default Untitled
 *
 * @param Visible:eval
 * @text Visible
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Is this Trait Set Type visible in the Status Menu?
 * @default true
 *
 * @param RandomizeActor:eval
 * @text Randomize for Actors?
 * @type boolean
 * @on Randomize
 * @off Default
 * @desc On actor creation, obtain a random trait from this list?
 * @default false
 *
 * @param RandomizeEnemy:eval
 * @text Randomize for Enemies?
 * @type boolean
 * @on Randomize
 * @off Default
 * @desc On enemy creation, obtain a random trait from this list?
 * @default false
 *
 * @param Default:struct
 * @text Default Trait Set
 * @type struct<TraitSet>
 * @desc If no Trait Set is declared by notetags, 
 * use this Trait Set as a default.
 * @default {}
 *
 * @param List:arraystruct
 * @text Trait Set List
 * @type struct<TraitSet>[]
 * @desc A list of all the Trait Sets available to this 
 * Trait Set Type.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Trait Set Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSet:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Trait Set. Also used as a reference key
 * @default Untitled
 *
 * @param Display:str
 * @text Display Text
 * @desc How the Trait Set is displayed in game when selected.
 * Text codes are allowed.
 * @default Untitled
 *
 * @param Description:json
 * @text Help Description
 * @type note
 * @desc Help description for this Trait Set if required.
 * @default ""
 *
 * @param FmtText:str
 * @text Format Text
 * @desc The text that's added onto an enemy's name if this
 * Trait Set is used.
 * @default 
 *
 * @param RandomValid:eval
 * @text Valid for Random?
 * @type boolean
 * @on Valid
 * @off Ignore
 * @desc Is this Trait Set valid for random selection?
 * @default true
 *
 * @param RandomWeight:num
 * @text Random Weight
 * @type number
 * @desc Default weight of this Trait Set if valid for random.
 * @default 1
 *
 * @param Traits
 *
 * @param ElementRate:struct
 * @text Element Rates
 * @parent Traits
 * @type struct<ElementChanges>
 * @desc The elemental damage rates received for this Trait Set.
 * The modifiers are multiplicative.
 * @default {}
 *
 * @param Params:struct
 * @text Basic Parameters
 * @parent Traits
 * @type struct<Params>
 * @desc The basic parameter rates altered by this Trait set.
 * The modifiers are multiplicative.
 * @default {}
 *
 * @param XParams:struct
 * @text X Parameters
 * @parent Traits
 * @type struct<XParams>
 * @desc The X parameter rates altered by this Trait set.
 * The modifiers are additive.
 * @default {}
 *
 * @param SParams:struct
 * @text S Parameters
 * @parent Traits
 * @type struct<SParams>
 * @desc The S parameter rates altered by this Trait set.
 * The modifiers are multiplicative.
 * @default {}
 *
 * @param PassiveStates:arraynum
 * @text Passive States
 * @parent Traits
 * @type state[]
 * @desc Passive states that are applied to this Trait Set.
 * Requires VisuMZ_1_SkillsStatesCore.
 * @default []
 *
 * @param Equipment
 *
 * @param Wtypes:arraynum
 * @text Weapon Types
 * @parent Equipment
 * @type number[]
 * @min 1
 * @max 99
 * @desc Additional weapon types usable by this Trait Set.
 * @default []
 *
 * @param Atypes:arraynum
 * @text Armor Types
 * @parent Equipment
 * @type number[]
 * @min 1
 * @max 99
 * @desc Additional armor types usable by this Trait Set.
 * @default []
 *
 * @param EnemyRewards
 * @text Enemy Rewards
 *
 * @param EXPRate:num
 * @text EXP Rate
 * @parent EnemyRewards
 * @desc EXP rate given by a defeated enemy with this Trait Set.
 * @default 1.00
 *
 * @param GoldRate:num
 * @text Gold Rate
 * @parent EnemyRewards
 * @desc Gold rate given by a defeated enemy with this Trait Set.
 * @default 1.00
 *
 * @param DropRate:num
 * @text Drop Rate
 * @parent EnemyRewards
 * @desc Drop rate given by a defeated enemy with this Trait Set.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * Element Changes
 * ----------------------------------------------------------------------------
 */
/*~struct~ElementChanges:
 *
 * @param Element1:num
 * @text Element 1 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element2:num
 * @text Element 2 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element3:num
 * @text Element 3 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element4:num
 * @text Element 4 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element5:num
 * @text Element 5 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element6:num
 * @text Element 6 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element7:num
 * @text Element 7 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element8:num
 * @text Element 8 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element9:num
 * @text Element 9 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element10:num
 * @text Element 10 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element11:num
 * @text Element 11 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element12:num
 * @text Element 12 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element13:num
 * @text Element 13 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element14:num
 * @text Element 14 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element15:num
 * @text Element 15 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element16:num
 * @text Element 16 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element17:num
 * @text Element 17 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element18:num
 * @text Element 18 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element19:num
 * @text Element 19 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element20:num
 * @text Element 20 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element21:num
 * @text Element 21 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element22:num
 * @text Element 22 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element23:num
 * @text Element 23 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element24:num
 * @text Element 24 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element25:num
 * @text Element 25 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element26:num
 * @text Element 26 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element27:num
 * @text Element 27 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element28:num
 * @text Element 28 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element29:num
 * @text Element 29 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element30:num
 * @text Element 30 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element31:num
 * @text Element 31 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element32:num
 * @text Element 32 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element33:num
 * @text Element 33 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element34:num
 * @text Element 34 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element35:num
 * @text Element 35 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element36:num
 * @text Element 36 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element37:num
 * @text Element 37 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element38:num
 * @text Element 38 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element39:num
 * @text Element 39 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element40:num
 * @text Element 40 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element41:num
 * @text Element 41 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element42:num
 * @text Element 42 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element43:num
 * @text Element 43 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element44:num
 * @text Element 44 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element45:num
 * @text Element 45 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element46:num
 * @text Element 46 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element47:num
 * @text Element 47 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element48:num
 * @text Element 48 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element49:num
 * @text Element 49 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element50:num
 * @text Element 50 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element51:num
 * @text Element 51 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element52:num
 * @text Element 52 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element53:num
 * @text Element 53 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element54:num
 * @text Element 54 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element55:num
 * @text Element 55 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element56:num
 * @text Element 56 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element57:num
 * @text Element 57 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element58:num
 * @text Element 58 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element59:num
 * @text Element 59 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element60:num
 * @text Element 60 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element61:num
 * @text Element 61 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element62:num
 * @text Element 62 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element63:num
 * @text Element 63 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element64:num
 * @text Element 64 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element65:num
 * @text Element 65 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element66:num
 * @text Element 66 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element67:num
 * @text Element 67 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element68:num
 * @text Element 68 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element69:num
 * @text Element 69 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element70:num
 * @text Element 70 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element71:num
 * @text Element 71 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element72:num
 * @text Element 72 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element73:num
 * @text Element 73 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element74:num
 * @text Element 74 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element75:num
 * @text Element 75 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element76:num
 * @text Element 76 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element77:num
 * @text Element 77 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element78:num
 * @text Element 78 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element79:num
 * @text Element 79 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element80:num
 * @text Element 80 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element81:num
 * @text Element 81 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element82:num
 * @text Element 82 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element83:num
 * @text Element 83 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element84:num
 * @text Element 84 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element85:num
 * @text Element 85 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element86:num
 * @text Element 86 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element87:num
 * @text Element 87 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element88:num
 * @text Element 88 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element89:num
 * @text Element 89 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element90:num
 * @text Element 90 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element91:num
 * @text Element 91 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element92:num
 * @text Element 92 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element93:num
 * @text Element 93 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element94:num
 * @text Element 94 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element95:num
 * @text Element 95 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element96:num
 * @text Element 96 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element97:num
 * @text Element 97 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element98:num
 * @text Element 98 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element99:num
 * @text Element 99 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * Basic Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~Params:
 *
 * @param Param0:num
 * @text MaxHP Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param1:num
 * @text MaxMP Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param2:num
 * @text ATK Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param3:num
 * @text DEF Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param4:num
 * @text MAT Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param5:num
 * @text MDF Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param6:num
 * @text AGI Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param7:num
 * @text LUK Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * X Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~XParams:
 *
 * @param XParam0:num
 * @text HIT Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam1:num
 * @text EVA Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam2:num
 * @text CRI Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam3:num
 * @text CEV Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam4:num
 * @text MEV Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam5:num
 * @text MRF Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam6:num
 * @text CNT Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam7:num
 * @text HRG Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam8:num
 * @text MRG Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam9:num
 * @text TRG Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 */
/* ----------------------------------------------------------------------------
 * S Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~SParams:
 *
 * @param SParam0:num
 * @text TGR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam1:num
 * @text GRD Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam2:num
 * @text REC Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam3:num
 * @text PHA Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam4:num
 * @text MCR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam5:num
 * @text TCR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam6:num
 * @text PDR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam7:num
 * @text MDR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam8:num
 * @text FDR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam9:num
 * @text EXR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 */
//=============================================================================

const _0x5708=['SvBattlerSolo-%1-%2','oxMOq','battlerHue','_traitSets','VocabWtype','dfHns','PassiveStates','Game_BattlerBase_refresh','#%1','<%1\x20BATTLER\x20NAME:\x20(.*)>','BattlerHueSolo-%1-%2','textWidth','sparamRateTraitSets','cancel','isEquipAtypeOk','Col%1','JS\x20','NSiyT','additive','statusMenuDmgAbsorb','drawActorGraphic','VocabAtype','commandStyleCheck','traitSetType','Izvdc','getReceiveElementPlus','Alignment','dropItemRate','mainAreaTop','VocabStype','JTXJC','Scene_Status_create','getMenuImage','Bonus','clear','iconText','TraitCol1','\x5cN[%1]','EleDmg','resetTextColor','paramchangeTextColor','Text','_categoryWindow','TCR','pagedown','refreshActorElementStatusCore','multiplicative','StatusMenuList','PDR','setText','Curse','faceHeight','([\x5c+\x5c-]\x5cd+)([%％])','DEFAULT','xparamRate','commandName','process_VisuMZ_ElementStatusCore_RegExp','create','_wtypeWidth','2NmypJV','some','(?:%1|%2)','iVLiE','WbweM','traitCol2','keys','UMKZt','%11','getReceiveElementRate','RegExp','getParamName','addChild','exp','makeMassTraitSetFromNotetags','CSuKw','GRD','dNaiD','drawActorFaceBack','SiMLA','drawProperties','AGI','setBiography','RuleAverageCalcJS','VmnID','_plural','VocabBiography','commandNameWindowCenter','getTraitSet','fontSizeRatio','Resist','elementsAverageRate','EleRecRateJS','commandNameWindowDrawText','onActorChange','WntbF','drawAccess','callUpdateHelp','refreshActor','param','EleDmgFlatJS','product','+%1','EleRecRateFlt','maximum','Variant','XpWdG','_letter','lMxuT','createRandomTraitSet','sort','Game_Actor_setup','JSON','toUpperCase','uiHelpPosition','return\x200','paramValueByName','setItemWindow','Game_BattlerBase_canEquip','status','EXR','getForceReceivedElementRate','DLhhF','Params','test','1199285XHbjiO','qEKJX','\x5cI[%1]%2','width','getDealtElementPlus','EleDmgFlatFlt','EleRecRatePer','getReceiveElementFlat','qiiAO','lAwsX','CvjCK','_itemWindow','RandomValid','traitObjects','innerWidth','weaponTypes','version','EleDmgPlusPer','rtKNP','dropItemRateTraitSets','statusMenuBiography','_stypeWidth','drawItemActorMenuImage','height','traitSet','placeGauge','passiveStates','getActionObjectElements','whjlz','_battleCoreNoElement','onDatabaseLoaded','FUNC','Game_Enemy_name','index','opacity','mainAreaBottom','SubElement','maxCols','vRnfu','setDescriptionFontSizeToTraitSet','elementRate','834131WhzpSg','helpWindowRect','stypeWidth','MCR','TraitCol2','_addingPassiveStateTraitSets','helpAreaHeight','WtypeOk','Icon','makeRandomSingularTraitSetFromNotetags','FmtText','fillRect','Element','IZgkR','drawGeneral','Game_Enemy_exp','drawParamValue','zeySf','xOPee','MRG','makeSingularTraitSetFromNotetags','DrawJS','\x5cC[16]%1:\x20\x5cC[0]%2','elementsRateSum','_actor','wgdeo','zYJug','AtypeOk','elements','MAXMP','wJPJn','lineHeight','xsMZG','PsJSP','Zodiac','XParam%1','add','traitCol1','Rate','note','ARRAYNUM','Gender','EleForceJS','process_VisuMZ_ElementStatusCore_Parameters','Game_Enemy_setLetter','icon','TRAIT_EQUIP_WTYPE','WigSK','Atypes','ceil','RYqTF','categoryWindowRect','VisuMZ_1_MainMenuCore','systemColor','actorId','ActorChangeTraitSetsJS','LHTFG','TGR','StatusMenu','dfaLB','SParams','nameElementStatusCore','hGZHn','67bERaLf','ecmHT','calcUserElementDamageRate','NiAyl','MAXHP','attackElements','Scene_Status_onActorChange','Game_BattlerBase_sparamRate','88888','XAogB','sYBbt','processDrawIcon','EleDmgRateFlt','CEV','initBiography','addLoadListener','EleDmgPlusJS','mOKBh','random','drawItem','updatedLayoutStyle','NIkcR','TRAIT_EQUIP_ATYPE','Biography','nameFormat','Name','189330MSTEfc','floor','Game_Enemy_transform','rFtPJ','elementsMaxRate','basicDataHeight','itemMrf','_helpWindow','ReceivedRateJS','createCategoryWindow','getDealtElementFlat','addCommand','elementsMinRate','JltEX','helpWindowRectElementStatusCore','uiMenuStyle','<%1\x20BATTLER\x20NAMES>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20BATTLER\x20NAMES>','VisuMZ_1_MessageCore','YdJnF','getParameterList','ElementsCol%1','itemPadding','Element-%1','paintOpacity','cvMDG','iconWidth','getAbsorbedElements','mainFontSize','wkjmt','shift','_drawData','drawParamName','Blessing','gaugeBackColor','isPlaytest','SvMotionIdleMass-%1-%2','getForcedActionElement','Step1','reduce','ARRAYSTR','setLetter','statusMenuDmgReceive','STR','commandStyle','Enable','KjlZL','VisuMZ_0_CoreEngine','Nature','onLoadDrawItemActorMenuImage','wdNzY','getElementIdWithName','getElementIDsCol2','HIT','expTotal','changeTextColor','fowHp','innerHeight','FAiYi','Wtypes','<%1FORCE\x20RECEIVED\x20ELEMENT\x20(?:%2|%3)\x20RATE:[\x20]%4>','Game_BattlerBase_sparam','ATK','pHbJO','BattlerNameMass-%1-%2','IvUIs','_atypeWidth','inBattle','match','mYDNS','EVA','transform','setPlural','DLnSB','isActorMenuImageAvailable','drawIcon','isEquipWtypeOk','statusMenuAtype','_cache','VrzsN','applyTraitSetsByObjectNotetag','otWsq','ActorChangeBiographyJS','PHA','EnemyChangeTraitSetsRange','WTMbv','MEV','setDrawData','mNEEJ','zatAS','ATkyN','replace','processRandomizedData','<%1\x20SIDEVIEW\x20BATTLERS>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20SIDEVIEW\x20BATTLERS>','Untitled','RuleAdditiveCalcJS','CJMyd','ExcludeElements','NUM','battlerName','name','_dataWindow','_battleCoreAddedElements','VocabDmgReceive','ARRAYSTRUCT','getDataSystemTypesWidth','statusMenuWtype','resetDescriptionFontSize','EleRecPlusFlt','optDisplayTp','Race','right','setWordWrap','RuleMultiplyCalcJS','EleDmgRateJS','itemTextAlign','round','armorTypes','<%1\x20SIDEVIEW\x20BATTLER:\x20(.*)>','text','EleRec','KaxJY','gold','calcTargetElementRate','applyRandomTraitSets','kQPEK','dShGq','cuGEd','drawFirstCategoryData','drawItemStyleIconText','VrzkY','createElementStatusCore','parameters','average','EleForcePer','BattlerHueMass-%1-%2','format','SvWeaponMass-%1-%2','actor','ElementRules','YHGBh','enemy','EleForceFlt','HRG','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','drawItemStyleIcon','GoldRate','exit','filter','FMHpi','boxWidth','ThhBh','addWindow','process_VisuMZ_ElementStatusCore_Compatible_RegExp','XParams','paramRateTraitSets','ElementStatusCore','drawElements','EnemyNameFmt','includes','getRandomTraitSetFromString','HEXhy','LAXPp','ddpuc','sparamRate','description','CmdStyle','center','minimum','item','WGWiv','level','Scene_Status_refreshActor','(.*)','isMaxLevel','refresh','CmdTextAlign','ActorChangeTraitSetsRange','contentsBack','EleRecFlatJS','oCLot','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)','members','TraitSetSettings','traitsSet','BNsGP','expNext','registerCommand','elementRateRuling','QHEHF','TaRhS','drawItemDarkRect','loadSystem','hue','resetWordWrap','skillTypes','traitSetsEnabled','<%1\x20BATTLER\x20HUE:\x20(\x5cd+)>','EnableLayout','createCommandNameWindow','enMYq','getElementIDsColRaw','<%1DEALT\x20ELEMENT\x20%2\x20%3:[\x20]%4>','SParam%1','fILns','CjStf','Game_Enemy_gold','quOZa','sum','avg','statusMenuStype','thqIe','BackRectColor','setActor','Param%1','statusMenuDmgDealt','length','MRF','ARRAYJSON','elementsRateProduct','windowPadding','MDR','Step1End','createHelpWindow','_resetFontSize','getDealtElementRate','MwPjZ','BJfif','STRUCT','FinalizeRateJS','VShJj','currentClass','activate','iFUeZ','wOapp','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','paramRate','jqnQG','Game_Enemy_dropItemRate','isArray','JqcaM','cwItq','Default','edOpE','<%1\x20SIDEVIEW\x20IDLE\x20MOTION:\x20(.*)>','Step1Start','textSizeEx','KWyUa','_commandNameWindow','getElementIDsCol1','initMembers','Game_Enemy_setPlural','1125319ALVwRr','drawTextEx','===\x20%1\x27s\x20Trait\x20Sets\x20===','checkCacheKey','MultiRule','kYnKp','Symbol','meetsEquipTraitRequirements','resetFontSettings','clearElementChanges','Flat','SvMotionIdleSolo-%1-%2','_biography','getElementIDs','635207ieVSwm','GLKqB','Game_BattlerBase_xparamRate','call','getTraitSetKeys','updateCommandNameWindow','TRG','rDCrc','CNT','goldTraitSets','setup','parse','cxanh','getBiography','drawParamText','recoverAll','setTraitSet','wtypeOkTraitSets','_commandList','TraitDescriptionFontSize','gaugeLineHeight','fDWJV','DEF','prototype','WyhKl','RandomizeEnemy','damage','xparam','initialize','Scene_Boot_onDatabaseLoaded','VisuMZ_1_BattleCore','getTraitSetObject','VFJEe','EZWnD','changePaintOpacity','trim','getElementStatusCoreBackColor','pageup','Description','7758qlzRmv','QsIkp','EVAL','ayesI','Game_BattlerBase_initMembers','textColor','multiply','puqDl','dataWindowRect','loadFace','EleDmgPlusFlt','GBmhG','SvWeaponSolo-%1-%2','Game_Enemy_setup','<%1\x20BATTLER\x20HUES>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20BATTLER\x20HUES>','MDF','logTraitSets','canEquip','kpaCU','REC','ConvertParams','Game_BattlerBase_paramRate','previousActor','expTraitSets','createDataWindow','getParamValue','subject','drawActorLevel','push','itemLineRect','getReflectedElements','getExcludedElementIDs','HjBZX','NCjkN','makeCommandList','EXPRate','iconHeight','Game_BattlerBase_xparam','createSpecialBattlers','isElementNull','clamp','atypeWidth','contents','Display','update','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','wtypeWidth','constructor','calcElementRate','VrBhH','_specialBattler','ARRAYEVAL','RuleMaxCalcJS','EleDmgFlatPer','Bbukz','Settings','(\x5cd+)([%％])','ActorChangeBiographyGroup','loadPicture','BattlerNameSolo-%1-%2','map','Visible','FvfRn','fontSize','remove','LUK','drawText','initElementStatusCore','faceWidth','concat','MAT','_battleCoreForcedElements','koKdk','indexOf','originalName','process_VisuMZ_ElementStatusCore_TraitSets','LPYhP','POrTn','FDR','calcWindowHeight','blt','1INFNsI','split','_elementIDs','AjWPM','log','helpAreaTop','yLanm','Label','CRI','tBHHj','828093YsIUJs','profile','ActorChangeBiographyRange','SeDyT','isRightInputMode','makeTraitSetFromNotetags','hAmgq','LayoutStyle','%1%','========================','process_VisuMZ_ElementStatusCore_Battler_RegExp','setHandler','sparam','getRandomTraitSetFromList','powerUpColor','EleRecFlatFlt','SvBattlerMass-%1-%2','Plus','CTJtx','min','isBottomHelpMode','currentExt','DropRate','maxItems','PYbxc','Element%1','bind','KAtyD','IconSet','calcUserElementDamageFlat','RandomWeight','commandNameWindowDrawBackground','%1:\x20%2','tmJpl','iqqQY','zJxmi','fill','isUseElementStatusCoreUpdatedLayout','xparamRateTraitSets','max','drawActorIcons','YDFwg'];const _0x3e7307=_0xf999;(function(_0x3331aa,_0x598bc3){const _0xe17f75=_0xf999;while(!![]){try{const _0xdb75b9=-parseInt(_0xe17f75(0x302))+-parseInt(_0xe17f75(0x280))+parseInt(_0xe17f75(0x158))*-parseInt(_0xe17f75(0x23f))+parseInt(_0xe17f75(0x1da))+parseInt(_0xe17f75(0x14a))+parseInt(_0xe17f75(0x17f))*parseInt(_0xe17f75(0x2e8))+parseInt(_0xe17f75(0x1d0))*parseInt(_0xe17f75(0x2a9));if(_0xdb75b9===_0x598bc3)break;else _0x3331aa['push'](_0x3331aa['shift']());}catch(_0x218bf4){_0x3331aa['push'](_0x3331aa['shift']());}}}(_0x5708,0x9e46c));var label='ElementStatusCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x2c963f){const _0x284902=_0xf999;return _0x2c963f[_0x284902(0x27a)]&&_0x2c963f['description'][_0x284902(0xed)]('['+label+']');})[0x0];VisuMZ[label][_0x3e7307(0x1b6)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x3e7307(0x193)]=function(_0x55dbe8,_0x3293b8){const _0x52ba90=_0x3e7307;for(const _0x59930a in _0x3293b8){if(_0x59930a[_0x52ba90(0x345)](/(.*):(.*)/i)){const _0x5e0c3c=String(RegExp['$1']),_0xb49fe1=String(RegExp['$2'])[_0x52ba90(0x274)]()[_0x52ba90(0x17b)]();let _0x6af4a4,_0x52a9da,_0x530df1;switch(_0xb49fe1){case _0x52ba90(0xb0):_0x6af4a4=_0x3293b8[_0x59930a]!==''?Number(_0x3293b8[_0x59930a]):0x0;break;case _0x52ba90(0x2d1):_0x52a9da=_0x3293b8[_0x59930a]!==''?JSON['parse'](_0x3293b8[_0x59930a]):[],_0x6af4a4=_0x52a9da[_0x52ba90(0x1bb)](_0x3b3d08=>Number(_0x3b3d08));break;case _0x52ba90(0x181):_0x6af4a4=_0x3293b8[_0x59930a]!==''?eval(_0x3293b8[_0x59930a]):null;break;case _0x52ba90(0x1b2):_0x52a9da=_0x3293b8[_0x59930a]!==''?JSON[_0x52ba90(0x163)](_0x3293b8[_0x59930a]):[],_0x6af4a4=_0x52a9da[_0x52ba90(0x1bb)](_0x4d339f=>eval(_0x4d339f));break;case _0x52ba90(0x273):_0x6af4a4=_0x3293b8[_0x59930a]!==''?JSON[_0x52ba90(0x163)](_0x3293b8[_0x59930a]):'';break;case _0x52ba90(0x128):_0x52a9da=_0x3293b8[_0x59930a]!==''?JSON[_0x52ba90(0x163)](_0x3293b8[_0x59930a]):[],_0x6af4a4=_0x52a9da[_0x52ba90(0x1bb)](_0x1631b8=>JSON[_0x52ba90(0x163)](_0x1631b8));break;case _0x52ba90(0x29f):_0x6af4a4=_0x3293b8[_0x59930a]!==''?new Function(JSON[_0x52ba90(0x163)](_0x3293b8[_0x59930a])):new Function(_0x52ba90(0x276));break;case'ARRAYFUNC':_0x52a9da=_0x3293b8[_0x59930a]!==''?JSON[_0x52ba90(0x163)](_0x3293b8[_0x59930a]):[],_0x6af4a4=_0x52a9da[_0x52ba90(0x1bb)](_0x2e81a4=>new Function(JSON[_0x52ba90(0x163)](_0x2e81a4)));break;case _0x52ba90(0x32c):_0x6af4a4=_0x3293b8[_0x59930a]!==''?String(_0x3293b8[_0x59930a]):'';break;case _0x52ba90(0x329):_0x52a9da=_0x3293b8[_0x59930a]!==''?JSON[_0x52ba90(0x163)](_0x3293b8[_0x59930a]):[],_0x6af4a4=_0x52a9da[_0x52ba90(0x1bb)](_0x498ba7=>String(_0x498ba7));break;case _0x52ba90(0x132):_0x530df1=_0x3293b8[_0x59930a]!==''?JSON[_0x52ba90(0x163)](_0x3293b8[_0x59930a]):{},_0x55dbe8[_0x5e0c3c]={},VisuMZ[_0x52ba90(0x193)](_0x55dbe8[_0x5e0c3c],_0x530df1);continue;case _0x52ba90(0xb6):_0x52a9da=_0x3293b8[_0x59930a]!==''?JSON[_0x52ba90(0x163)](_0x3293b8[_0x59930a]):[],_0x6af4a4=_0x52a9da[_0x52ba90(0x1bb)](_0x78788b=>VisuMZ[_0x52ba90(0x193)]({},JSON[_0x52ba90(0x163)](_0x78788b)));break;default:continue;}_0x55dbe8[_0x5e0c3c]=_0x6af4a4;}}return _0x55dbe8;},(_0x4189ee=>{const _0x1c2188=_0x3e7307,_0xff3bea=_0x4189ee[_0x1c2188(0xb2)];for(const _0x50bbdf of dependencies){if(_0x1c2188(0x11a)!=='dXzdK'){if(!Imported[_0x50bbdf]){if(_0x1c2188(0x107)==='jCkxf'){function _0x54b12a(){const _0x34992e=_0x1c2188;if(_0x318361[_0x34992e(0x345)](/(.*):[ ](.*)/i)){const _0x5c8912=_0x467b72(_0xd24efc['$1'])[_0x34992e(0x274)]()['trim'](),_0x424247=_0x1c94a0(_0x433d58['$2']),_0x4a4e0f=_0x5d14b2[_0x5c8912];_0x4a4e0f&&(_0x74a4bd[_0x4a4e0f]=this[_0x34992e(0xee)](_0x424247));}}}else{alert(_0x1c2188(0x1ac)[_0x1c2188(0xd6)](_0xff3bea,_0x50bbdf)),SceneManager[_0x1c2188(0xe1)]();break;}}}else{function _0x4e793c(){const _0x306992=_0x1c2188;if(this[_0x306992(0x295)])return this[_0x306992(0x295)];return this[_0x306992(0x295)]=this['getDataSystemTypesWidth'](_0x44ad63[_0x306992(0x111)]),this[_0x306992(0x295)];}}}const _0x47b5=_0x4189ee[_0x1c2188(0xf3)];if(_0x47b5[_0x1c2188(0x345)](/\[Version[ ](.*?)\]/i)){const _0xd40adf=Number(RegExp['$1']);_0xd40adf!==VisuMZ[label][_0x1c2188(0x290)]&&(alert(_0x1c2188(0x139)['format'](_0xff3bea,_0xd40adf)),SceneManager[_0x1c2188(0xe1)]());}if(_0x47b5[_0x1c2188(0x345)](/\[Tier[ ](\d+)\]/i)){const _0x34c855=Number(RegExp['$1']);_0x34c855<tier?(alert(_0x1c2188(0xde)[_0x1c2188(0xd6)](_0xff3bea,_0x34c855,tier)),SceneManager[_0x1c2188(0xe1)]()):tier=Math[_0x1c2188(0x201)](_0x34c855,tier);}VisuMZ[_0x1c2188(0x193)](VisuMZ[label][_0x1c2188(0x1b6)],_0x4189ee[_0x1c2188(0xd2)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x3e7307(0xb2)],_0x3e7307(0x1b8),_0x3e0ef8=>{const _0x2d09e5=_0x3e7307;VisuMZ[_0x2d09e5(0x193)](_0x3e0ef8,_0x3e0ef8);const _0x2da153=_0x3e0ef8[_0x2d09e5(0x327)];for(const _0x12858e of _0x2da153){const _0x3067e0=$gameActors['actor'](_0x12858e);if(!_0x3067e0)continue;_0x3067e0[_0x2d09e5(0x255)](_0x3e0ef8[_0x2d09e5(0x2ff)][_0x2d09e5(0xd6)](_0x2d09e5(0x229)[_0x2d09e5(0xd6)](_0x3067e0[_0x2d09e5(0x2df)]())));}}),PluginManager['registerCommand'](pluginData[_0x3e7307(0xb2)],_0x3e7307(0x1dc),_0x3acec8=>{const _0x3e1a9b=_0x3e7307;VisuMZ[_0x3e1a9b(0x193)](_0x3acec8,_0x3acec8);const _0x12cbee=_0x3acec8[_0x3e1a9b(0x12c)]>=_0x3acec8[_0x3e1a9b(0x143)]?_0x3acec8[_0x3e1a9b(0x143)]:_0x3acec8[_0x3e1a9b(0x12c)],_0x47c2fe=_0x3acec8[_0x3e1a9b(0x12c)]>=_0x3acec8[_0x3e1a9b(0x143)]?_0x3acec8[_0x3e1a9b(0x12c)]:_0x3acec8['Step1Start'],_0x47e293=Array(_0x47c2fe-_0x12cbee+0x1)[_0x3e1a9b(0x1fe)]()[_0x3e1a9b(0x1bb)]((_0x3e0fd0,_0xaf6fe9)=>_0x12cbee+_0xaf6fe9);for(const _0x5d6b42 of _0x47e293){const _0x4bbf31=$gameActors[_0x3e1a9b(0xd8)](_0x5d6b42);if(!_0x4bbf31)continue;_0x4bbf31[_0x3e1a9b(0x255)](_0x3acec8['Biography'][_0x3e1a9b(0xd6)](_0x3e1a9b(0x229)[_0x3e1a9b(0xd6)](_0x4bbf31[_0x3e1a9b(0x2df)]())));}}),PluginManager['registerCommand'](pluginData['name'],_0x3e7307(0xa0),_0x4eb2f4=>{const _0xe51546=_0x3e7307;VisuMZ['ConvertParams'](_0x4eb2f4,_0x4eb2f4);const _0x2bf3b7=_0x4eb2f4[_0xe51546(0x327)];let _0x5c4146=[];while(_0x2bf3b7[_0xe51546(0x126)]>0x0){const _0x5b7c29=_0x2bf3b7[_0xe51546(0x31f)]();Array[_0xe51546(0x13d)](_0x5b7c29)?_0x5c4146=_0x5c4146['concat'](_0x5b7c29):_0x5c4146[_0xe51546(0x19b)](_0x5b7c29);}for(const _0x293ead of _0x5c4146){const _0x27b3dd=$gameActors[_0xe51546(0xd8)](_0x293ead);if(!_0x27b3dd)continue;_0x27b3dd[_0xe51546(0x255)](_0x4eb2f4['Biography'][_0xe51546(0xd6)](_0xe51546(0x229)[_0xe51546(0xd6)](_0x27b3dd[_0xe51546(0x2df)]())));}}),PluginManager['registerCommand'](pluginData[_0x3e7307(0xb2)],'ActorChangeTraitSetsGroup',_0x537054=>{const _0x543bc6=_0x3e7307;VisuMZ['ConvertParams'](_0x537054,_0x537054);const _0x37c944=_0x537054[_0x543bc6(0x327)],_0x480912=Game_BattlerBase[_0x543bc6(0x16f)][_0x543bc6(0x15c)]();for(const _0x1c8334 of _0x37c944){const _0x4b2cf6=$gameActors['actor'](_0x1c8334);if(!_0x4b2cf6)continue;for(const _0x15ee62 of _0x480912){if(!_0x537054[_0x15ee62])continue;if(_0x537054[_0x15ee62]['match'](/UNCHANGED/i))continue;if(_0x537054[_0x15ee62]['match'](/RANDOM/i))_0x4b2cf6['createRandomTraitSet'](_0x15ee62);else{if('wJPJn'===_0x543bc6(0x2c7))_0x4b2cf6[_0x543bc6(0x168)](_0x15ee62,_0x537054[_0x15ee62]);else{function _0x660b72(){const _0x33fc49=_0x543bc6;_0xc784f9[_0x33fc49(0x16f)]['create'][_0x33fc49(0x15b)](this),this[_0x33fc49(0x12d)](),this[_0x33fc49(0x30b)](),this[_0x33fc49(0x197)]();}}}}}}),PluginManager[_0x3e7307(0x109)](pluginData[_0x3e7307(0xb2)],_0x3e7307(0xff),_0x551d03=>{const _0x23777a=_0x3e7307;VisuMZ['ConvertParams'](_0x551d03,_0x551d03);const _0x4a6af7=_0x551d03[_0x23777a(0x12c)]>=_0x551d03[_0x23777a(0x143)]?_0x551d03[_0x23777a(0x143)]:_0x551d03[_0x23777a(0x12c)],_0x2d6908=_0x551d03[_0x23777a(0x12c)]>=_0x551d03['Step1Start']?_0x551d03[_0x23777a(0x12c)]:_0x551d03[_0x23777a(0x143)],_0x55349d=Array(_0x2d6908-_0x4a6af7+0x1)[_0x23777a(0x1fe)]()[_0x23777a(0x1bb)]((_0x1905b5,_0x419932)=>_0x4a6af7+_0x419932),_0x5f1f81=Game_BattlerBase[_0x23777a(0x16f)][_0x23777a(0x15c)]();for(const _0x4ec927 of _0x55349d){const _0x24c7a1=$gameActors[_0x23777a(0xd8)](_0x4ec927);if(!_0x24c7a1)continue;for(const _0x19651a of _0x5f1f81){if(!_0x551d03[_0x19651a])continue;if(_0x551d03[_0x19651a][_0x23777a(0x345)](/UNCHANGED/i))continue;_0x551d03[_0x19651a][_0x23777a(0x345)](/RANDOM/i)?_0x24c7a1['createRandomTraitSet'](_0x19651a):_0x24c7a1[_0x23777a(0x168)](_0x19651a,_0x551d03[_0x19651a]);}}}),PluginManager[_0x3e7307(0x109)](pluginData[_0x3e7307(0xb2)],_0x3e7307(0x2e0),_0x5786f8=>{const _0x2c0008=_0x3e7307;VisuMZ['ConvertParams'](_0x5786f8,_0x5786f8);const _0xcea2d8=_0x5786f8[_0x2c0008(0x327)];let _0xc70c73=[];while(_0xcea2d8[_0x2c0008(0x126)]>0x0){const _0x17e578=_0xcea2d8[_0x2c0008(0x31f)]();Array[_0x2c0008(0x13d)](_0x17e578)?_0xc70c73=_0xc70c73[_0x2c0008(0x1c4)](_0x17e578):_0xc70c73['push'](_0x17e578);}const _0x18d93c=Game_BattlerBase[_0x2c0008(0x16f)][_0x2c0008(0x15c)]();for(const _0x2835c4 of _0xc70c73){const _0x5a544e=$gameActors['actor'](_0x2835c4);if(!_0x5a544e)continue;for(const _0x447d7e of _0x18d93c){if(!_0x5786f8[_0x447d7e])continue;if(_0x5786f8[_0x447d7e]['match'](/UNCHANGED/i))continue;if(_0x5786f8[_0x447d7e][_0x2c0008(0x345)](/RANDOM/i)){if(_0x2c0008(0x11d)===_0x2c0008(0x27d)){function _0x1717cf(){const _0x5931b1=_0x2c0008,_0x49c028=_0xa7c8e0[_0x5931b1(0x2d0)],_0x3c0a15={'Element':/<RANDOM ELEMENT>\s*([\s\S]*)\s*<\/RANDOM ELEMENT>/i,'SubElement':/<RANDOM SUBELEMENT>\s*([\s\S]*)\s*<\/RANDOM SUBELEMENT>/i,'Gender':/<RANDOM GENDER>\s*([\s\S]*)\s*<\/RANDOM GENDER>/i,'Race':/<RANDOM RACE>\s*([\s\S]*)\s*<\/RANDOM RACE>/i,'Nature':/<RANDOM NATURE>\s*([\s\S]*)\s*<\/RANDOM NATURE>/i,'Alignment':/<RANDOM ALIGNMENT>\s*([\s\S]*)\s*<\/RANDOM ALIGNMENT>/i,'Blessing':/<RANDOM BLESSING>\s*([\s\S]*)\s*<\/RANDOM BLESSING>/i,'Curse':/<RANDOM CURSE>\s*([\s\S]*)\s*<\/RANDOM CURSE>/i,'Zodiac':/<RANDOM ZODIAC>\s*([\s\S]*)\s*<\/RANDOM ZODIAC>/i,'Variant':/<RANDOM VARIANT>\s*([\s\S]*)\s*<\/RANDOM VARIANT>/i};for(const _0x5687b8 in _0x3c0a15){const _0x10321d=_0x3c0a15[_0x5687b8];if(_0x49c028['match'](_0x10321d)){const _0x45d6a2=_0x6a7708(_0x202df0['$1'])['split'](/[\r\n]+/)[_0x5931b1(0x1bf)]('');_0x3e4853[_0x5687b8]=this[_0x5931b1(0xaa)](_0x45d6a2);}}}}else _0x5a544e[_0x2c0008(0x270)](_0x447d7e);}else _0x5a544e['setTraitSet'](_0x447d7e,_0x5786f8[_0x447d7e]);}}}),PluginManager[_0x3e7307(0x109)](pluginData[_0x3e7307(0xb2)],'EnemyChangeTraitSetsGroup',_0x1847f8=>{const _0x23abf9=_0x3e7307;if(!$gameParty[_0x23abf9(0x344)]())return;VisuMZ[_0x23abf9(0x193)](_0x1847f8,_0x1847f8);const _0x4e52a9=_0x1847f8[_0x23abf9(0x327)],_0x1656d0=Game_BattlerBase['prototype'][_0x23abf9(0x15c)]();for(const _0x422573 of _0x4e52a9){const _0x5d1250=$gameTroop[_0x23abf9(0x104)]()[_0x422573];if(!_0x5d1250)continue;for(const _0x533558 of _0x1656d0){if(!_0x1847f8[_0x533558])continue;if(_0x1847f8[_0x533558][_0x23abf9(0x345)](/UNCHANGED/i))continue;if(_0x1847f8[_0x533558][_0x23abf9(0x345)](/RANDOM/i))_0x5d1250[_0x23abf9(0x270)](_0x533558);else{if(_0x23abf9(0xcc)!==_0x23abf9(0x186))_0x5d1250[_0x23abf9(0x168)](_0x533558,_0x1847f8[_0x533558]);else{function _0x4cbfcf(){const _0x258e7d=_0x23abf9,_0x219347=_0x502572['traitSetType'](_0x20a027),_0x1a69bb=_0x294f7f[_0x258e7d(0x298)](_0x548af4);this[_0x258e7d(0x10d)](0x0,_0x4e0562,_0x433687,_0x43340f,0x2);const _0x988687='\x5cC[16]%1:\x20\x5cC[0]%2'[_0x258e7d(0xd6)](_0x219347[_0x258e7d(0x1d7)],_0x1a69bb['Display']);this[_0x258e7d(0x14b)](_0x988687,_0x350086,_0x4b7c5c,_0x15e591-_0x38aade*0x2),_0x5fd16d+=_0x20bd9d,this[_0x258e7d(0x2a7)](),this['drawItemDarkRect'](0x0,_0x137dbb,_0x36bbf3,_0x3ef37f),this[_0x258e7d(0x14b)](_0x1a69bb[_0x258e7d(0x17e)],_0x559147,_0x1d3f9e,_0x5b8f19-_0x5a9735*0x2),_0x27d1cb+=_0x3c1a52,this[_0x258e7d(0xb9)]();}}}}}}),PluginManager[_0x3e7307(0x109)](pluginData[_0x3e7307(0xb2)],_0x3e7307(0xa2),_0x13b1c2=>{const _0x335f30=_0x3e7307;if(!$gameParty[_0x335f30(0x344)]())return;VisuMZ[_0x335f30(0x193)](_0x13b1c2,_0x13b1c2);const _0x64a84b=_0x13b1c2[_0x335f30(0x12c)]>=_0x13b1c2[_0x335f30(0x143)]?_0x13b1c2['Step1Start']:_0x13b1c2[_0x335f30(0x12c)],_0x13e006=_0x13b1c2[_0x335f30(0x12c)]>=_0x13b1c2['Step1Start']?_0x13b1c2['Step1End']:_0x13b1c2[_0x335f30(0x143)],_0x4fff63=Array(_0x13e006-_0x64a84b+0x1)[_0x335f30(0x1fe)]()['map']((_0x26417d,_0xa42072)=>_0x64a84b+_0xa42072),_0x4bd3a6=Game_BattlerBase[_0x335f30(0x16f)][_0x335f30(0x15c)]();for(const _0x3404d6 of _0x4fff63){const _0x1981a8=$gameTroop[_0x335f30(0x104)]()[_0x3404d6];if(!_0x1981a8)continue;for(const _0x516f8a of _0x4bd3a6){if(!_0x13b1c2[_0x516f8a])continue;if(_0x13b1c2[_0x516f8a][_0x335f30(0x345)](/UNCHANGED/i))continue;if(_0x13b1c2[_0x516f8a][_0x335f30(0x345)](/RANDOM/i))_0x1981a8[_0x335f30(0x270)](_0x516f8a);else{if(_0x335f30(0x137)!==_0x335f30(0x137)){function _0x4e301c(){const _0x2822c4=_0x335f30;var _0x3438b1=_0x2f2e8b(_0x4a67fc['$1']);try{return _0x35c8f2(_0x3438b1);}catch(_0x4e5b05){if(_0x13e000['isPlaytest']())_0x44efa3[_0x2822c4(0x1d4)](_0x4e5b05);return![];}}}else _0x1981a8[_0x335f30(0x168)](_0x516f8a,_0x13b1c2[_0x516f8a]);}}}}),PluginManager['registerCommand'](pluginData[_0x3e7307(0xb2)],'EnemyChangeTraitSetsJS',_0x33de03=>{const _0x3b8766=_0x3e7307;if(!$gameParty[_0x3b8766(0x344)]())return;VisuMZ[_0x3b8766(0x193)](_0x33de03,_0x33de03);const _0x3bdf81=_0x33de03[_0x3b8766(0x327)];let _0x3f5e0f=[];while(_0x3bdf81[_0x3b8766(0x126)]>0x0){if(_0x3b8766(0x2a6)===_0x3b8766(0x205)){function _0x1434d4(){const _0x1d23ef=_0x3b8766;this[_0x1d23ef(0x99)](_0xb028b2,_0x45cab5['x'],_0x50943e['y']+0x2);}}else{const _0x10c101=_0x3bdf81[_0x3b8766(0x31f)]();if(Array[_0x3b8766(0x13d)](_0x10c101)){if(_0x3b8766(0x1d3)!=='iPjTd')_0x3f5e0f=_0x3f5e0f[_0x3b8766(0x1c4)](_0x10c101);else{function _0x3ff14b(){const _0x141d84=_0x3b8766,_0x3a5328=_0x3cbe83[_0x141d84(0x21b)](_0x455c22);return _0x3a5328&&_0x3a5328[_0x141d84(0x1bc)];}}}else{if('gnbGp'==='GrFOR'){function _0x490e9a(){const _0x27de14=_0x3b8766;this[_0x27de14(0x2c1)]!==_0xdf9efb&&(this['_actor']=_0x525700,this[_0x27de14(0xfd)]());}}else _0x3f5e0f[_0x3b8766(0x19b)](_0x10c101);}}}const _0x5e70d1=Game_BattlerBase['prototype'][_0x3b8766(0x15c)]();for(const _0x11b69f of _0x3f5e0f){const _0x34eb7e=$gameTroop[_0x3b8766(0x104)]()[_0x11b69f];if(!_0x34eb7e)continue;for(const _0x24a126 of _0x5e70d1){if(!_0x33de03[_0x24a126])continue;if(_0x33de03[_0x24a126][_0x3b8766(0x345)](/UNCHANGED/i))continue;_0x33de03[_0x24a126]['match'](/RANDOM/i)?_0x34eb7e[_0x3b8766(0x270)](_0x24a126):_0x34eb7e[_0x3b8766(0x168)](_0x24a126,_0x33de03[_0x24a126]);}}}),VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x175)]=Scene_Boot[_0x3e7307(0x16f)]['onDatabaseLoaded'],Scene_Boot[_0x3e7307(0x16f)][_0x3e7307(0x29e)]=function(){const _0x1da8b8=_0x3e7307;VisuMZ[_0x1da8b8(0xea)]['Scene_Boot_onDatabaseLoaded'][_0x1da8b8(0x15b)](this),this[_0x1da8b8(0x2d4)](),this[_0x1da8b8(0x1ca)](),this['process_VisuMZ_ElementStatusCore_RegExp'](),this['process_VisuMZ_ElementStatusCore_Battler_RegExp'](),this[_0x1da8b8(0xe7)]();},Scene_Boot[_0x3e7307(0x16f)]['process_VisuMZ_ElementStatusCore_Parameters']=function(){const _0x332251=_0x3e7307,_0x17ab12=VisuMZ[_0x332251(0xea)][_0x332251(0x1b6)][_0x332251(0x105)];Window_StatusData[_0x332251(0x2ce)]=(_0x17ab12[_0x332251(0x228)]||Window_StatusData['traitCol1'])['filter'](_0x5a3b57=>{const _0x4d08d6=_0x332251,_0x15906b=DataManager[_0x4d08d6(0x21b)](_0x5a3b57);return _0x15906b&&_0x15906b['Visible'];}),Window_StatusData['traitCol2']=(_0x17ab12[_0x332251(0x2ad)]||Window_StatusData[_0x332251(0x244)])[_0x332251(0xe2)](_0x260d34=>{const _0x3ba5cb=_0x332251;if('KaxJY'===_0x3ba5cb(0xc7)){const _0x654b3=DataManager[_0x3ba5cb(0x21b)](_0x260d34);return _0x654b3&&_0x654b3[_0x3ba5cb(0x1bc)];}else{function _0x416b00(){const _0x1c2f14=_0x3ba5cb;_0x5250c2[_0x1c2f14(0xea)][_0x1c2f14(0x223)][_0x1c2f14(0x15b)](this);}}});},Scene_Boot[_0x3e7307(0x16f)]['process_VisuMZ_ElementStatusCore_TraitSets']=function(){const _0x88504f=_0x3e7307,_0x3ac009=VisuMZ[_0x88504f(0xea)]['Settings'],_0x1b0da8=Game_BattlerBase[_0x88504f(0x16f)][_0x88504f(0x15c)]();DataManager[_0x88504f(0x207)]={};for(const _0x2cd62f of _0x1b0da8){if(_0x88504f(0x2fd)===_0x88504f(0x31e)){function _0x5029e0(){const _0x1d893c=_0x88504f;_0x5c65e6=_0x43aa65['toUpperCase']()[_0x1d893c(0x17b)]();const _0x6f2149=[_0x1d893c(0x2ec),'MAXMP',_0x1d893c(0x33f),_0x1d893c(0x16e),_0x1d893c(0x1c5),'MDF',_0x1d893c(0x254),'LUK'],_0x1c70a5=['HIT',_0x1d893c(0x94),_0x1d893c(0x1d8),_0x1d893c(0x2f5),'MEV',_0x1d893c(0x127),_0x1d893c(0x160),_0x1d893c(0xdd),_0x1d893c(0x2bc),_0x1d893c(0x15e)],_0x28b6b9=['TGR','GRD',_0x1d893c(0x192),_0x1d893c(0xa1),'MCR','TCR',_0x1d893c(0x234),_0x1d893c(0x12b),'FDR',_0x1d893c(0x27b)];if(_0x6f2149[_0x1d893c(0xed)](_0x1fa010))return _0x2e67bc[_0x1d893c(0x266)](_0x6f2149[_0x1d893c(0x1c8)](_0x430e0a));return _0x51db0e;}}else{const _0x4508f3=_0x2cd62f[_0x88504f(0x274)]()[_0x88504f(0x17b)]();DataManager['_traitSets'][_0x4508f3]={},DataManager[_0x88504f(0x207)][_0x4508f3][_0x88504f(0x239)]=_0x3ac009[_0x2cd62f]['Default'];const _0x1090de=_0x3ac009[_0x2cd62f][_0x88504f(0x140)][_0x88504f(0x301)][_0x88504f(0x274)]()[_0x88504f(0x17b)]();DataManager[_0x88504f(0x207)][_0x4508f3][_0x1090de]=_0x3ac009[_0x2cd62f][_0x88504f(0x140)];const _0x5bdf24=_0x3ac009[_0x2cd62f]['List'];for(const _0x220bc4 of _0x5bdf24){if('Gwwpd'===_0x88504f(0x10b)){function _0x3596fe(){const _0x503645=_0x88504f;return _0x106e4a[_0x503645(0x266)](_0x43407d['indexOf'](_0x3eccda));}}else{const _0x4f4162=_0x220bc4['Name'][_0x88504f(0x274)]()[_0x88504f(0x17b)]();DataManager[_0x88504f(0x207)][_0x4508f3][_0x4f4162]=_0x220bc4;}}}}},VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x249)]={},Scene_Boot['prototype'][_0x3e7307(0x23c)]=function(){const _0x36a644=_0x3e7307,_0x195820=VisuMZ['ElementStatusCore'][_0x36a644(0x249)],_0xcf26c=$dataSystem[_0x36a644(0x2c5)],_0x1ec32e='<%1RECEIVED\x20ELEMENT\x20%2\x20%3:[\x20]%4>',_0x63f6aa=_0x36a644(0x118),_0x13b9c4=_0x36a644(0x1b7),_0x4251d7='(\x5cd+\x5c.?\x5cd+)',_0x5e78b6=_0x36a644(0x238),_0x5626e0=_0x36a644(0x103),_0x371c77=_0x36a644(0xfb),_0x40d469=[_0x36a644(0xc6),_0x36a644(0x22a)],_0x56cbbb=[_0x36a644(0x1eb),_0x36a644(0x2cf),_0x36a644(0x154)],_0x3d5060=['Per','Flt','JS'],_0x1c7151=[_0x5e78b6,_0x5626e0,_0x371c77],_0x39b273=[_0x13b9c4,_0x4251d7,_0x371c77],_0x545991=_0x36a644(0x33d);_0x195820[_0x36a644(0xd4)]=[],_0x195820[_0x36a644(0xdc)]=[],_0x195820[_0x36a644(0x2d3)]=[];for(let _0x22c9e8=0x0;_0x22c9e8<_0xcf26c[_0x36a644(0x126)];_0x22c9e8++){let _0x503899=_0xcf26c[_0x22c9e8][_0x36a644(0x274)]()[_0x36a644(0x17b)]();_0x503899=_0x503899[_0x36a644(0xa9)](/\x1I\[(\d+)\]/gi,''),_0x503899=_0x503899[_0x36a644(0xa9)](/\\I\[(\d+)\]/gi,'');for(const _0x4338e0 of _0x40d469){for(const _0x596600 of _0x56cbbb){if(_0x36a644(0x2ca)!==_0x36a644(0x2ca)){function _0x54726d(){const _0x3acf57=_0x36a644;if(!_0x44719f[_0x3acf57(0x112)]())return[];let _0x108dd1=[];const _0x55b3dd=this[_0x3acf57(0x15c)]();for(const _0xe1bd33 of _0x55b3dd){const _0x5683d4=this['getTraitSet'](_0xe1bd33),_0x29017a=_0x3836af[_0x3acf57(0x298)](_0xe1bd33,_0x5683d4);_0x108dd1=_0x108dd1[_0x3acf57(0x1c4)](_0x29017a[_0x3acf57(0x33c)]);}return _0x108dd1;}}else for(const _0x10d119 of _0x3d5060){const _0x1888df='%1%2%3'['format'](_0x4338e0,_0x596600,_0x10d119);_0x195820[_0x1888df]=_0x195820[_0x1888df]||[];const _0x38c168=_0x4338e0==='EleRec'?_0x1ec32e:_0x63f6aa,_0xe6e59b=_0x10d119[_0x36a644(0x345)](/JS/i)?'JS\x20':'',_0x593c75=_0x36a644(0x241)[_0x36a644(0xd6)](_0x503899,_0x22c9e8),_0x5e25b7=_0x596600[_0x36a644(0x274)](),_0x2d052f=_0x596600[_0x36a644(0x345)](/RATE/i)?_0x39b273:_0x1c7151,_0x7497f4=_0x2d052f[_0x3d5060[_0x36a644(0x1c8)](_0x10d119)];_0x195820[_0x1888df][_0x22c9e8]=new RegExp(_0x38c168[_0x36a644(0xd6)](_0xe6e59b,_0x593c75,_0x5e25b7,_0x7497f4),'i');}}}_0x195820[_0x36a644(0xd4)][_0x22c9e8]=new RegExp(_0x545991[_0x36a644(0xd6)]('',_0x503899,_0x22c9e8,_0x13b9c4),'i'),_0x195820[_0x36a644(0xdc)][_0x22c9e8]=new RegExp(_0x545991['format']('',_0x503899,_0x22c9e8,_0x4251d7),'i'),_0x195820[_0x36a644(0x2d3)][_0x22c9e8]=new RegExp(_0x545991[_0x36a644(0xd6)](_0x36a644(0x214),_0x503899,_0x22c9e8,_0x371c77),'i');}},Scene_Boot[_0x3e7307(0x16f)][_0x3e7307(0x1e4)]=function(){const _0x406fb4=_0x3e7307,_0x4d1feb=Game_BattlerBase['prototype'][_0x406fb4(0x15c)](),_0x1286b3=_0x406fb4(0x20d),_0xb5d5dd=_0x406fb4(0x113),_0x1f5471=_0x406fb4(0x312),_0x409ff5=_0x406fb4(0x18d);for(const _0x3d89f7 of _0x4d1feb){const _0x25a77a=_0x3d89f7[_0x406fb4(0x274)]()[_0x406fb4(0x17b)]();for(const _0x146b05 in DataManager[_0x406fb4(0x207)][_0x25a77a]){if(_0x406fb4(0x1d9)!==_0x406fb4(0x130)){const _0x4636c2=_0x406fb4(0x1ba)[_0x406fb4(0xd6)](_0x25a77a,_0x146b05);VisuMZ['ElementStatusCore'][_0x406fb4(0x249)][_0x4636c2]=new RegExp(_0x1286b3[_0x406fb4(0xd6)](_0x146b05),'i');const _0xaf3fbe='BattlerHueSolo-%1-%2'[_0x406fb4(0xd6)](_0x25a77a,_0x146b05);VisuMZ[_0x406fb4(0xea)][_0x406fb4(0x249)][_0xaf3fbe]=new RegExp(_0xb5d5dd[_0x406fb4(0xd6)](_0x146b05),'i');const _0x2f3857=_0x406fb4(0x341)[_0x406fb4(0xd6)](_0x25a77a,_0x146b05);VisuMZ[_0x406fb4(0xea)]['RegExp'][_0x2f3857]=new RegExp(_0x1f5471[_0x406fb4(0xd6)](_0x146b05),'i');const _0x522f25=_0x406fb4(0xd5)[_0x406fb4(0xd6)](_0x25a77a,_0x146b05);VisuMZ[_0x406fb4(0xea)][_0x406fb4(0x249)][_0x522f25]=new RegExp(_0x409ff5[_0x406fb4(0xd6)](_0x146b05),'i');}else{function _0xd13099(){const _0x364c04=_0x406fb4,_0x3ddb48=_0x364c04(0x204)['format'](_0x2e56dd,_0x128d1b);_0x30917d[_0x364c04(0xea)][_0x364c04(0x249)][_0x3ddb48]=new _0x574320(_0x3ff56c['format'](_0x235d19),'i');const _0x361887=_0x364c04(0x18b)[_0x364c04(0xd6)](_0x1d692a,_0x5aeee5);_0x4e4580[_0x364c04(0xea)][_0x364c04(0x249)][_0x361887]=new _0xd8520b(_0x4b58a9[_0x364c04(0xd6)](_0x521f43),'i');const _0x601bf6=_0x364c04(0x155)[_0x364c04(0xd6)](_0x4ccae7,_0x3003b7);_0x168278[_0x364c04(0xea)][_0x364c04(0x249)][_0x601bf6]=new _0x22631b(_0x2f88fa[_0x364c04(0xd6)](_0x1d6fd7),'i');const _0x39e4cb=_0x364c04(0x1ea)[_0x364c04(0xd6)](_0x35956f,_0x14b838);_0x49b642['ElementStatusCore'][_0x364c04(0x249)][_0x39e4cb]=new _0x5e47e5(_0x3c9e8e[_0x364c04(0xd6)](_0x3990b6),'i');const _0x46fed7=_0x364c04(0xd7)[_0x364c04(0xd6)](_0x50024c,_0x2fd7d1);_0x12deac['ElementStatusCore']['RegExp'][_0x46fed7]=new _0x2610ed(_0x8e4273[_0x364c04(0xd6)](_0x728ca4),'i');const _0x184c55=_0x364c04(0x325)[_0x364c04(0xd6)](_0x446bfc,_0x5d73fb);_0x26b6e1[_0x364c04(0xea)][_0x364c04(0x249)][_0x184c55]=new _0x4881ff(_0x3519bf['format'](_0x157691),'i');}}}}},Scene_Boot[_0x3e7307(0x16f)]['process_VisuMZ_ElementStatusCore_Compatible_RegExp']=function(){const _0x5f34ac=_0x3e7307,_0x38e481=Game_BattlerBase[_0x5f34ac(0x16f)][_0x5f34ac(0x15c)]();if(Imported[_0x5f34ac(0x176)]){if(_0x5f34ac(0x1b0)==='VrBhH'){const _0x442dc3=_0x5f34ac(0xc4),_0x18ef53='<%1\x20SIDEVIEW\x20WEAPON:\x20(.*)>',_0xe1a0e5=_0x5f34ac(0x142),_0x13b7d2=_0x5f34ac(0xab),_0x5987d9='<%1\x20SIDEVIEW\x20WEAPONS>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20SIDEVIEW\x20WEAPONS>',_0x34c66a='<%1\x20SIDEVIEW\x20IDLE\x20MOTIONS>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20SIDEVIEW\x20IDLE\x20MOTIONS>';for(const _0x2ca779 of _0x38e481){const _0x14fe29=_0x2ca779[_0x5f34ac(0x274)]()[_0x5f34ac(0x17b)]();for(const _0x42e283 in DataManager[_0x5f34ac(0x207)][_0x14fe29]){const _0x27d458=_0x5f34ac(0x204)[_0x5f34ac(0xd6)](_0x14fe29,_0x42e283);VisuMZ['ElementStatusCore'][_0x5f34ac(0x249)][_0x27d458]=new RegExp(_0x442dc3[_0x5f34ac(0xd6)](_0x42e283),'i');const _0x297174=_0x5f34ac(0x18b)['format'](_0x14fe29,_0x42e283);VisuMZ['ElementStatusCore'][_0x5f34ac(0x249)][_0x297174]=new RegExp(_0x18ef53[_0x5f34ac(0xd6)](_0x42e283),'i');const _0x4ad236=_0x5f34ac(0x155)['format'](_0x14fe29,_0x42e283);VisuMZ[_0x5f34ac(0xea)]['RegExp'][_0x4ad236]=new RegExp(_0xe1a0e5[_0x5f34ac(0xd6)](_0x42e283),'i');const _0x3afdb5=_0x5f34ac(0x1ea)['format'](_0x14fe29,_0x42e283);VisuMZ[_0x5f34ac(0xea)][_0x5f34ac(0x249)][_0x3afdb5]=new RegExp(_0x13b7d2[_0x5f34ac(0xd6)](_0x42e283),'i');const _0x463741='SvWeaponMass-%1-%2'[_0x5f34ac(0xd6)](_0x14fe29,_0x42e283);VisuMZ[_0x5f34ac(0xea)]['RegExp'][_0x463741]=new RegExp(_0x5987d9[_0x5f34ac(0xd6)](_0x42e283),'i');const _0x1e7fc5=_0x5f34ac(0x325)[_0x5f34ac(0xd6)](_0x14fe29,_0x42e283);VisuMZ[_0x5f34ac(0xea)]['RegExp'][_0x1e7fc5]=new RegExp(_0x34c66a[_0x5f34ac(0xd6)](_0x42e283),'i');}}}else{function _0x35bbae(){const _0x33a177=_0x5f34ac;return _0x4a30bf[_0x33a177(0x112)]()?this[_0x33a177(0x2e6)]():_0x46ca20['ElementStatusCore']['Game_Enemy_name'][_0x33a177(0x15b)](this);}}}},DataManager[_0x3e7307(0x112)]=function(){const _0x64f5f=_0x3e7307;return VisuMZ[_0x64f5f(0xea)][_0x64f5f(0x1b6)]['TraitSetSettings'][_0x64f5f(0x32e)];},DataManager[_0x3e7307(0x21b)]=function(_0x1b0703){const _0x5eb5fa=_0x3e7307;return VisuMZ[_0x5eb5fa(0xea)]['Settings'][_0x1b0703];},DataManager['traitSet']=function(_0xa4c7c4,_0x123879){const _0x53570f=_0x3e7307;_0xa4c7c4=_0xa4c7c4[_0x53570f(0x274)]()['trim'](),_0x123879=_0x123879[_0x53570f(0x274)]()[_0x53570f(0x17b)]();if(this[_0x53570f(0x207)][_0xa4c7c4][_0x123879]){if(_0x53570f(0x2ba)===_0x53570f(0x1fc)){function _0x31a1cf(){const _0x5a4d49=_0x53570f;_0x44eda5[_0x5a4d49(0x16f)]['update']['call'](this),this[_0x5a4d49(0x28b)]&&this[_0x5a4d49(0x28b)][_0x5a4d49(0xa5)](this[_0x5a4d49(0x1ef)]());}}else return this[_0x53570f(0x207)][_0xa4c7c4][_0x123879];}else return this[_0x53570f(0x207)][_0xa4c7c4][_0x53570f(0x239)];},DataManager[_0x3e7307(0x1df)]=function(_0x26fdd8,_0x56f648){const _0x8bdda8=_0x3e7307;if(!_0x56f648)return;this[_0x8bdda8(0x24d)](_0x26fdd8,_0x56f648),this[_0x8bdda8(0x2bd)](_0x26fdd8,_0x56f648),this[_0x8bdda8(0x2b2)](_0x26fdd8,_0x56f648);},DataManager[_0x3e7307(0xee)]=function(_0x175182){const _0x2e7f82=_0x3e7307;return data=_0x175182[_0x2e7f82(0x1d1)](','),data[Math['randomInt'](data[_0x2e7f82(0x126)])][_0x2e7f82(0x17b)]();},DataManager['makeMassTraitSetFromNotetags']=function(_0x585f79,_0x27181c){const _0x4964bc=_0x3e7307,_0x2e766e={'ELEMENT':_0x4964bc(0x2b5),'SUBELEMENT':_0x4964bc(0x2a4),'GENDER':'Gender','RACE':_0x4964bc(0xbc),'NATURE':_0x4964bc(0x331),'ALIGNMENT':'Alignment','BLESSING':_0x4964bc(0x322),'CURSE':_0x4964bc(0x236),'ZODIAC':'Zodiac','VARIANT':_0x4964bc(0x26c)},_0x4adde6=_0x27181c['note'];if(_0x4adde6[_0x4964bc(0x345)](/<TRAIT SETS>\s*([\s\S]*)\s*<\/TRAIT SETS>/i)){const _0xf2ce38=String(RegExp['$1'])[_0x4964bc(0x1d1)](/[\r\n]+/);for(const _0x1896e8 of _0xf2ce38){if(_0x4964bc(0x13b)==='jqnQG'){if(_0x1896e8['match'](/(.*):[ ](.*)/i)){if(_0x4964bc(0xa6)!=='mNEEJ'){function _0x1e59f5(){const _0x266e28=_0x4964bc;_0x32331b=_0x266e28(0x282)[_0x266e28(0xd6)](_0x44f789,_0x257f12);}}else{const _0x21d0d8=String(RegExp['$1'])['toUpperCase']()[_0x4964bc(0x17b)](),_0x5b95ca=String(RegExp['$2']),_0x1c11a3=_0x2e766e[_0x21d0d8];_0x1c11a3&&(_0x585f79[_0x1c11a3]=this[_0x4964bc(0xee)](_0x5b95ca));}}}else{function _0x3392c0(){_0x5d93fe=this['mainAreaTop']();}}}}},DataManager[_0x3e7307(0x2bd)]=function(_0x25ca29,_0x47e1eb){const _0x1c8ed6=_0x3e7307,_0xf79a18=_0x47e1eb[_0x1c8ed6(0x2d0)],_0xff3d1={'Element':/<ELEMENT:[ ](.*)>/i,'SubElement':/<SUBELEMENT:[ ](.*)>/i,'Gender':/<GENDER:[ ](.*)>/i,'Race':/<RACE:[ ](.*)>/i,'Nature':/<NATURE:[ ](.*)>/i,'Alignment':/<ALIGNMENT:[ ](.*)>/i,'Blessing':/<BLESSING:[ ](.*)>/i,'Curse':/<CURSE:[ ](.*)>/i,'Zodiac':/<ZODIAC:[ ](.*)>/i,'Variant':/<VARIANT:[ ](.*)>/i};for(const _0x44e065 in _0xff3d1){if(_0x1c8ed6(0x93)!==_0x1c8ed6(0x93)){function _0x1f834d(){const _0x50a40d=_0x1c8ed6;this[_0x50a40d(0x9c)]={},_0x385ecf['ElementStatusCore']['Game_BattlerBase_initMembers'][_0x50a40d(0x15b)](this);}}else{const _0x392cd7=_0xff3d1[_0x44e065];_0xf79a18[_0x1c8ed6(0x345)](_0x392cd7)&&(_0x25ca29[_0x44e065]=this[_0x1c8ed6(0xee)](RegExp['$1']));}}if(_0xf79a18[_0x1c8ed6(0x345)](/<ELEMENT:[ ](.*)\/(.*)>/i)){if(_0x1c8ed6(0x29c)!=='swKDQ')_0x25ca29[_0x1c8ed6(0x2b5)]=String(RegExp['$1'])[_0x1c8ed6(0x17b)](),_0x25ca29[_0x1c8ed6(0x2a4)]=String(RegExp['$2'])[_0x1c8ed6(0x17b)]();else{function _0x36f94e(){const _0x1ccec5=_0x1c8ed6;return this[_0x1ccec5(0x2fc)]()[_0x1ccec5(0x345)](/LOWER/i);}}}},DataManager[_0x3e7307(0x2b2)]=function(_0x3773e3,_0x181222){const _0x24fd59=_0x3e7307,_0x40481b=_0x181222[_0x24fd59(0x2d0)],_0xde8e6a={'Element':/<RANDOM ELEMENT>\s*([\s\S]*)\s*<\/RANDOM ELEMENT>/i,'SubElement':/<RANDOM SUBELEMENT>\s*([\s\S]*)\s*<\/RANDOM SUBELEMENT>/i,'Gender':/<RANDOM GENDER>\s*([\s\S]*)\s*<\/RANDOM GENDER>/i,'Race':/<RANDOM RACE>\s*([\s\S]*)\s*<\/RANDOM RACE>/i,'Nature':/<RANDOM NATURE>\s*([\s\S]*)\s*<\/RANDOM NATURE>/i,'Alignment':/<RANDOM ALIGNMENT>\s*([\s\S]*)\s*<\/RANDOM ALIGNMENT>/i,'Blessing':/<RANDOM BLESSING>\s*([\s\S]*)\s*<\/RANDOM BLESSING>/i,'Curse':/<RANDOM CURSE>\s*([\s\S]*)\s*<\/RANDOM CURSE>/i,'Zodiac':/<RANDOM ZODIAC>\s*([\s\S]*)\s*<\/RANDOM ZODIAC>/i,'Variant':/<RANDOM VARIANT>\s*([\s\S]*)\s*<\/RANDOM VARIANT>/i};for(const _0x5885b1 in _0xde8e6a){const _0x4e291a=_0xde8e6a[_0x5885b1];if(_0x40481b[_0x24fd59(0x345)](_0x4e291a)){if('QsIkp'!==_0x24fd59(0x180)){function _0x6bba01(){const _0x1dd564=_0x24fd59;return this['_traitSets'][_0x2dbb85][_0x1dd564(0x239)];}}else{const _0x497d05=String(RegExp['$1'])[_0x24fd59(0x1d1)](/[\r\n]+/)[_0x24fd59(0x1bf)]('');_0x3773e3[_0x5885b1]=this[_0x24fd59(0xaa)](_0x497d05);}}}},DataManager[_0x3e7307(0xaa)]=function(_0x3677d9){const _0x251ac5=_0x3e7307;let _0xc6f4bc=0x0;const _0x215d29={};for(const _0x8d3967 of _0x3677d9){if(_0x8d3967[_0x251ac5(0x345)](/(.*):[ ](\d+)/i)){const _0x5a1d8b=String(RegExp['$1'])[_0x251ac5(0x17b)](),_0x3813cb=Number(RegExp['$2']);_0x215d29[_0x5a1d8b]=_0x3813cb,_0xc6f4bc+=_0x3813cb;}else{if(_0x8d3967[_0x251ac5(0x345)](/(.*):[ ](\d+\.?\d+)/i)){const _0x220979=String(RegExp['$1'])[_0x251ac5(0x17b)](),_0x48d923=Number(RegExp['$2']);_0x215d29[_0x220979]=_0x48d923,_0xc6f4bc+=_0x48d923;}else{if(_0x8d3967!==''){if(_0x251ac5(0x11b)!=='qbmQb')_0x215d29[_0x8d3967]=0x1,_0xc6f4bc++;else{function _0x378150(){_0x1dfb88['createRandomTraitSet'](_0x36ccf0);}}}}}}if(_0xc6f4bc<=0x0)return'';let _0x24432f=Math['random']()*_0xc6f4bc;for(const _0x46e645 in _0x215d29){if(_0x251ac5(0x289)===_0x251ac5(0xa8)){function _0x18d1d2(){const _0x14ec87=_0x251ac5,_0x14e207=_0x4c7613[_0x14ec87(0x1d1)](',');for(const _0x15753b of _0x14e207){const _0x1ad0e2=_0x264163[_0x14ec87(0x334)](_0x15753b);if(_0x1ad0e2)_0x1dce87['push'](_0x1ad0e2);}}}else{_0x24432f-=_0x215d29[_0x46e645];if(_0x24432f<=0x0)return _0x46e645;}}return'';},DataManager[_0x3e7307(0x1e7)]=function(_0x3a7631){const _0x3a7b8c=_0x3e7307;let _0x4a4fc1=[],_0x3eeac3=0x0;_0x3a7631=_0x3a7631[_0x3a7b8c(0x274)]()[_0x3a7b8c(0x17b)]();const _0xef0c2e=this['_traitSets'][_0x3a7631];for(const _0x1d58f7 in _0xef0c2e){const _0x19dcfd=_0xef0c2e[_0x1d58f7];_0x19dcfd[_0x3a7b8c(0x28c)]&&(_0x4a4fc1[_0x3a7b8c(0x19b)](_0x1d58f7),_0x3eeac3+=_0x19dcfd[_0x3a7b8c(0x1f8)]);}if(_0x3eeac3<=0x0)return'';let _0xc777a4=Math[_0x3a7b8c(0x2fa)]()*_0x3eeac3;for(const _0x3f8108 of _0x4a4fc1){_0xc777a4-=_0xef0c2e[_0x3f8108][_0x3a7b8c(0x1f8)];if(_0xc777a4<=0x0)return _0x3f8108;}return'';},DataManager['getElementIdWithName']=function(_0x51bc18){const _0x32b343=_0x3e7307;_0x51bc18=_0x51bc18['toUpperCase']()[_0x32b343(0x17b)](),this[_0x32b343(0x1d2)]=this[_0x32b343(0x1d2)]||{};if(this[_0x32b343(0x1d2)][_0x51bc18])return this[_0x32b343(0x1d2)][_0x51bc18];let _0x223668=0x1;for(const _0x4d6c84 of $dataSystem['elements']){if(_0x32b343(0x14f)==='Cypsg'){function _0xb1d5de(){this['createRandomTraitSet'](_0x10e30a);}}else{if(!_0x4d6c84)continue;let _0x593896=_0x4d6c84['toUpperCase']();_0x593896=_0x593896[_0x32b343(0xa9)](/\x1I\[(\d+)\]/gi,''),_0x593896=_0x593896[_0x32b343(0xa9)](/\\I\[(\d+)\]/gi,''),this[_0x32b343(0x1d2)][_0x593896]=_0x223668,_0x223668++;}}return this[_0x32b343(0x1d2)][_0x51bc18]||0x0;},DataManager['getActionObjectElements']=function(_0x2eaad7){const _0x35f926=_0x3e7307;let _0xdeb5e4=[];const _0x3285fc=_0x2eaad7[_0x35f926(0x2d0)]['match'](/<MULTI-ELEMENT:[ ](.*)>/gi);if(_0x3285fc){if('EDoeP'!==_0x35f926(0x18a))for(const _0x51ca4c of _0x3285fc){_0x51ca4c[_0x35f926(0x345)](/<MULTI-ELEMENT:[ ](.*)>/gi);const _0x26a1d8=String(RegExp['$1'])[_0x35f926(0x1d1)](',')['map'](_0xb25690=>_0xb25690[_0x35f926(0x17b)]());for(const _0x4d0a11 of _0x26a1d8){const _0x2765b3=/^\d+$/[_0x35f926(0x27f)](_0x4d0a11);if(_0x2765b3){if('pHbJO'!==_0x35f926(0x340)){function _0x5a4cbc(){const _0x37864a=_0x35f926,_0x511f4c=_0x37864a(0x2b0);if(this[_0x37864a(0x14d)](_0x511f4c))return this[_0x37864a(0x9c)][_0x511f4c][_0x37864a(0xed)](_0x2d9c39);return this['_cache'][_0x511f4c]=this[_0x37864a(0x106)](_0x5aa71d['TRAIT_EQUIP_WTYPE']),this[_0x37864a(0x9c)][_0x511f4c]=this[_0x37864a(0x9c)][_0x511f4c][_0x37864a(0x1c4)](this[_0x37864a(0x169)]()),this[_0x37864a(0x9c)][_0x511f4c][_0x37864a(0xed)](_0x294a43);}}else _0xdeb5e4[_0x35f926(0x19b)](Number(_0x4d0a11));}else{if(_0x35f926(0x13e)!==_0x35f926(0x215)){const _0x307a91=this[_0x35f926(0x334)](_0x4d0a11);if(_0x307a91)_0xdeb5e4['push'](_0x307a91);}else{function _0x371cff(){_0x3d29fe-=_0x386d24[_0x3a90d7];if(_0x36314f<=0x0)return _0x6143b8;}}}}}else{function _0x56263a(){const _0x4f7536=_0x35f926;return this[_0x4f7536(0xdb)]();}}}return _0xdeb5e4;},TextManager[_0x3e7307(0x294)]=VisuMZ['ElementStatusCore'][_0x3e7307(0x1b6)][_0x3e7307(0x2e3)][_0x3e7307(0x259)],TextManager[_0x3e7307(0x217)]=VisuMZ['ElementStatusCore'][_0x3e7307(0x1b6)][_0x3e7307(0x2e3)]['VocabDmgAbsorb'],TextManager[_0x3e7307(0x32b)]=VisuMZ['ElementStatusCore'][_0x3e7307(0x1b6)][_0x3e7307(0x2e3)][_0x3e7307(0xb5)],TextManager[_0x3e7307(0x125)]=VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x1b6)]['StatusMenu']['VocabDmgDealt'],TextManager[_0x3e7307(0x120)]=VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x1b6)][_0x3e7307(0x2e3)][_0x3e7307(0x221)],TextManager[_0x3e7307(0xb8)]=VisuMZ['ElementStatusCore'][_0x3e7307(0x1b6)][_0x3e7307(0x2e3)][_0x3e7307(0x208)],TextManager[_0x3e7307(0x9b)]=VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x1b6)][_0x3e7307(0x2e3)][_0x3e7307(0x219)],ColorManager['getColor']=function(_0x5ed4fe){const _0x4a59b1=_0x3e7307;_0x5ed4fe=String(_0x5ed4fe);if(_0x5ed4fe['match'](/#(.*)/i))return _0x4a59b1(0x20c)[_0x4a59b1(0xd6)](String(RegExp['$1']));else{if(_0x4a59b1(0x2f9)===_0x4a59b1(0x2f9))return this[_0x4a59b1(0x184)](Number(_0x5ed4fe));else{function _0xa507aa(){const _0x368dd9=_0x4a59b1;this[_0x368dd9(0x338)](_0x4b451e[_0x368dd9(0x1e8)]()),_0x427148=_0x89d4ab[_0x368dd9(0x217)]['format'](_0x1f2743[_0x368dd9(0xc2)](_0x274c6a*0x64));}}}},VisuMZ[_0x3e7307(0xea)]['Game_Action_clear']=Game_Action[_0x3e7307(0x16f)][_0x3e7307(0x226)],Game_Action['prototype']['clear']=function(){const _0x236a9f=_0x3e7307;VisuMZ[_0x236a9f(0xea)]['Game_Action_clear'][_0x236a9f(0x15b)](this),this[_0x236a9f(0x153)]();},Game_Action[_0x3e7307(0x16f)][_0x3e7307(0x153)]=function(){const _0x164294=_0x3e7307;this[_0x164294(0x29d)]=![],this['_battleCoreForcedElements']=[],this[_0x164294(0xb4)]=[];},Game_Action[_0x3e7307(0x16f)]['elements']=function(){const _0x672fb6=_0x3e7307;if(!this[_0x672fb6(0xf7)]())return[];if(this[_0x672fb6(0x199)]()[_0x672fb6(0x1a6)]())return[];if(this[_0x672fb6(0x29d)])return[];if(this[_0x672fb6(0x1c6)][_0x672fb6(0x126)]>0x0)return this['_battleCoreForcedElements'];const _0x4e216e=this['subject']()[_0x672fb6(0x326)]();if(_0x4e216e[_0x672fb6(0x126)]>0x0)return _0x4e216e;let _0x2bad28=[];const _0x3a33fa=this['item']()[_0x672fb6(0x172)]['elementId'];if(_0x3a33fa<0x0){if(_0x672fb6(0x191)!==_0x672fb6(0x191)){function _0x48b7d5(){_0x53bd57=_0x3b96e2%0x2===0x0?_0xbb9218[_0x541d48]:_0x4ad5ee[_0x4a42c1];}}else _0x2bad28=_0x2bad28[_0x672fb6(0x1c4)](this['subject']()[_0x672fb6(0x2ed)]());}else _0x2bad28[_0x672fb6(0x19b)](_0x3a33fa);return _0x2bad28=_0x2bad28[_0x672fb6(0x1c4)](this[_0x672fb6(0xb4)]),_0x2bad28=_0x2bad28[_0x672fb6(0x1c4)](DataManager[_0x672fb6(0x29b)](this['item']())),_0x2bad28[_0x672fb6(0xe2)]((_0x25f902,_0x22a286,_0x32e551)=>_0x32e551['indexOf'](_0x25f902)===_0x22a286);},VisuMZ[_0x3e7307(0xea)]['Game_Action_itemMrf']=Game_Action[_0x3e7307(0x16f)]['itemMrf'],Game_Action[_0x3e7307(0x16f)][_0x3e7307(0x308)]=function(_0xb50777){const _0xde37d5=_0x3e7307,_0xf87b74=_0xb50777['getReflectedElements']();if(this[_0xde37d5(0x2c5)]()['filter'](_0x428cfb=>_0xf87b74[_0xde37d5(0xed)](_0x428cfb))[_0xde37d5(0x126)]>0x0){if(this['item']()[_0xde37d5(0x2d0)]['match'](/<BYPASS ELEMENT REFLECT>/i))return 0x0;return 0x1;}else return VisuMZ['ElementStatusCore']['Game_Action_itemMrf'][_0xde37d5(0x15b)](this,_0xb50777);},Game_Action[_0x3e7307(0x16f)][_0x3e7307(0x1af)]=function(_0xc316ac){const _0x2b1651=_0x3e7307;return VisuMZ[_0x2b1651(0xea)][_0x2b1651(0x1b6)][_0x2b1651(0xd9)][_0x2b1651(0x133)][_0x2b1651(0x15b)](this,_0xc316ac);},Game_Action['prototype'][_0x3e7307(0xc9)]=function(_0x2785c2,_0x538c6d){const _0x10ab94=_0x3e7307,_0x44ea23=this[_0x10ab94(0x10a)]();switch(_0x44ea23){case'min':return this['elementsMinRate'](_0x2785c2,_0x538c6d);break;case _0x10ab94(0x185):return this[_0x10ab94(0x129)](_0x2785c2,_0x538c6d);break;case'additive':return this[_0x10ab94(0x2c0)](_0x2785c2,_0x538c6d);break;case _0x10ab94(0xd3):return this['elementsAverageRate'](_0x2785c2,_0x538c6d);break;default:return this[_0x10ab94(0x306)](_0x2785c2,_0x538c6d);break;}},Game_Action[_0x3e7307(0x16f)][_0x3e7307(0x10a)]=function(){const _0x1bf10b=_0x3e7307;if(this['item']()['note'][_0x1bf10b(0x345)](/<MULTI-ELEMENT RULE:[ ](.*)>/i)){const _0x8bfb59=String(RegExp['$1'])[_0x1bf10b(0x17b)]()['toLowerCase']();switch(_0x8bfb59){case'max':case _0x1bf10b(0x26b):case'highest':return _0x1bf10b(0x201);break;case _0x1bf10b(0x1ed):case _0x1bf10b(0xf6):case'lowest':return'min';break;case _0x1bf10b(0x185):case _0x1bf10b(0x232):case _0x1bf10b(0x268):return'multiply';break;case _0x1bf10b(0x216):case _0x1bf10b(0x2cd):case _0x1bf10b(0x11e):return _0x1bf10b(0x216);break;case _0x1bf10b(0xd3):case _0x1bf10b(0x11f):return _0x1bf10b(0xd3);break;}}return VisuMZ[_0x1bf10b(0xea)][_0x1bf10b(0x1b6)][_0x1bf10b(0xd9)][_0x1bf10b(0x14e)];},Game_Action[_0x3e7307(0x16f)]['elementsMaxRate']=function(_0x29c29a,_0x3f6ca1){const _0x2609d2=_0x3e7307;if(_0x3f6ca1[_0x2609d2(0x126)]>0x0){if(_0x2609d2(0x121)!=='dxVEE')return VisuMZ[_0x2609d2(0xea)]['Settings'][_0x2609d2(0xd9)][_0x2609d2(0x1b3)]['call'](this,_0x29c29a,_0x3f6ca1);else{function _0x47c76c(){const _0x2980e7=_0x2609d2,_0x10e6bb=_0x4da9b1(_0x521c9e['$1']);_0x10e6bb<_0x2ccf58?(_0xe35cf7(_0x2980e7(0xde)[_0x2980e7(0xd6)](_0x9abe8,_0x10e6bb,_0x4fb24e)),_0x5ede1b[_0x2980e7(0xe1)]()):_0x4727db=_0x52b073[_0x2980e7(0x201)](_0x10e6bb,_0x559faf);}}}else{if('oCasK'!==_0x2609d2(0x31a))return 0x1;else{function _0x2b2684(){const _0x2ebc9f=_0x2609d2;if(!_0x499efd[_0x2ebc9f(0x112)]())return _0x2d6e04;const _0x3a6117=this[_0x2ebc9f(0x15c)](),_0x41e8af=_0x2ebc9f(0x2cc)[_0x2ebc9f(0xd6)](_0x1a8f85);for(const _0x321229 of _0x3a6117){const _0x376eb4=this[_0x2ebc9f(0x25b)](_0x321229),_0xa596ef=_0x13e1ca[_0x2ebc9f(0x298)](_0x321229,_0x376eb4);_0x1b04bf+=_0xa596ef[_0x2ebc9f(0xe8)][_0x41e8af]||0x0;}return _0x3f8fbd;}}}},Game_Action[_0x3e7307(0x16f)][_0x3e7307(0x30e)]=function(_0x1d5a5e,_0x17566c){const _0x529338=_0x3e7307;if(_0x17566c['length']>0x0){if(_0x529338(0xf8)===_0x529338(0xf8))return VisuMZ['ElementStatusCore'][_0x529338(0x1b6)]['ElementRules']['RuleMinCalcJS'][_0x529338(0x15b)](this,_0x1d5a5e,_0x17566c);else{function _0x334d6b(){const _0x3d0fb8=_0x529338;if(!_0x1a93b7)return;this[_0x3d0fb8(0x24d)](_0x353f41,_0x498cef),this[_0x3d0fb8(0x2bd)](_0x449114,_0x1150de),this[_0x3d0fb8(0x2b2)](_0x5e5d02,_0x449bcb);}}}else return 0x1;},Game_Action[_0x3e7307(0x16f)][_0x3e7307(0x129)]=function(_0x12fbd3,_0x14593e){const _0xa1b04a=_0x3e7307;if(_0x14593e[_0xa1b04a(0x126)]>0x0)return VisuMZ['ElementStatusCore'][_0xa1b04a(0x1b6)]['ElementRules'][_0xa1b04a(0xbf)]['call'](this,_0x12fbd3,_0x14593e);else{if('XYagE'!=='XYagE'){function _0x21fd3c(){const _0x3c483c=_0xa1b04a;return _0x53b221=_0xf1d8d4(_0x48bf94),_0x14b3ec['match'](/#(.*)/i)?_0x3c483c(0x20c)[_0x3c483c(0xd6)](_0x62d638(_0x4c3369['$1'])):this['textColor'](_0x152624(_0x3e8cdd));}}else return 0x1;}},Game_Action[_0x3e7307(0x16f)][_0x3e7307(0x2c0)]=function(_0x37396b,_0x1dc5aa){const _0x2bd59e=_0x3e7307;if(_0x1dc5aa[_0x2bd59e(0x126)]>0x0)return VisuMZ['ElementStatusCore'][_0x2bd59e(0x1b6)][_0x2bd59e(0xd9)][_0x2bd59e(0xad)]['call'](this,_0x37396b,_0x1dc5aa);else{if(_0x2bd59e(0x1f2)===_0x2bd59e(0x26d)){function _0x23dbb9(){const _0x2ed7db=_0x2bd59e;let _0x415905=0x5;return this[_0x2ed7db(0x33a)]-this[_0x2ed7db(0x2c8)]()*0x5<this[_0x2ed7db(0x2c8)]()*0x6&&(_0x415905=0x4),this[_0x2ed7db(0x33a)]-this['lineHeight']()*_0x415905;}}else return 0x1;}},Game_Action[_0x3e7307(0x16f)][_0x3e7307(0x25e)]=function(_0xfeffb9,_0x942bd9){const _0xa4e718=_0x3e7307;if(_0x942bd9[_0xa4e718(0x126)]>0x0){if(_0xa4e718(0x134)===_0xa4e718(0x134))return VisuMZ['ElementStatusCore']['Settings']['ElementRules'][_0xa4e718(0x256)][_0xa4e718(0x15b)](this,_0xfeffb9,_0x942bd9);else{function _0x1f53df(){const _0x1066d4=_0xa4e718;if(_0x31e6d6['match'](/(.*):[ ](\d+)/i)){const _0x55865=_0x581d28(_0x4c51d7['$1'])[_0x1066d4(0x17b)](),_0x2f370e=_0x177583(_0x335bdc['$2']);_0x1abdff[_0x55865]=_0x2f370e,_0x360519+=_0x2f370e;}else{if(_0x2f976f[_0x1066d4(0x345)](/(.*):[ ](\d+\.?\d+)/i)){const _0x518373=_0x1f0999(_0x146014['$1'])[_0x1066d4(0x17b)](),_0x5732e4=_0x2f57de(_0x56dba7['$2']);_0x2fc50b[_0x518373]=_0x5732e4,_0x34ba02+=_0x5732e4;}else _0x5227f9!==''&&(_0x5c8564[_0xbcc984]=0x1,_0x29d864++);}}}}else return 0x1;},Game_Action[_0x3e7307(0x16f)]['calcUserElementDamagePlus']=function(_0x434ec2,_0x123522){const _0x5e47e9=_0x3e7307;if(_0x123522[_0x5e47e9(0x126)]<=0x0)return 0x0;return _0x123522[_0x5e47e9(0x328)]((_0x5104ce,_0x19a2ae)=>_0x5104ce+this[_0x5e47e9(0x199)]()[_0x5e47e9(0x284)](_0x19a2ae),0x0);},Game_Action['prototype'][_0x3e7307(0x2ea)]=function(_0x32101a,_0x39e6ea){const _0x20e056=_0x3e7307;if(_0x39e6ea[_0x20e056(0x126)]<=0x0)return 0x1;return _0x39e6ea[_0x20e056(0x328)]((_0x4a97bc,_0x8c0bd0)=>_0x4a97bc*this[_0x20e056(0x199)]()[_0x20e056(0x12f)](_0x8c0bd0),0x1);},Game_Action[_0x3e7307(0x16f)][_0x3e7307(0x1f7)]=function(_0x4c8ca6,_0x186914){if(_0x186914['length']<=0x0)return 0x0;return _0x186914['reduce']((_0x1c0f11,_0x449f76)=>_0x1c0f11+this['subject']()['getDealtElementFlat'](_0x449f76),0x0);},VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x183)]=Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x148)],Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x148)]=function(){const _0x2eab33=_0x3e7307;this[_0x2eab33(0x9c)]={},VisuMZ[_0x2eab33(0xea)]['Game_BattlerBase_initMembers'][_0x2eab33(0x15b)](this);},VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x20b)]=Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0xfd)],Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0xfd)]=function(){const _0x576f1f=_0x3e7307;this[_0x576f1f(0x9c)]={},VisuMZ[_0x576f1f(0xea)][_0x576f1f(0x20b)][_0x576f1f(0x15b)](this);},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x14d)]=function(_0x512fed){const _0x6c4f35=_0x3e7307;return this[_0x6c4f35(0x9c)]=this[_0x6c4f35(0x9c)]||{},this[_0x6c4f35(0x9c)][_0x512fed]!==undefined;},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x1c2)]=function(){const _0x9d10f0=_0x3e7307;this[_0x9d10f0(0x207)]={};const _0x4a3029=this[_0x9d10f0(0x15c)]();for(const _0x3da086 of _0x4a3029){this[_0x9d10f0(0x207)][_0x3da086]='';}this[_0x9d10f0(0xca)](),this[_0x9d10f0(0x9e)]();},Game_BattlerBase['prototype'][_0x3e7307(0xca)]=function(){},Game_BattlerBase[_0x3e7307(0x16f)]['applyTraitSetsByObjectNotetag']=function(){const _0x4726ad=_0x3e7307,_0x12212c=this['getTraitSetObject']();DataManager['makeTraitSetFromNotetags'](this[_0x4726ad(0x207)],_0x12212c);},Game_BattlerBase[_0x3e7307(0x16f)]['getTraitSetObject']=function(){return null;},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x15c)]=function(){const _0x22fafd=_0x3e7307;return[_0x22fafd(0x2b5),'SubElement',_0x22fafd(0x2d2),_0x22fafd(0xbc),'Nature',_0x22fafd(0x21e),_0x22fafd(0x322),_0x22fafd(0x236),_0x22fafd(0x2cb),_0x22fafd(0x26c)];},Game_BattlerBase['prototype']['getTraitSet']=function(_0x55305a){const _0xc5af4c=_0x3e7307;if(this[_0xc5af4c(0x207)]===undefined)this[_0xc5af4c(0x1c2)]();if(this[_0xc5af4c(0x207)][_0x55305a]===undefined)this[_0xc5af4c(0x1c2)]();return this[_0xc5af4c(0x207)][_0x55305a];},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x168)]=function(_0x217752,_0x41f6f9){const _0x7c8b85=_0x3e7307;if(this[_0x7c8b85(0x207)]===undefined)this[_0x7c8b85(0x1c2)]();if(this['_traitSets'][_0x217752]===undefined)this[_0x7c8b85(0x1c2)]();this['_traitSets'][_0x217752]=_0x41f6f9,this['refresh']();},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x298)]=function(_0x118d6d){const _0x2d844c=_0x3e7307;if(this[_0x2d844c(0x207)]===undefined)this['initElementStatusCore']();if(this[_0x2d844c(0x207)][_0x118d6d]===undefined)this[_0x2d844c(0x1c2)]();const _0x2cd5d2=this[_0x2d844c(0x207)][_0x118d6d];return DataManager[_0x2d844c(0x298)](_0x118d6d,_0x2cd5d2);},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x18f)]=function(){const _0x57da1b=_0x3e7307;if($gameTemp[_0x57da1b(0x324)]()){console[_0x57da1b(0x1d4)]('===\x20%1\x27s\x20Trait\x20Sets\x20==='[_0x57da1b(0xd6)](this[_0x57da1b(0xb2)]()));for(const _0x51aa91 in this['_traitSets']){console[_0x57da1b(0x1d4)](_0x57da1b(0x1fa)[_0x57da1b(0xd6)](_0x51aa91,this[_0x57da1b(0x207)][_0x51aa91]));}console[_0x57da1b(0x1d4)](_0x57da1b(0x1e3));}},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x270)]=function(_0x586409){const _0x2e3c58=_0x3e7307;this['_traitSets'][_0x586409]=DataManager[_0x2e3c58(0x1e7)](_0x586409);if(!this[_0x2e3c58(0x2ae)]){if(_0x2e3c58(0x1fb)==='tmJpl')this[_0x2e3c58(0xfd)]();else{function _0x107759(){const _0x5a90fd=_0x2e3c58;this[_0x5a90fd(0x14b)](_0x5b56a8['Description'],_0x22218c+_0x4199c0,_0x5d169a,_0x3ddc94-_0x504191*0x2);}}}},VisuMZ[_0x3e7307(0xea)]['Game_BattlerBase_canEquip']=Game_BattlerBase[_0x3e7307(0x16f)]['canEquip'],Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x190)]=function(_0x5b736d){const _0x3110a0=_0x3e7307;return VisuMZ[_0x3110a0(0xea)][_0x3110a0(0x279)][_0x3110a0(0x15b)](this,_0x5b736d)&&this[_0x3110a0(0x151)](_0x5b736d);},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x151)]=function(_0x3ac761){const _0x5b538f=_0x3e7307;if(!_0x3ac761)return!![];if(_0x3ac761['note']['match'](/<EQUIP TRAIT (?:REQUIREMENT|REQUIREMENTS):[ ](.*)>/i)){if(_0x5b538f(0xa3)!==_0x5b538f(0xa3)){function _0x3f613c(){const _0x422948=_0x5b538f,_0x16e6ca='Col%1'[_0x422948(0xd6)](_0x499cbb);return _0x1ec203[_0x422948(0xea)][_0x422948(0x1b6)][_0x422948(0x2e3)][_0x16e6ca];}}else{const _0x2cd233=this[_0x5b538f(0x15c)](),_0x26792e=String(RegExp['$1'])[_0x5b538f(0x1d1)](',')[_0x5b538f(0x1bb)](_0x27dfdd=>_0x27dfdd[_0x5b538f(0x274)]()[_0x5b538f(0x17b)]());for(const _0x337708 of _0x26792e){if(_0x2cd233[_0x5b538f(0x240)](_0x8386d7=>this['getTraitSet'](_0x8386d7)[_0x5b538f(0x274)]()[_0x5b538f(0x17b)]()===_0x337708))continue;return![];}}}return!![];},VisuMZ[_0x3e7307(0xea)]['Game_BattlerBase_elementRate']=Game_BattlerBase['prototype'][_0x3e7307(0x2a8)],Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x2a8)]=function(_0x257fd7){const _0x172177=_0x3e7307;if(_0x257fd7<=0x0)return 0x1;const _0x47ebe4=_0x172177(0x318)[_0x172177(0xd6)](_0x257fd7);if(this[_0x172177(0x14d)](_0x47ebe4))return this[_0x172177(0x9c)][_0x47ebe4];const _0xb44795=this['getForceReceivedElementRate'](_0x257fd7);return _0xb44795===![]?this[_0x172177(0x9c)][_0x47ebe4]=VisuMZ[_0x172177(0xea)][_0x172177(0x1b6)][_0x172177(0xd9)][_0x172177(0x30a)][_0x172177(0x15b)](this,_0x257fd7):this[_0x172177(0x9c)][_0x47ebe4]=_0xb44795,this['_cache'][_0x47ebe4];},Game_BattlerBase['prototype'][_0x3e7307(0x27c)]=function(_0x5f512a){const _0xa10b94=_0x3e7307,_0x1965d0=VisuMZ['ElementStatusCore'][_0xa10b94(0x249)];for(const _0x4794ec of this['traitObjects']()){if(_0xa10b94(0x1d6)!==_0xa10b94(0x1d6)){function _0x223d41(){const _0x381f4e=_0xa10b94,_0xfa69ea=_0x1a9cf7(_0x56ef5d['$1'])['split'](/[\r\n]+/)['remove']('');_0x1327df[_0x4ed753]=this[_0x381f4e(0xaa)](_0xfa69ea);}}else{if(!_0x4794ec)continue;const _0x3e3405=_0x4794ec[_0xa10b94(0x2d0)];if(_0x3e3405[_0xa10b94(0x345)](_0x1965d0[_0xa10b94(0xd4)][_0x5f512a])){if(_0xa10b94(0x97)===_0xa10b94(0x159)){function _0x23b506(){const _0x10b06f=_0xa10b94,_0x3dcc5b=_0x174058['faceName'](),_0x2269c8=_0x398abc['faceIndex']();_0x35d398=_0x373803||_0xf5184d['faceWidth'],_0x1bfe15=_0x34d8df||_0x1dacb9['faceHeight'];const _0x277158=_0x1d5960[_0x10b06f(0x188)](_0x3dcc5b),_0x5ee0a5=_0x377108[_0x10b06f(0x1c3)],_0x2179e3=_0x29db10[_0x10b06f(0x237)],_0x43c8ca=_0x272241[_0x10b06f(0x1ed)](_0x554e51,_0x5ee0a5),_0x4291b0=_0x44242a[_0x10b06f(0x1ed)](_0x7e43fe,_0x2179e3),_0x5a6022=_0x5c213b[_0x10b06f(0x303)](_0x134378+_0x389ef8[_0x10b06f(0x201)](_0x21ba0f-_0x5ee0a5,0x0)/0x2),_0x47f7b1=_0xe00ef1['floor'](_0x3e0518+_0x4996b4[_0x10b06f(0x201)](_0x1600af-_0x2179e3,0x0)/0x2),_0x357e8f=_0x2269c8%0x4*_0x5ee0a5+(_0x5ee0a5-_0x43c8ca)/0x2,_0x3ef286=_0x3e8e85[_0x10b06f(0x303)](_0x2269c8/0x4)*_0x2179e3+(_0x2179e3-_0x4291b0)/0x2;this[_0x10b06f(0x100)][_0x10b06f(0x1cf)](_0x277158,_0x357e8f,_0x3ef286,_0x43c8ca,_0x4291b0,_0x5a6022,_0x47f7b1);}}else return Number(RegExp['$1'])/0x64;}else{if(_0x3e3405[_0xa10b94(0x345)](_0x1965d0[_0xa10b94(0xdc)][_0x5f512a]))Number(RegExp['$1']);else{if(_0x3e3405['match'](_0x1965d0['EleForceJS'][_0x5f512a])){if(_0xa10b94(0x2f1)===_0xa10b94(0x9d)){function _0x2aa202(){const _0x44760f=_0x1f9eaf(_0x30f073['$1'])['trim'](),_0x4a5428=_0x284ab0(_0x558dbb['$2']);_0x57a0e6[_0x44760f]=_0x4a5428,_0x216269+=_0x4a5428;}}else{var _0x29e2a0=String(RegExp['$1']);try{if(_0xa10b94(0x1dd)===_0xa10b94(0x203)){function _0x1d9193(){const _0x57bda9=_0xa10b94;this[_0x57bda9(0x9c)]={},_0x58dde0['ElementStatusCore'][_0x57bda9(0x2d5)][_0x57bda9(0x15b)](this,_0x29a959);}}else return eval(_0x29e2a0);}catch(_0x1428df){if($gameTemp[_0xa10b94(0x324)]())console[_0xa10b94(0x1d4)](_0x1428df);return![];}}}}}}}return![];},Game_BattlerBase['prototype'][_0x3e7307(0x21d)]=function(_0x11ae01){const _0x5923a1=_0x3e7307,_0x3be552=VisuMZ[_0x5923a1(0xea)]['RegExp'],_0x272f6a=(_0x401a57,_0xb64b2c)=>{const _0x6e8d97=_0x5923a1;if('EFfDO'!==_0x6e8d97(0x179)){if(!_0xb64b2c)return _0x401a57;const _0x522eeb=_0xb64b2c['note'];if(_0x522eeb[_0x6e8d97(0x345)](_0x3be552['EleRecPlusPer'][_0x11ae01])){var _0x569029=Number(RegExp['$1'])/0x64;_0x401a57+=_0x569029;}if(_0x522eeb[_0x6e8d97(0x345)](_0x3be552[_0x6e8d97(0xba)][_0x11ae01])){if(_0x6e8d97(0xae)!==_0x6e8d97(0x102)){var _0x569029=Number(RegExp['$1']);_0x401a57+=_0x569029;}else{function _0x2fd33b(){const _0x55a959=_0x6e8d97,_0x3a9dae=this['getTraitSet'](_0x24bacd),_0x1874e4=_0x2f6c3f[_0x55a959(0x298)](_0x4628f8,_0x3a9dae);_0x818687*=_0x1874e4[_0x55a959(0x1f0)]!==_0x542cc3?_0x1874e4[_0x55a959(0x1f0)]:0x1;}}}if(_0x522eeb[_0x6e8d97(0x345)](_0x3be552['EleRecPlusJS'][_0x11ae01])){if(_0x6e8d97(0x209)===_0x6e8d97(0x209)){var _0xe1424c=String(RegExp['$1']);try{_0x401a57+=eval(_0xe1424c);}catch(_0x5a1471){if($gameTemp[_0x6e8d97(0x324)]())console[_0x6e8d97(0x1d4)](_0x5a1471);}}else{function _0x55f393(){const _0x315ae1=_0x6e8d97;this[_0x315ae1(0x166)](_0x3d4baf+_0x2c37f9,_0x175164,_0x39b221,_0x338668,![]);}}}return _0x401a57;}else{function _0x30d0ad(){var _0x126fd8=_0x80982a(_0x12f594['$1'])/0x64;_0x3f2835*=_0x126fd8;}}};return this[_0x5923a1(0x28d)]()[_0x5923a1(0x328)](_0x272f6a,0x0);},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x248)]=function(_0x1e3451){const _0x35b5df=_0x3e7307;let _0x139ebe=VisuMZ[_0x35b5df(0xea)]['Game_BattlerBase_elementRate'][_0x35b5df(0x15b)](this,_0x1e3451);const _0x4f3e7d=this[_0x35b5df(0x15c)](),_0x3d4647=_0x35b5df(0x1f3)[_0x35b5df(0xd6)](_0x1e3451);for(const _0x29101d of _0x4f3e7d){const _0xb4f144=this[_0x35b5df(0x25b)](_0x29101d),_0x23e310=DataManager['traitSet'](_0x29101d,_0xb4f144);_0x139ebe*=_0x23e310['ElementRate'][_0x3d4647]||0x1;}const _0xf26391=VisuMZ[_0x35b5df(0xea)][_0x35b5df(0x249)],_0x234c58=(_0x2db8bb,_0x4afec4)=>{const _0xb61775=_0x35b5df;if(_0xb61775(0xf0)==='LAXPp'){if(!_0x4afec4)return _0x2db8bb;const _0x990393=_0x4afec4[_0xb61775(0x2d0)];if(_0x990393[_0xb61775(0x345)](_0xf26391[_0xb61775(0x286)][_0x1e3451])){var _0x18e172=Number(RegExp['$1'])/0x64;_0x2db8bb*=_0x18e172;}if(_0x990393[_0xb61775(0x345)](_0xf26391[_0xb61775(0x26a)][_0x1e3451])){if(_0xb61775(0x2d8)!==_0xb61775(0xa7)){var _0x18e172=Number(RegExp['$1']);_0x2db8bb*=_0x18e172;}else{function _0x3a03df(){const _0x4dd30c=_0xb61775,_0x5b520b=_0x2856ee[_0x4dd30c(0x274)]()['trim']();for(const _0x507aa2 in _0x5efd01[_0x4dd30c(0x207)][_0x5b520b]){const _0x4f0a0e=_0x4dd30c(0x204)[_0x4dd30c(0xd6)](_0x5b520b,_0x507aa2);_0x12c8d1['ElementStatusCore'][_0x4dd30c(0x249)][_0x4f0a0e]=new _0x2dc97f(_0x1f6776[_0x4dd30c(0xd6)](_0x507aa2),'i');const _0x7597fd=_0x4dd30c(0x18b)['format'](_0x5b520b,_0x507aa2);_0x5b2a12['ElementStatusCore'][_0x4dd30c(0x249)][_0x7597fd]=new _0x203a03(_0x5ce5d9[_0x4dd30c(0xd6)](_0x507aa2),'i');const _0x2da1dc=_0x4dd30c(0x155)['format'](_0x5b520b,_0x507aa2);_0x18c0c0[_0x4dd30c(0xea)][_0x4dd30c(0x249)][_0x2da1dc]=new _0x43d49a(_0x3e6eb9[_0x4dd30c(0xd6)](_0x507aa2),'i');const _0x215deb=_0x4dd30c(0x1ea)[_0x4dd30c(0xd6)](_0x5b520b,_0x507aa2);_0x2bfc6b[_0x4dd30c(0xea)]['RegExp'][_0x215deb]=new _0x17f994(_0x2bd591[_0x4dd30c(0xd6)](_0x507aa2),'i');const _0x1f69c3=_0x4dd30c(0xd7)['format'](_0x5b520b,_0x507aa2);_0xdd0104['ElementStatusCore'][_0x4dd30c(0x249)][_0x1f69c3]=new _0x7bb508(_0x401dd9[_0x4dd30c(0xd6)](_0x507aa2),'i');const _0x3cfc6e='SvMotionIdleMass-%1-%2'['format'](_0x5b520b,_0x507aa2);_0x5625e3[_0x4dd30c(0xea)][_0x4dd30c(0x249)][_0x3cfc6e]=new _0x39ba60(_0x451bd0[_0x4dd30c(0xd6)](_0x507aa2),'i');}}}}if(_0x990393[_0xb61775(0x345)](_0xf26391[_0xb61775(0x25f)][_0x1e3451])){var _0x561c22=String(RegExp['$1']);try{if('mTnfq'!==_0xb61775(0x164))_0x2db8bb*=eval(_0x561c22);else{function _0xcd9df4(){const _0x58c784=_0xb61775;_0x1818b3[_0x58c784(0x168)](_0x511653,_0x22f61a[_0x30d964]);}}}catch(_0x20d4fc){if($gameTemp[_0xb61775(0x324)]())console[_0xb61775(0x1d4)](_0x20d4fc);}}return _0x2db8bb;}else{function _0xab2c09(){const _0x41506d=_0xb61775;if(this['_biography']===_0x190d5a)this[_0x41506d(0x2f6)]();return this[_0x41506d(0x156)];}}};return this[_0x35b5df(0x28d)]()[_0x35b5df(0x328)](_0x234c58,_0x139ebe);},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x287)]=function(_0x4e2978){const _0x513212=_0x3e7307,_0x55baf1=VisuMZ[_0x513212(0xea)][_0x513212(0x249)],_0x588d6c=(_0x918544,_0x18bd60)=>{const _0x4a61e9=_0x513212;if(!_0x18bd60)return _0x918544;const _0x5b1f3d=_0x18bd60[_0x4a61e9(0x2d0)];if(_0x5b1f3d['match'](_0x55baf1['EleRecFlatPer'][_0x4e2978])){var _0x61759e=Number(RegExp['$1'])/0x64;_0x918544+=_0x61759e;}if(_0x5b1f3d[_0x4a61e9(0x345)](_0x55baf1[_0x4a61e9(0x1e9)][_0x4e2978])){var _0x61759e=Number(RegExp['$1']);_0x918544+=_0x61759e;}if(_0x5b1f3d[_0x4a61e9(0x345)](_0x55baf1[_0x4a61e9(0x101)][_0x4e2978])){if(_0x4a61e9(0xd0)!==_0x4a61e9(0xd0)){function _0x1fe9b3(){const _0x2e8955=_0x4a61e9;_0x5de6c4='+%1'[_0x2e8955(0xd6)](_0x37dcf2);}}else{var _0x55d7e1=String(RegExp['$1']);try{_0x918544+=eval(_0x55d7e1);}catch(_0x34366c){if($gameTemp[_0x4a61e9(0x324)]())console[_0x4a61e9(0x1d4)](_0x34366c);}}}return _0x918544;};return this[_0x513212(0x28d)]()['reduce'](_0x588d6c,0x0);},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x284)]=function(_0x28269c){const _0xbd980c=_0x3e7307,_0x175e2b=VisuMZ[_0xbd980c(0xea)]['RegExp'],_0x1ef919=(_0x204a89,_0x462a40)=>{const _0x1ea7d2=_0xbd980c;if(_0x1ea7d2(0x250)!=='ydEFH'){if(!_0x462a40)return _0x204a89;const _0x22a3c3=_0x462a40[_0x1ea7d2(0x2d0)];if(_0x22a3c3['match'](_0x175e2b[_0x1ea7d2(0x291)][_0x28269c])){if(_0x1ea7d2(0x242)===_0x1ea7d2(0x339)){function _0x135185(){const _0x1fec18=_0x1ea7d2;var _0x261584=_0x221943(_0x219aa7['$1']);try{_0x2edf36+=_0x5372f5(_0x261584);}catch(_0x2cc296){if(_0x4614b2[_0x1fec18(0x324)]())_0x375a9c[_0x1fec18(0x1d4)](_0x2cc296);}}}else{var _0x33ae68=Number(RegExp['$1'])/0x64;_0x204a89+=_0x33ae68;}}if(_0x22a3c3[_0x1ea7d2(0x345)](_0x175e2b['EleDmgPlusFlt'][_0x28269c])){var _0x33ae68=Number(RegExp['$1']);console[_0x1ea7d2(0x1d4)](_0x175e2b[_0x1ea7d2(0x189)][_0x28269c],_0x33ae68),_0x204a89+=_0x33ae68;}if(_0x22a3c3[_0x1ea7d2(0x345)](_0x175e2b[_0x1ea7d2(0x2f8)][_0x28269c])){if(_0x1ea7d2(0x2e7)!==_0x1ea7d2(0x2bb)){var _0xcd7fff=String(RegExp['$1']);try{_0x204a89+=eval(_0xcd7fff);}catch(_0x178ee1){if('TZQhA'===_0x1ea7d2(0x138)){function _0x233d6a(){_0xef6ca0+=_0x5eaccf(_0x513d16);}}else{if($gameTemp['isPlaytest']())console['log'](_0x178ee1);}}}else{function _0x99c2ff(){const _0x5168a0=_0x1ea7d2;this[_0x5168a0(0x207)]={};const _0x1e13b7=this[_0x5168a0(0x15c)]();for(const _0x2045ec of _0x1e13b7){this['_traitSets'][_0x2045ec]='';}this[_0x5168a0(0xca)](),this[_0x5168a0(0x9e)]();}}}return _0x204a89;}else{function _0x5022e3(){const _0x17a5af=_0x1ea7d2;_0xacf35d[_0x17a5af(0x16f)][_0x17a5af(0x261)][_0x17a5af(0x15b)](this),this[_0x17a5af(0x265)](),this[_0x17a5af(0x22e)]['activate']();}}};return this['traitObjects']()['reduce'](_0x1ef919,0x0);},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x12f)]=function(_0xca8d2b){const _0xdd52bd=_0x3e7307,_0x146300=VisuMZ[_0xdd52bd(0xea)]['RegExp'],_0x4ac411=(_0x11e65e,_0x402f81)=>{const _0x38d481=_0xdd52bd;if(!_0x402f81)return _0x11e65e;const _0x3143c2=_0x402f81[_0x38d481(0x2d0)];if(_0x3143c2[_0x38d481(0x345)](_0x146300['EleDmgRatePer'][_0xca8d2b])){if(_0x38d481(0x2c3)===_0x38d481(0x2c3)){var _0x140d10=Number(RegExp['$1'])/0x64;_0x11e65e*=_0x140d10;}else{function _0x83d3ec(){return 0x0;}}}if(_0x3143c2[_0x38d481(0x345)](_0x146300[_0x38d481(0x2f4)][_0xca8d2b])){var _0x140d10=Number(RegExp['$1']);_0x11e65e*=_0x140d10;}if(_0x3143c2[_0x38d481(0x345)](_0x146300[_0x38d481(0xc0)][_0xca8d2b])){if(_0x38d481(0x342)==='IvUIs'){var _0x21cda6=String(RegExp['$1']);try{if('GxBHo'===_0x38d481(0xef)){function _0x2df1ac(){const _0x4e28ad=_0x38d481;let _0x8f4b6b=_0x3b185f[_0x4e28ad(0xea)][_0x4e28ad(0x1a4)]['call'](this,_0x26cd04);if(_0x592408[_0x4e28ad(0x330)])return _0x8f4b6b;return this[_0x4e28ad(0x200)](_0x4a991a,_0x8f4b6b);}}else _0x11e65e*=eval(_0x21cda6);}catch(_0x3314ad){if(_0x38d481(0x145)!=='gxwjA'){if($gameTemp[_0x38d481(0x324)]())console[_0x38d481(0x1d4)](_0x3314ad);}else{function _0x23c72d(){const _0x149e85=_0x38d481;_0x329589[_0x149e85(0x1d4)](_0x149e85(0x14c)['format'](this['name']()));for(const _0x3d5d8b in this[_0x149e85(0x207)]){_0x40d8af['log'](_0x149e85(0x1fa)['format'](_0x3d5d8b,this['_traitSets'][_0x3d5d8b]));}_0x31f4a6[_0x149e85(0x1d4)](_0x149e85(0x1e3));}}}}else{function _0x2ea89c(){const _0x49fca8=_0x38d481,_0x17280f=_0x500a0e['weaponTypes'][_0x1a5962],_0x352759=_0x35a915[_0x49fca8(0xc2)]((_0x414ba5['width']-this['wtypeWidth']())/0x2);this[_0x49fca8(0x14b)](_0x17280f,_0x52abdc+_0x352759,_0xc70621,_0x3853b5[_0x49fca8(0x283)]-_0x352759*0x2);}}}return _0x11e65e;};return this[_0xdd52bd(0x28d)]()[_0xdd52bd(0x328)](_0x4ac411,0x1);},Game_BattlerBase['prototype'][_0x3e7307(0x30c)]=function(_0x39d829){const _0x37ba4b=_0x3e7307,_0xe52d3=VisuMZ[_0x37ba4b(0xea)][_0x37ba4b(0x249)],_0x438c48=(_0x533492,_0x52c5f3)=>{const _0x221ef6=_0x37ba4b;if(!_0x52c5f3)return _0x533492;const _0x2dadf6=_0x52c5f3[_0x221ef6(0x2d0)];if(_0x2dadf6[_0x221ef6(0x345)](_0xe52d3[_0x221ef6(0x1b4)][_0x39d829])){if(_0x221ef6(0xf1)!==_0x221ef6(0x257)){var _0xa5807b=Number(RegExp['$1'])/0x64;_0x533492+=_0xa5807b;}else{function _0x406bfd(){const _0x343867=_0x221ef6,_0x2372a6=this['getTraitSet'](_0x2c1c0d),_0x331132=_0x53ca56[_0x343867(0x298)](_0x174a68,_0x2372a6);_0x598dfb*=_0x331132[_0x343867(0xe0)]!==_0x574562?_0x331132[_0x343867(0xe0)]:0x1;}}}if(_0x2dadf6[_0x221ef6(0x345)](_0xe52d3[_0x221ef6(0x285)][_0x39d829])){var _0xa5807b=Number(RegExp['$1']);_0x533492+=_0xa5807b;}if(_0x2dadf6[_0x221ef6(0x345)](_0xe52d3[_0x221ef6(0x267)][_0x39d829])){var _0x3dbb7c=String(RegExp['$1']);try{_0x533492+=eval(_0x3dbb7c);}catch(_0x48be5e){if('BBuTU'!=='wzvcr'){if($gameTemp[_0x221ef6(0x324)]())console[_0x221ef6(0x1d4)](_0x48be5e);}else{function _0x48e448(){const _0x24ce60=_0x221ef6;return[0x0][_0x24ce60(0x1c4)](_0x4e709d[_0x24ce60(0xea)][_0x24ce60(0x1b6)][_0x24ce60(0x2e3)]['ExcludeElements']);}}}}return _0x533492;};return this[_0x37ba4b(0x28d)]()[_0x37ba4b(0x328)](_0x438c48,0x0);},Game_BattlerBase[_0x3e7307(0x16f)]['getAbsorbedElements']=function(){const _0x1be6fe=_0x3e7307;let _0x3fd0b1=[];for(const _0x1d8fb1 of this[_0x1be6fe(0x28d)]()){if(_0x1be6fe(0x182)===_0x1be6fe(0x182)){if(!_0x1d8fb1)continue;const _0x53e2b8=_0x1d8fb1[_0x1be6fe(0x2d0)][_0x1be6fe(0x345)](/<ELEMENT ABSORB:[ ](.*)>/gi);if(_0x53e2b8)for(const _0x593486 of _0x53e2b8){if('HEbqv'==='WSazP'){function _0x2836f6(){var _0x7b1d28=_0x34672a(_0x3fc627['$1']);_0x373503+=_0x7b1d28;}}else{_0x593486['match'](/<ELEMENT ABSORB:[ ](.*)>/i);const _0x3f6b19=RegExp['$1'];if(_0x3f6b19[_0x1be6fe(0x345)](/(\d+(?:\s*,\s*\d+)*)/i)){if(_0x1be6fe(0x15f)===_0x1be6fe(0x15f)){const _0xcf2753=JSON[_0x1be6fe(0x163)]('['+RegExp['$1'][_0x1be6fe(0x345)](/\d+/g)+']');_0x3fd0b1=_0x3fd0b1[_0x1be6fe(0x1c4)](_0xcf2753);}else{function _0x1cd37e(){const _0x12ab24=_0x1be6fe;return this[_0x12ab24(0x9c)]=this[_0x12ab24(0x9c)]||{},this[_0x12ab24(0x9c)][_0x297bb2]!==_0x129dbc;}}}else{const _0x3d12ef=_0x3f6b19['split'](',');for(const _0x856214 of _0x3d12ef){const _0x40030d=DataManager[_0x1be6fe(0x334)](_0x856214);if(_0x40030d)_0x3fd0b1['push'](_0x40030d);}}}}}else{function _0x3fc04f(){const _0x156e33=_0x1be6fe;_0x348768[_0x156e33(0x19b)](_0x17c632),_0x5e210b+=_0x15a2a8['RandomWeight'];}}}return _0x3fd0b1;},Game_BattlerBase['prototype'][_0x3e7307(0x19d)]=function(){const _0x56e611=_0x3e7307;let _0x64dae6=[];for(const _0x25bf97 of this[_0x56e611(0x28d)]()){if(!_0x25bf97)continue;const _0x9e0e32=_0x25bf97['note'][_0x56e611(0x345)](/<ELEMENT REFLECT:[ ](.*)>/gi);if(_0x9e0e32){if(_0x56e611(0x1a0)!==_0x56e611(0x1c7))for(const _0x92a0cb of _0x9e0e32){if(_0x56e611(0xcd)===_0x56e611(0x2b6)){function _0x456394(){const _0x4de696=_0x56e611;if(!_0x530ebf[_0x4de696(0x112)]())return _0x2252dd;const _0x55cfcb=this[_0x4de696(0x15c)]();for(const _0x34934a of _0x55cfcb){const _0x454a2e=this[_0x4de696(0x25b)](_0x34934a),_0x2de450=_0x228e77['traitSet'](_0x34934a,_0x454a2e);_0x51d33c*=_0x2de450[_0x4de696(0x1a2)]!==_0xd77a01?_0x2de450[_0x4de696(0x1a2)]:0x1;}return _0x4b728a['round'](_0x2a5810);}}else{_0x92a0cb[_0x56e611(0x345)](/<ELEMENT REFLECT:[ ](.*)>/i);const _0xfaddc3=RegExp['$1'];if(_0xfaddc3['match'](/(\d+(?:\s*,\s*\d+)*)/i)){if(_0x56e611(0x2e9)===_0x56e611(0x1b5)){function _0x2636bc(){const _0x3f77c7=_0x56e611,_0x31c4f4=[0x0]['concat'](this[_0x3f77c7(0x19e)]());let _0x1ab405=this[_0x3f77c7(0x117)](0x2);return _0x1ab405[_0x3f77c7(0xe2)](_0x403067=>!_0x31c4f4[_0x3f77c7(0xed)](_0x403067));}}else{const _0x505dc9=JSON[_0x56e611(0x163)]('['+RegExp['$1']['match'](/\d+/g)+']');_0x64dae6=_0x64dae6[_0x56e611(0x1c4)](_0x505dc9);}}else{const _0x2b65ff=_0xfaddc3[_0x56e611(0x1d1)](',');for(const _0x4a80cf of _0x2b65ff){if(_0x56e611(0x222)===_0x56e611(0x141)){function _0x5031e3(){const _0x27159a=_0x56e611;return _0x417907[_0x27159a(0xea)]['Settings'][_0x27159a(0xd9)][_0x27159a(0x1b3)][_0x27159a(0x15b)](this,_0x3871bd,_0x290350);}}else{const _0x4094d6=DataManager[_0x56e611(0x334)](_0x4a80cf);if(_0x4094d6)_0x64dae6[_0x56e611(0x19b)](_0x4094d6);}}}}}else{function _0x2d51e5(){const _0x5adfc7=_0x56e611,_0x12921c=this[_0x5adfc7(0x21a)](_0x13d341);if(_0x12921c===_0x5adfc7(0x227))this[_0x5adfc7(0xcf)](_0x1a6156);else _0x12921c===_0x5adfc7(0x2d6)?this[_0x5adfc7(0xdf)](_0x120dab):_0x30e52f['prototype'][_0x5adfc7(0x2fb)][_0x5adfc7(0x15b)](this,_0xd1a4d2);}}}}return _0x64dae6;},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x1a6)]=function(){const _0x598c03=_0x3e7307;for(const _0x5c12c4 of this[_0x598c03(0x28d)]()){if(!_0x5c12c4)continue;if(_0x5c12c4['note'][_0x598c03(0x345)](/<FORCE ACTION ELEMENT:[ ]NULL>/i))return!![];}return![];},Game_BattlerBase[_0x3e7307(0x16f)]['getForcedActionElement']=function(){const _0x254258=_0x3e7307;for(const _0x376665 of this['traitObjects']()){if(!_0x376665)continue;if(_0x376665[_0x254258(0x2d0)][_0x254258(0x345)](/<FORCE ACTION ELEMENT:[ ](.*)>/i)){if(_0x254258(0x13f)!==_0x254258(0x178)){const _0x28057c=RegExp['$1'];if(_0x28057c[_0x254258(0x345)](/(\d+(?:\s*,\s*\d+)*)/i))return JSON[_0x254258(0x163)]('['+RegExp['$1']['match'](/\d+/g)+']');else{if(_0x254258(0x2c2)!=='wgdeo'){function _0x3c1d77(){const _0x5e3340=_0x254258;this[_0x5e3340(0x1c2)]();}}else{const _0x435453=_0x28057c['split'](',');let _0x2defe2=[];for(const _0x4c06b0 of _0x435453){const _0x349240=DataManager[_0x254258(0x334)](_0x4c06b0);if(_0x349240)_0x2defe2[_0x254258(0x19b)](_0x349240);}return _0x2defe2;}}}else{function _0x4d5ac2(){const _0x55f336=_0x254258;this[_0x55f336(0x14b)](_0x21d56b[_0x55f336(0xd6)](_0x475a3e[_0x55f336(0x1d7)],_0x584d46[_0x55f336(0x1aa)]),_0xdf437c,_0x26b865,_0x17288c-_0x3fcb5a*0x2);}}}}return[];},VisuMZ['ElementStatusCore']['Game_BattlerBase_paramRate']=Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x13a)],Game_BattlerBase['prototype'][_0x3e7307(0x13a)]=function(_0x15e291){const _0x38a029=_0x3e7307;let _0x27c284=VisuMZ[_0x38a029(0xea)][_0x38a029(0x194)]['call'](this,_0x15e291);return this[_0x38a029(0xe9)](_0x15e291,_0x27c284);},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0xe9)]=function(_0x31e45b,_0x3e6447){const _0x3dce32=_0x3e7307;if(!DataManager[_0x3dce32(0x112)]())return _0x3e6447;const _0x564a50=this['getTraitSetKeys'](),_0x55dba0=_0x3dce32(0x124)['format'](_0x31e45b);for(const _0x52a776 of _0x564a50){if('LHTFG'!==_0x3dce32(0x2e1)){function _0x51c013(){const _0x13fe62=_0x3dce32,_0x516237=this[_0x13fe62(0x2c1)],_0x557707=new _0x192ac6(_0x37465b,0x0,_0x2459dd,this[_0x13fe62(0x33a)]),_0xe5ca94=this['basicDataHeight']();if(this['isActorMenuImageAvailable']()){const _0x37b54f=_0x557707[_0x13fe62(0x283)],_0x4cdcbe=_0x557707[_0x13fe62(0x297)],_0x59a5f7=_0x557707['x'],_0x7e0e70=_0x557707['y'];this['drawItemActorMenuImage'](_0x516237,_0x59a5f7,_0x7e0e70,_0x37b54f,_0x4cdcbe);}else{const _0x4184ed=_0x2d187a['faceWidth'],_0x5292bd=_0x57c810['faceHeight'],_0x2f6c1d=_0x557707['x']+_0x44b81c[_0x13fe62(0x303)]((_0x557707[_0x13fe62(0x283)]-_0x4184ed)/0x2),_0x16ccb4=_0x557707['y']+_0xbe65fa[_0x13fe62(0x303)]((this['innerHeight']-_0xe5ca94-_0x5292bd)/0x2);this[_0x13fe62(0x251)](_0x516237,_0x2f6c1d,_0x16ccb4,_0x4184ed,_0x5292bd);}}}else{const _0x1208fd=this[_0x3dce32(0x25b)](_0x52a776),_0x49ee94=DataManager['traitSet'](_0x52a776,_0x1208fd);_0x3e6447*=_0x49ee94[_0x3dce32(0x27e)][_0x55dba0]||0x1;}}return _0x3e6447;},VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x1a4)]=Game_BattlerBase[_0x3e7307(0x16f)]['xparam'],Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x173)]=function(_0x55e627){const _0x915742=_0x3e7307;let _0x5a12f3=VisuMZ[_0x915742(0xea)]['Game_BattlerBase_xparam'][_0x915742(0x15b)](this,_0x55e627);if(Imported['VisuMZ_0_CoreEngine'])return _0x5a12f3;return this['xparamRateTraitSets'](_0x55e627,_0x5a12f3);},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x200)]=function(_0x4ae1d8,_0x3da171){const _0x2f7a42=_0x3e7307;if(!DataManager['traitSetsEnabled']())return _0x3da171;const _0x109639=this[_0x2f7a42(0x15c)](),_0x166fa2=_0x2f7a42(0x2cc)[_0x2f7a42(0xd6)](_0x4ae1d8);for(const _0x185246 of _0x109639){const _0x35657f=this[_0x2f7a42(0x25b)](_0x185246),_0x1a52d3=DataManager[_0x2f7a42(0x298)](_0x185246,_0x35657f);_0x3da171+=_0x1a52d3[_0x2f7a42(0xe8)][_0x166fa2]||0x0;}return _0x3da171;},VisuMZ['ElementStatusCore'][_0x3e7307(0x33e)]=Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x1e6)],Game_BattlerBase['prototype']['sparam']=function(_0x1f78db){const _0x370d36=_0x3e7307;let _0x380173=VisuMZ[_0x370d36(0xea)]['Game_BattlerBase_sparam'][_0x370d36(0x15b)](this,_0x1f78db);if(Imported[_0x370d36(0x330)])return _0x380173;return this[_0x370d36(0x210)](_0x1f78db,_0x380173);},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x210)]=function(_0x1bdb48,_0x391bc5){const _0x5e384c=_0x3e7307;if(!DataManager[_0x5e384c(0x112)]())return _0x391bc5;const _0x230ec1=this[_0x5e384c(0x15c)](),_0xba53c0=_0x5e384c(0x119)['format'](_0x1bdb48);for(const _0x13601d of _0x230ec1){const _0x1534b7=this[_0x5e384c(0x25b)](_0x13601d),_0x51bc33=DataManager['traitSet'](_0x13601d,_0x1534b7);_0x391bc5*=_0x51bc33[_0x5e384c(0x2e5)][_0xba53c0]||0x1;}return _0x391bc5;};Imported[_0x3e7307(0x330)]&&(VisuMZ['ElementStatusCore'][_0x3e7307(0x15a)]=Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x23a)],Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x23a)]=function(_0x43f294){const _0x1e82fd=_0x3e7307;let _0xca1468=VisuMZ[_0x1e82fd(0xea)][_0x1e82fd(0x15a)]['call'](this,_0x43f294);return this[_0x1e82fd(0x200)](_0x43f294,_0xca1468);},VisuMZ['ElementStatusCore']['Game_BattlerBase_sparamRate']=Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0xf2)],Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0xf2)]=function(_0x3dcc22){const _0x306e74=_0x3e7307;let _0x28d594=VisuMZ[_0x306e74(0xea)][_0x306e74(0x2ef)][_0x306e74(0x15b)](this,_0x3dcc22);return this[_0x306e74(0x210)](_0x3dcc22,_0x28d594);});;Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x9a)]=function(_0x5add1d){const _0x199aa3=_0x3e7307,_0x70d823=_0x199aa3(0x2b0);if(this[_0x199aa3(0x14d)](_0x70d823))return this['_cache'][_0x70d823][_0x199aa3(0xed)](_0x5add1d);return this[_0x199aa3(0x9c)][_0x70d823]=this[_0x199aa3(0x106)](Game_BattlerBase[_0x199aa3(0x2d7)]),this[_0x199aa3(0x9c)][_0x70d823]=this[_0x199aa3(0x9c)][_0x70d823][_0x199aa3(0x1c4)](this[_0x199aa3(0x169)]()),this[_0x199aa3(0x9c)][_0x70d823][_0x199aa3(0xed)](_0x5add1d);},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x169)]=function(){const _0x22ee4f=_0x3e7307;if(!DataManager[_0x22ee4f(0x112)]())return[];let _0x3d9143=[];const _0xcee885=this['getTraitSetKeys']();for(const _0x229a01 of _0xcee885){const _0xe604c6=this['getTraitSet'](_0x229a01),_0x59d118=DataManager[_0x22ee4f(0x298)](_0x229a01,_0xe604c6);_0x3d9143=_0x3d9143[_0x22ee4f(0x1c4)](_0x59d118[_0x22ee4f(0x33c)]);}return _0x3d9143;},Game_BattlerBase[_0x3e7307(0x16f)][_0x3e7307(0x212)]=function(_0x4ba576){const _0x4b317e=_0x3e7307,_0x5d1784=_0x4b317e(0x2c4);if(this['checkCacheKey'](_0x5d1784))return this[_0x4b317e(0x9c)][_0x5d1784][_0x4b317e(0xed)](_0x4ba576);return this['_cache'][_0x5d1784]=this[_0x4b317e(0x106)](Game_BattlerBase['TRAIT_EQUIP_ATYPE']),this['_cache'][_0x5d1784]=this[_0x4b317e(0x9c)][_0x5d1784][_0x4b317e(0x1c4)](this['atypeOkTraitSets']()),this['_cache'][_0x5d1784][_0x4b317e(0xed)](_0x4ba576);},Game_BattlerBase[_0x3e7307(0x16f)]['atypeOkTraitSets']=function(){const _0x13a033=_0x3e7307;if(!DataManager[_0x13a033(0x112)]())return[];let _0x307084=[];const _0x503e55=this[_0x13a033(0x15c)]();for(const _0x458e15 of _0x503e55){const _0x1ab153=this[_0x13a033(0x25b)](_0x458e15),_0x3a369a=DataManager[_0x13a033(0x298)](_0x458e15,_0x1ab153);_0x307084=_0x307084[_0x13a033(0x1c4)](_0x3a369a[_0x13a033(0x2d9)]);}return _0x307084;},Game_BattlerBase[_0x3e7307(0x16f)]['addPassiveStatesTraitSets']=function(){const _0x23e65f=_0x3e7307;if(!DataManager['traitSetsEnabled']())return[];this['_addingPassiveStateTraitSets']=!![],this['_cache'][_0x23e65f(0x29a)]=this[_0x23e65f(0x9c)][_0x23e65f(0x29a)]||[];const _0x373e0f=this[_0x23e65f(0x15c)]();for(const _0x289911 of _0x373e0f){if(_0x23e65f(0x1fd)!==_0x23e65f(0xe3)){const _0x4865f1=this[_0x23e65f(0x25b)](_0x289911),_0x4ee718=DataManager[_0x23e65f(0x298)](_0x289911,_0x4865f1);this[_0x23e65f(0x9c)][_0x23e65f(0x29a)]=this[_0x23e65f(0x9c)][_0x23e65f(0x29a)]['concat'](_0x4ee718[_0x23e65f(0x20a)]);}else{function _0x14c729(){const _0x20fa40=_0x23e65f;return this[_0x20fa40(0x1ff)]()?_0x4cfe14[_0x20fa40(0x16f)][_0x20fa40(0x2af)][_0x20fa40(0x15b)](this):0x0;}}}this[_0x23e65f(0x2ae)]=undefined;},Game_Actor['prototype'][_0x3e7307(0x177)]=function(){const _0x4fb39e=_0x3e7307;return this[_0x4fb39e(0xd8)]();},VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x272)]=Game_Actor[_0x3e7307(0x16f)][_0x3e7307(0x162)],Game_Actor[_0x3e7307(0x16f)][_0x3e7307(0x162)]=function(_0x379355){const _0x115cd5=_0x3e7307;VisuMZ[_0x115cd5(0xea)][_0x115cd5(0x272)][_0x115cd5(0x15b)](this,_0x379355),this['initElementStatusCore'](),this['recoverAll']();},Game_Actor['prototype']['initElementStatusCore']=function(){const _0x343e84=_0x3e7307;Game_Battler[_0x343e84(0x16f)][_0x343e84(0x1c2)][_0x343e84(0x15b)](this),this[_0x343e84(0x2f6)]();},Game_Actor[_0x3e7307(0x16f)][_0x3e7307(0xca)]=function(){const _0x1491d1=_0x3e7307;if(this[_0x1491d1(0xd8)]()[_0x1491d1(0x2d0)][_0x1491d1(0x345)](/<NO RANDOM TRAIT SETS>/i))return;const _0x2cea1c=this['getTraitSetKeys'](),_0x3d863d=VisuMZ[_0x1491d1(0xea)][_0x1491d1(0x1b6)];for(const _0x25e024 of _0x2cea1c){if('jLYrC'!==_0x1491d1(0x252))_0x3d863d['RandomizeActor']&&this[_0x1491d1(0x270)](_0x25e024);else{function _0x46062d(){const _0x3c1002=_0x1491d1;_0x52d930=this[_0x3c1002(0x2a3)]()-_0x38534f;}}}},Game_Actor[_0x3e7307(0x16f)]['initBiography']=function(){const _0xfe1093=_0x3e7307;this[_0xfe1093(0x156)]=this[_0xfe1093(0x1db)]();if(this[_0xfe1093(0xd8)]()[_0xfe1093(0x2d0)][_0xfe1093(0x345)](/<BIOGRAPHY>\s*([\s\S]*)\s*<\/BIOGRAPHY>/i)){if(_0xfe1093(0x288)!==_0xfe1093(0x288)){function _0x421fab(){return _0x693faf;}}else this[_0xfe1093(0x255)](RegExp['$1']);}},Game_Actor[_0x3e7307(0x16f)][_0x3e7307(0x165)]=function(){const _0x5b3b98=_0x3e7307;if(this['_biography']===undefined)this['initBiography']();return this[_0x5b3b98(0x156)];},Game_Actor[_0x3e7307(0x16f)][_0x3e7307(0x255)]=function(_0x2df559){const _0x3bd71d=_0x3e7307;if(this[_0x3bd71d(0x156)]===undefined)this[_0x3bd71d(0x2f6)]();this[_0x3bd71d(0x156)]=_0x2df559;},Game_Actor[_0x3e7307(0x16f)]['weaponTypes']=function(){const _0x3f5d5b=_0x3e7307,_0xbc416b=this[_0x3f5d5b(0x106)](Game_BattlerBase[_0x3f5d5b(0x2d7)])[_0x3f5d5b(0x271)]((_0x1991a8,_0x23d3dc)=>_0x1991a8-_0x23d3dc);return _0xbc416b[_0x3f5d5b(0xe2)]((_0x118cc6,_0x140ce3,_0x5f02bf)=>_0x5f02bf[_0x3f5d5b(0x1c8)](_0x118cc6)===_0x140ce3);},Game_Actor[_0x3e7307(0x16f)][_0x3e7307(0xc3)]=function(){const _0x16814b=_0x3e7307,_0x36b12e=this[_0x16814b(0x106)](Game_BattlerBase[_0x16814b(0x2fe)])['sort']((_0x4e37ee,_0x2d4ab2)=>_0x4e37ee-_0x2d4ab2);return _0x36b12e[_0x16814b(0xe2)]((_0x50a8e1,_0x2739e3,_0x54fcb0)=>_0x54fcb0[_0x16814b(0x1c8)](_0x50a8e1)===_0x2739e3);},Game_Enemy['prototype']['getTraitSetObject']=function(){return this['enemy']();},VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x18c)]=Game_Enemy['prototype'][_0x3e7307(0x162)],Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0x162)]=function(_0x2a05db,_0x41d59a,_0x2111eb){const _0x38f8f5=_0x3e7307;VisuMZ['ElementStatusCore'][_0x38f8f5(0x18c)][_0x38f8f5(0x15b)](this,_0x2a05db,_0x41d59a,_0x2111eb),!Imported[_0x38f8f5(0x176)]&&this[_0x38f8f5(0x1c2)](),this[_0x38f8f5(0xfd)](),this[_0x38f8f5(0x167)]();},Game_Enemy['prototype'][_0x3e7307(0x1c2)]=function(){const _0x754aea=_0x3e7307;Game_Battler['prototype'][_0x754aea(0x1c2)]['call'](this),this[_0x754aea(0x1a5)]();},Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0xca)]=function(){const _0x2a5e04=_0x3e7307;if(this['enemy']()[_0x2a5e04(0x2d0)]['match'](/<NO RANDOM TRAIT SETS>/i))return;const _0xb88ebc=this[_0x2a5e04(0x15c)](),_0x4155d4=VisuMZ['ElementStatusCore'][_0x2a5e04(0x1b6)];for(const _0x3145c4 of _0xb88ebc){if(_0x4155d4[_0x3145c4][_0x2a5e04(0x171)]){if(_0x2a5e04(0x292)!==_0x2a5e04(0x292)){function _0x561cd1(){var _0x19e09b=_0x3778f2(_0x15573f['$1'])/0x64;_0x4e441f+=_0x19e09b;}}else this[_0x2a5e04(0x270)](_0x3145c4);}}},VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x2a0)]=Game_Enemy[_0x3e7307(0x16f)]['name'],Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0xb2)]=function(){const _0x2eeea8=_0x3e7307;if(DataManager[_0x2eeea8(0x112)]()){if(_0x2eeea8(0x1e0)!=='hAmgq'){function _0x388bfe(){const _0x45e92b=_0x2eeea8,_0x10aa4e=[_0x45e92b(0x2ec),_0x45e92b(0x2c6),_0x45e92b(0x33f),_0x45e92b(0x16e),_0x45e92b(0x1c5),_0x45e92b(0x18e),_0x45e92b(0x254),_0x45e92b(0x1c0)],_0x3a3283=['HIT','EVA',_0x45e92b(0x1d8),_0x45e92b(0x2f5),_0x45e92b(0xa4),'MRF','CNT',_0x45e92b(0xdd),_0x45e92b(0x2bc),'TRG'],_0x1f9155=[_0x45e92b(0x2e2),_0x45e92b(0x24f),_0x45e92b(0x192),_0x45e92b(0xa1),_0x45e92b(0x2ac),_0x45e92b(0x22f),_0x45e92b(0x234),_0x45e92b(0x12b),_0x45e92b(0x1cd),'EXR'];if(_0x10aa4e[_0x45e92b(0xed)](_0x4ae3fa))return _0x464c82['param'](_0x10aa4e[_0x45e92b(0x1c8)](_0x509504));else{if(_0x3a3283[_0x45e92b(0xed)](_0x2a1947)){const _0x1f319a=_0x2cffd2['xparam'](_0x3a3283[_0x45e92b(0x1c8)](_0x5abb6e));return _0x45e92b(0x1e2)[_0x45e92b(0xd6)](_0x3ad4b9[_0x45e92b(0xc2)](_0x1f319a*0x64));}else{if(_0x1f9155[_0x45e92b(0xed)](_0x4969fe)){const _0x301ba0=_0x11a864[_0x45e92b(0x1e6)](_0x1f9155[_0x45e92b(0x1c8)](_0x32dd30));return _0x45e92b(0x1e2)[_0x45e92b(0xd6)](_0x53cd96[_0x45e92b(0xc2)](_0x301ba0*0x64));}}}}}else return this[_0x2eeea8(0x2e6)]();}else{if(_0x2eeea8(0x2f2)===_0x2eeea8(0x2e4)){function _0x1002f9(){const _0x2981b6=_0x2eeea8,_0x4d4496=_0x1a8aa1[_0x2981b6(0x2d0)],_0x2c4bf4={'Element':/<ELEMENT:[ ](.*)>/i,'SubElement':/<SUBELEMENT:[ ](.*)>/i,'Gender':/<GENDER:[ ](.*)>/i,'Race':/<RACE:[ ](.*)>/i,'Nature':/<NATURE:[ ](.*)>/i,'Alignment':/<ALIGNMENT:[ ](.*)>/i,'Blessing':/<BLESSING:[ ](.*)>/i,'Curse':/<CURSE:[ ](.*)>/i,'Zodiac':/<ZODIAC:[ ](.*)>/i,'Variant':/<VARIANT:[ ](.*)>/i};for(const _0x45806a in _0x2c4bf4){const _0x2d6b0a=_0x2c4bf4[_0x45806a];_0x4d4496[_0x2981b6(0x345)](_0x2d6b0a)&&(_0x9668a0[_0x45806a]=this[_0x2981b6(0xee)](_0x33d09c['$1']));}_0x4d4496[_0x2981b6(0x345)](/<ELEMENT:[ ](.*)\/(.*)>/i)&&(_0x2c9529['Element']=_0x4b5143(_0x300f2f['$1'])[_0x2981b6(0x17b)](),_0x59b37b['SubElement']=_0x273712(_0x356f95['$2'])[_0x2981b6(0x17b)]());}}else return VisuMZ['ElementStatusCore'][_0x2eeea8(0x2a0)][_0x2eeea8(0x15b)](this);}},Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0x2e6)]=function(){const _0x38442c=_0x3e7307,_0x4629fc=_0x38442c(0xb2);if(this[_0x38442c(0x14d)](_0x4629fc))return this[_0x38442c(0x9c)][_0x4629fc];const _0x3182ce=this[_0x38442c(0x300)]();return _0x3182ce[_0x38442c(0xd6)](this['traitSet'](_0x38442c(0x2b5))[_0x38442c(0x2b3)]||'',this['traitSet'](_0x38442c(0x2a4))[_0x38442c(0x2b3)]||'',this[_0x38442c(0x298)](_0x38442c(0x2d2))[_0x38442c(0x2b3)]||'',this[_0x38442c(0x298)]('Race')['FmtText']||'',this[_0x38442c(0x298)](_0x38442c(0x331))[_0x38442c(0x2b3)]||'',this[_0x38442c(0x298)](_0x38442c(0x21e))[_0x38442c(0x2b3)]||'',this[_0x38442c(0x298)](_0x38442c(0x322))[_0x38442c(0x2b3)]||'',this[_0x38442c(0x298)]('Curse')['FmtText']||'',this['traitSet'](_0x38442c(0x2cb))[_0x38442c(0x2b3)]||'',this[_0x38442c(0x298)](_0x38442c(0x26c))[_0x38442c(0x2b3)]||'',this[_0x38442c(0x1c9)](),this[_0x38442c(0x258)]?this[_0x38442c(0x26e)]:'')[_0x38442c(0xa9)](/[\s\n\r]+/g,'\x20')[_0x38442c(0x17b)]();},Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0x300)]=function(){const _0x4801b2=_0x3e7307;let _0x44d3d9=VisuMZ[_0x4801b2(0xea)][_0x4801b2(0x1b6)][_0x4801b2(0x105)][_0x4801b2(0xec)];return this[_0x4801b2(0xdb)]()[_0x4801b2(0x2d0)]['match'](/<TRAIT SET NAME FORMAT>\s*([\s\S]*)\s*<\/TRAIT SET NAME FORMAT>/i)&&(_0x44d3d9=String(RegExp['$1'])),_0x44d3d9=_0x44d3d9['replace'](/\[ELEMENT\]/gi,'%1'),_0x44d3d9=_0x44d3d9[_0x4801b2(0xa9)](/\[SUBELEMENT\]/gi,'%2'),_0x44d3d9=_0x44d3d9[_0x4801b2(0xa9)](/\[GENDER\]/gi,'%3'),_0x44d3d9=_0x44d3d9['replace'](/\[RACE\]/gi,'%4'),_0x44d3d9=_0x44d3d9[_0x4801b2(0xa9)](/\[NATURE\]/gi,'%5'),_0x44d3d9=_0x44d3d9[_0x4801b2(0xa9)](/\[ALIGNMENT\]/gi,'%6'),_0x44d3d9=_0x44d3d9['replace'](/\[BLESSING\]/gi,'%7'),_0x44d3d9=_0x44d3d9['replace'](/\[CURSE\]/gi,'%8'),_0x44d3d9=_0x44d3d9[_0x4801b2(0xa9)](/\[ZODIAC\]/gi,'%9'),_0x44d3d9=_0x44d3d9[_0x4801b2(0xa9)](/\[VARIANT\]/gi,'%10'),_0x44d3d9=_0x44d3d9[_0x4801b2(0xa9)](/\[NAME\]/gi,_0x4801b2(0x247)),_0x44d3d9=_0x44d3d9[_0x4801b2(0xa9)](/\[LETTER\]/gi,'%12'),_0x44d3d9;},VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x2d5)]=Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0x32a)],Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0x32a)]=function(_0x302b49){const _0x2f4d3b=_0x3e7307;this[_0x2f4d3b(0x9c)]={},VisuMZ['ElementStatusCore'][_0x2f4d3b(0x2d5)]['call'](this,_0x302b49);},VisuMZ['ElementStatusCore'][_0x3e7307(0x149)]=Game_Enemy['prototype'][_0x3e7307(0x96)],Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0x96)]=function(_0x1d0a08){const _0x1b222c=_0x3e7307;this[_0x1b222c(0x9c)]={},VisuMZ[_0x1b222c(0xea)]['Game_Enemy_setPlural']['call'](this,_0x1d0a08);},VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x2b8)]=Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0x24c)],Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0x24c)]=function(){const _0x4ed27f=_0x3e7307;let _0x56fb8c=VisuMZ[_0x4ed27f(0xea)][_0x4ed27f(0x2b8)][_0x4ed27f(0x15b)](this);return this[_0x4ed27f(0x196)](_0x56fb8c);},VisuMZ['ElementStatusCore'][_0x3e7307(0x11c)]=Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0xc8)],Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0xc8)]=function(){const _0x158d60=_0x3e7307;let _0x2a66a0=VisuMZ['ElementStatusCore']['Game_Enemy_gold'][_0x158d60(0x15b)](this);return this[_0x158d60(0x161)](_0x2a66a0);},VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x13c)]=Game_Enemy['prototype'][_0x3e7307(0x21f)],Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0x21f)]=function(){const _0xa77e6c=_0x3e7307;let _0x53ea15=VisuMZ[_0xa77e6c(0xea)][_0xa77e6c(0x13c)]['call'](this);return this[_0xa77e6c(0x293)](_0x53ea15);},Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0x196)]=function(_0x128ef1){const _0x6d5d6c=_0x3e7307;if(!DataManager[_0x6d5d6c(0x112)]())return _0x128ef1;const _0x2f4fca=this[_0x6d5d6c(0x15c)]();for(const _0x491fac of _0x2f4fca){if(_0x6d5d6c(0x305)===_0x6d5d6c(0x116)){function _0x1ca37c(){const _0x15fe55=_0x6d5d6c;return _0x48b4f2[_0x15fe55(0x126)]>0x0?_0x37e8f5[_0x15fe55(0xea)]['Settings'][_0x15fe55(0xd9)][_0x15fe55(0x1b3)]['call'](this,_0x2fd7de,_0x2831d0):0x1;}}else{const _0x3c5a30=this[_0x6d5d6c(0x25b)](_0x491fac),_0xcbffe6=DataManager[_0x6d5d6c(0x298)](_0x491fac,_0x3c5a30);_0x128ef1*=_0xcbffe6['EXPRate']!==undefined?_0xcbffe6[_0x6d5d6c(0x1a2)]:0x1;}}return Math[_0x6d5d6c(0xc2)](_0x128ef1);},Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0x161)]=function(_0x334bca){const _0x34ad83=_0x3e7307;if(!DataManager[_0x34ad83(0x112)]())return _0x334bca;const _0x3a9e0b=this[_0x34ad83(0x15c)]();for(const _0x347c08 of _0x3a9e0b){const _0x25ff19=this['getTraitSet'](_0x347c08),_0x3f6a2a=DataManager[_0x34ad83(0x298)](_0x347c08,_0x25ff19);_0x334bca*=_0x3f6a2a[_0x34ad83(0xe0)]!==undefined?_0x3f6a2a['GoldRate']:0x1;}return Math[_0x34ad83(0xc2)](_0x334bca);},Game_Enemy['prototype']['dropItemRateTraitSets']=function(_0x2a3716){const _0x2563a6=_0x3e7307;if(!DataManager['traitSetsEnabled']())return _0x2a3716;const _0x2f6983=this[_0x2563a6(0x15c)]();for(const _0xdcf965 of _0x2f6983){const _0x1987d9=this[_0x2563a6(0x25b)](_0xdcf965),_0x4dc0c2=DataManager[_0x2563a6(0x298)](_0xdcf965,_0x1987d9);_0x2a3716*=_0x4dc0c2['DropRate']!==undefined?_0x4dc0c2['DropRate']:0x1;}return _0x2a3716;},Game_Enemy['prototype'][_0x3e7307(0x1a5)]=function(){const _0x27de5d=_0x3e7307;this[_0x27de5d(0x1b1)]={'name':this[_0x27de5d(0xdb)]()[_0x27de5d(0xb1)],'hue':this[_0x27de5d(0xdb)]()['battlerHue']};const _0x8bf432=this[_0x27de5d(0xdb)]()[_0x27de5d(0x2d0)],_0x51b64d=this[_0x27de5d(0x15c)]();for(const _0x53370e of _0x51b64d){const _0xfe37f=this[_0x27de5d(0x298)](_0x53370e)[_0x27de5d(0x301)]['toUpperCase']()[_0x27de5d(0x17b)](),_0x4d6547=_0x53370e[_0x27de5d(0x274)]()['trim']();if(_0x8bf432[_0x27de5d(0x345)](VisuMZ[_0x27de5d(0xea)][_0x27de5d(0x249)][_0x27de5d(0x1ba)[_0x27de5d(0xd6)](_0x4d6547,_0xfe37f)]))this[_0x27de5d(0x1b1)][_0x27de5d(0xb2)]=String(RegExp['$1']);else{if(_0x8bf432['match'](VisuMZ['ElementStatusCore']['RegExp'][_0x27de5d(0x341)[_0x27de5d(0xd6)](_0x4d6547,_0xfe37f)])){const _0x49b12e=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x27de5d(0x1bf)]('');this[_0x27de5d(0x1b1)][_0x27de5d(0xb2)]=DataManager['processRandomizedData'](_0x49b12e);}}if(_0x8bf432[_0x27de5d(0x345)](VisuMZ[_0x27de5d(0xea)][_0x27de5d(0x249)][_0x27de5d(0x20e)[_0x27de5d(0xd6)](_0x4d6547,_0xfe37f)])){if(_0x27de5d(0x26f)!==_0x27de5d(0x26f)){function _0x39c656(){const _0x20071e=_0x27de5d,_0x50dc77=_0x1767ce['armorTypes'][_0x2e2579],_0x27daf3=_0x3ab597[_0x20071e(0xc2)]((_0x21dc6e['width']-this[_0x20071e(0x1a8)]())/0x2);this[_0x20071e(0x14b)](_0x50dc77,_0x55da14+_0x27daf3,_0x4ed7d7,_0x5b5161[_0x20071e(0x283)]-_0x27daf3*0x2);}}else this[_0x27de5d(0x1b1)]['hue']=Number(RegExp['$1'])[_0x27de5d(0x1a7)](0x0,0x168);}else{if(_0x8bf432[_0x27de5d(0x345)](VisuMZ[_0x27de5d(0xea)]['RegExp'][_0x27de5d(0xd5)['format'](_0x4d6547,_0xfe37f)])){const _0xc3a43c=String(RegExp['$1'])[_0x27de5d(0x1d1)](/[\r\n]+/)['remove']('');this[_0x27de5d(0x1b1)][_0x27de5d(0x10f)]=Number(DataManager[_0x27de5d(0xaa)](_0xc3a43c))['clamp'](0x0,0x168);}}}},Game_Enemy['prototype']['battlerName']=function(){const _0x5e202d=_0x3e7307;if(!this['_specialBattler'])this['createSpecialBattlers']();return this[_0x5e202d(0x1b1)][_0x5e202d(0xb2)];},Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0x206)]=function(){const _0x18918b=_0x3e7307;if(!this[_0x18918b(0x1b1)])this[_0x18918b(0x1a5)]();return this['_specialBattler']['hue'];},VisuMZ['ElementStatusCore'][_0x3e7307(0x304)]=Game_Enemy[_0x3e7307(0x16f)][_0x3e7307(0x95)],Game_Enemy[_0x3e7307(0x16f)]['transform']=function(_0x94660c){const _0x30bc51=_0x3e7307;VisuMZ[_0x30bc51(0xea)][_0x30bc51(0x304)]['call'](this,_0x94660c),this[_0x30bc51(0x1a5)]();},Scene_Status[_0x3e7307(0x16f)][_0x3e7307(0x1ee)]=function(){const _0x3538d3=_0x3e7307;if(ConfigManager[_0x3538d3(0x311)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x3538d3(0x275)];else{if(this[_0x3538d3(0x1ff)]()){if('KjlZL'===_0x3538d3(0x32f))return this[_0x3538d3(0x2fc)]()[_0x3538d3(0x345)](/LOWER/i);else{function _0x2fd152(){const _0x5b27f0=_0x3538d3,_0x164998=_0x3cc4d0[_0x5b27f0(0x283)],_0x7af4aa=_0x50d0c9[_0x5b27f0(0x297)],_0x3cc264=_0x39160d['x'],_0x4a263c=_0x572f4e['y'];this['drawItemActorMenuImage'](_0x13758d,_0x3cc264,_0x4a263c,_0x164998,_0x7af4aa);}}}else{if(_0x3538d3(0x1cb)===_0x3538d3(0x1cb))Scene_MenuBase[_0x3538d3(0x16f)][_0x3538d3(0x1de)][_0x3538d3(0x15b)](this);else{function _0x5383ea(){const _0x37b109=_0x3538d3;this[_0x37b109(0x174)](...arguments);}}}}},Scene_Status['prototype'][_0x3e7307(0x2fc)]=function(){const _0x310aff=_0x3e7307;return VisuMZ[_0x310aff(0xea)][_0x310aff(0x1b6)][_0x310aff(0x2e3)][_0x310aff(0x1e1)];},Scene_Status[_0x3e7307(0x16f)][_0x3e7307(0x1ff)]=function(){const _0x1e30a6=_0x3e7307;return VisuMZ[_0x1e30a6(0xea)][_0x1e30a6(0x1b6)][_0x1e30a6(0x2e3)]['EnableLayout'];},VisuMZ[_0x3e7307(0xea)]['Scene_Status_create']=Scene_Status[_0x3e7307(0x16f)][_0x3e7307(0x23d)],Scene_Status[_0x3e7307(0x16f)][_0x3e7307(0x23d)]=function(){const _0x5de532=_0x3e7307;this['isUseElementStatusCoreUpdatedLayout']()?this[_0x5de532(0xd1)]():VisuMZ[_0x5de532(0xea)][_0x5de532(0x223)][_0x5de532(0x15b)](this);},Scene_Status['prototype'][_0x3e7307(0xd1)]=function(){const _0x27f30d=_0x3e7307;Scene_MenuBase[_0x27f30d(0x16f)][_0x27f30d(0x23d)][_0x27f30d(0x15b)](this),this[_0x27f30d(0x12d)](),this[_0x27f30d(0x30b)](),this[_0x27f30d(0x197)]();},Scene_Status[_0x3e7307(0x16f)][_0x3e7307(0x2af)]=function(){const _0x1ba5f7=_0x3e7307;if(this[_0x1ba5f7(0x1ff)]())return Scene_MenuBase['prototype'][_0x1ba5f7(0x2af)][_0x1ba5f7(0x15b)](this);else{if(_0x1ba5f7(0x28a)===_0x1ba5f7(0x28a))return 0x0;else{function _0x2cff21(){const _0x504a01=_0x1ba5f7;this[_0x504a01(0x1b1)][_0x504a01(0xb2)]=_0x5a042d(_0x92c1a0['$1']);}}}},Scene_Status[_0x3e7307(0x16f)][_0x3e7307(0x2aa)]=function(){const _0x28b846=_0x3e7307;return this[_0x28b846(0x1ff)]()?this[_0x28b846(0x310)]():Scene_MenuBase[_0x28b846(0x16f)][_0x28b846(0x2aa)]['call'](this);},Scene_Status['prototype'][_0x3e7307(0x310)]=function(){const _0x4e3b16=_0x3e7307,_0xa2df4e=0x0,_0x25e9e5=this[_0x4e3b16(0x1d5)](),_0x49fedc=Graphics['boxWidth'],_0x374ea7=this[_0x4e3b16(0x2af)]();return new Rectangle(_0xa2df4e,_0x25e9e5,_0x49fedc,_0x374ea7);},Scene_Status[_0x3e7307(0x16f)][_0x3e7307(0x30b)]=function(){const _0x3be549=_0x3e7307,_0x2d56b4=this[_0x3be549(0x2dc)]();this[_0x3be549(0x22e)]=new Window_StatusCategory(_0x2d56b4),this['_categoryWindow'][_0x3be549(0x1e5)](_0x3be549(0x211),this['popScene']['bind'](this)),this[_0x3be549(0x22e)][_0x3be549(0x1e5)](_0x3be549(0x230),this['nextActor']['bind'](this)),this['_categoryWindow'][_0x3be549(0x1e5)](_0x3be549(0x17d),this[_0x3be549(0x195)][_0x3be549(0x1f4)](this)),this['addWindow'](this[_0x3be549(0x22e)]);},Scene_Status[_0x3e7307(0x16f)]['categoryWindowRect']=function(){const _0x2d8a70=_0x3e7307,_0x13666c=Graphics[_0x2d8a70(0xe4)],_0x48578c=this[_0x2d8a70(0x1ce)](0x1,!![]),_0x379bd=0x0;let _0x4678a5=0x0;return this[_0x2d8a70(0x2fc)]()['match'](/TOP/i)?_0x4678a5=this[_0x2d8a70(0x220)]():_0x4678a5=this[_0x2d8a70(0x2a3)]()-_0x48578c,new Rectangle(_0x379bd,_0x4678a5,_0x13666c,_0x48578c);},Scene_Status[_0x3e7307(0x16f)][_0x3e7307(0x197)]=function(){const _0x586899=_0x3e7307,_0x52e301=this[_0x586899(0x187)]();this[_0x586899(0xb3)]=new Window_StatusData(_0x52e301),this[_0x586899(0xe6)](this[_0x586899(0xb3)]),this['_categoryWindow']['setItemWindow'](this[_0x586899(0xb3)]);},Scene_Status[_0x3e7307(0x16f)][_0x3e7307(0x187)]=function(){const _0x4b6178=_0x3e7307,_0x318198=Graphics['boxWidth'],_0x3020c5=this['mainAreaHeight']()-this['_categoryWindow']['height'],_0x30bbcd=0x0;let _0x24edd7=0x0;return this[_0x4b6178(0x2fc)]()[_0x4b6178(0x345)](/TOP/i)?_0x24edd7=this[_0x4b6178(0x22e)]['y']+this[_0x4b6178(0x22e)][_0x4b6178(0x297)]:_0x24edd7=this['mainAreaTop'](),new Rectangle(_0x30bbcd,_0x24edd7,_0x318198,_0x3020c5);},VisuMZ[_0x3e7307(0xea)][_0x3e7307(0xfa)]=Scene_Status['prototype']['refreshActor'],Scene_Status[_0x3e7307(0x16f)][_0x3e7307(0x265)]=function(){const _0x2c2a69=_0x3e7307;this[_0x2c2a69(0x1ff)]()?this['refreshActorElementStatusCore']():VisuMZ[_0x2c2a69(0xea)][_0x2c2a69(0xfa)][_0x2c2a69(0x15b)](this);},Scene_Status[_0x3e7307(0x16f)][_0x3e7307(0x231)]=function(){const _0x1aa331=_0x3e7307,_0x4bc3cb=this[_0x1aa331(0xd8)]();this[_0x1aa331(0x309)][_0x1aa331(0x235)](_0x4bc3cb[_0x1aa331(0x1db)]()),this[_0x1aa331(0xb3)][_0x1aa331(0x123)](_0x4bc3cb);},VisuMZ[_0x3e7307(0xea)]['Scene_Status_onActorChange']=Scene_Status[_0x3e7307(0x16f)][_0x3e7307(0x261)],Scene_Status[_0x3e7307(0x16f)][_0x3e7307(0x261)]=function(){const _0x352d3c=_0x3e7307;if(this[_0x352d3c(0x1ff)]()){if('zUPrA'!==_0x352d3c(0x243))this['onActorChangeElementStatusCore']();else{function _0x2801ee(){const _0x4f5d6c=_0x352d3c,_0x5cf59f='-------',_0x4f4bbe=this[_0x4f5d6c(0x2c8)](),_0x4090a7=this[_0x4f5d6c(0x16c)](),_0x26b42a=this[_0x4f5d6c(0x307)](),_0x4535e8=this['_actor'],_0x27e3fd=this['itemPadding'](),_0x2a0f09=this['innerWidth']/0x2;let _0x4e4ff7=new _0x88a1a5(0x0,0x0,_0x2a0f09,this['innerHeight']),_0x4979f9=0x0,_0xc5603c=0x0;this[_0x4f5d6c(0x218)](0x0,this['innerWidth']/0x2);let _0x967364=_0x4e4ff7['x'],_0x1710ff=_0x47d3f3[_0x4f5d6c(0x201)](_0x4e4ff7['y'],_0x4e4ff7['y']+(_0x4e4ff7['height']-_0x26b42a)),_0x39619e=_0x4e4ff7['width'],_0xb7c1ca=_0x4e4ff7['y']+_0x4e4ff7[_0x4f5d6c(0x297)]-_0x1710ff;this[_0x4f5d6c(0x10d)](0x0,_0x1710ff,_0x39619e,_0x4f4bbe,0x2),this[_0x4f5d6c(0x1c1)](_0x4535e8['name'](),_0x967364,_0x1710ff,_0x39619e,_0x4f5d6c(0xf5)),_0x967364=_0x4e4ff7['x']+_0x5d62c6[_0x4f5d6c(0xc2)]((_0x4e4ff7[_0x4f5d6c(0x283)]-0x80)/0x2),_0x1710ff+=_0x4f4bbe,this[_0x4f5d6c(0x10d)](0x0,_0x1710ff,_0x39619e,_0x4f4bbe),this[_0x4f5d6c(0x19a)](_0x4535e8,_0x967364,_0x1710ff);const _0x257934=_0x4535e8['currentClass']()['name'];_0x967364=_0x4e4ff7['x']+_0x2abd83['round']((_0x4e4ff7[_0x4f5d6c(0x283)]-this[_0x4f5d6c(0x144)](_0x257934)[_0x4f5d6c(0x283)])/0x2),_0x1710ff+=_0x4f4bbe,this[_0x4f5d6c(0x10d)](0x0,_0x1710ff,_0x39619e,_0x4f4bbe),this[_0x4f5d6c(0x14b)](_0x257934,_0x967364,_0x1710ff,_0x39619e),_0x967364=_0x4e4ff7['x']+_0x4bf795[_0x4f5d6c(0xc2)]((_0x4e4ff7['width']-0x90)/0x2),_0x1710ff+=_0x4f4bbe,this[_0x4f5d6c(0x10d)](0x0,_0x1710ff,_0x39619e,_0x4f4bbe),this[_0x4f5d6c(0x202)](_0x4535e8,_0x967364,_0x1710ff),_0x967364=_0x4e4ff7['x']+_0x211645['round']((_0x4e4ff7[_0x4f5d6c(0x283)]-0x80)/0x2),_0x1710ff+=_0x4f4bbe,this[_0x4f5d6c(0x10d)](0x0,_0x1710ff,_0x39619e,this[_0x4f5d6c(0x33a)]-_0x1710ff),this['placeGauge'](_0x4535e8,'hp',_0x967364,_0x1710ff),_0x1710ff+=_0x4090a7,this['placeGauge'](_0x4535e8,'mp',_0x967364,_0x1710ff),_0x1710ff+=_0x4090a7;_0x1013aa[_0x4f5d6c(0xbb)]&&this[_0x4f5d6c(0x299)](_0x4535e8,'tp',_0x967364,_0x1710ff);_0x4e4ff7=new _0x561b51(_0x2a0f09,0x0,_0x2a0f09,this[_0x4f5d6c(0x33a)]),this[_0x4f5d6c(0x338)](_0x2d4fb9[_0x4f5d6c(0x2de)]()),this['drawItemDarkRect'](_0x4e4ff7['x'],_0x4e4ff7['y'],_0x4e4ff7[_0x4f5d6c(0x283)],_0x4f4bbe,0x2),this[_0x4f5d6c(0x1c1)](_0x21962e[_0x4f5d6c(0x24c)],_0x4e4ff7['x'],_0x4e4ff7['y'],_0x4e4ff7[_0x4f5d6c(0x283)],_0x4f5d6c(0xf5));const _0x28c59a=_0x4f4bbe*0x5;this[_0x4f5d6c(0x10d)](_0x4e4ff7['x'],_0x4e4ff7['y']+_0x4f4bbe*0x1,_0x4e4ff7[_0x4f5d6c(0x283)],_0x4f4bbe*0x2),this[_0x4f5d6c(0x10d)](_0x4e4ff7['x'],_0x4e4ff7['y']+_0x4f4bbe*0x3,_0x4e4ff7[_0x4f5d6c(0x283)],_0x4f4bbe*0x2);const _0x1b391f=_0x4af869[_0x4f5d6c(0x337)]['format'](_0x16f3e3['exp']),_0x54a034=_0x5e5edf[_0x4f5d6c(0x108)][_0x4f5d6c(0xd6)](_0x38529b['level']);this[_0x4f5d6c(0x338)](_0x201d5b['systemColor']()),this[_0x4f5d6c(0x1c1)](_0x1b391f,_0x4e4ff7['x']+_0x27e3fd,_0x4e4ff7['y']+_0x4f4bbe*0x1,_0x4e4ff7[_0x4f5d6c(0x283)]-_0x27e3fd*0x2),this[_0x4f5d6c(0x1c1)](_0x54a034,_0x4e4ff7['x']+_0x27e3fd,_0x4e4ff7['y']+_0x4f4bbe*0x3,_0x4e4ff7[_0x4f5d6c(0x283)]-_0x27e3fd*0x2),this['resetTextColor']();const _0x1c0197=_0x4535e8['currentExp'](),_0x116434=_0x4535e8['isMaxLevel']()?_0x5cf59f:_0x4535e8['nextRequiredExp']();this[_0x4f5d6c(0x1c1)](_0x1c0197,_0x4e4ff7['x']+_0x27e3fd,_0x4e4ff7['y']+_0x4f4bbe*0x1,_0x4e4ff7[_0x4f5d6c(0x283)]-_0x27e3fd*0x2,_0x4f5d6c(0xbd)),this[_0x4f5d6c(0x1c1)](_0x116434,_0x4e4ff7['x']+_0x27e3fd,_0x4e4ff7['y']+_0x4f4bbe*0x3,_0x4e4ff7[_0x4f5d6c(0x283)]-_0x27e3fd*0x2,_0x4f5d6c(0xbd)),_0xc5603c=_0x4e4ff7['y']+_0x28c59a,this[_0x4f5d6c(0x338)](_0x15d201[_0x4f5d6c(0x2de)]()),this['drawItemDarkRect'](_0x4e4ff7['x'],_0xc5603c,_0x4e4ff7[_0x4f5d6c(0x283)],_0x4f4bbe,0x2),this['drawText'](_0x371dd2[_0x4f5d6c(0x294)],_0x4e4ff7['x'],_0xc5603c,_0x4e4ff7[_0x4f5d6c(0x283)],_0x4f5d6c(0xf5)),this['resetTextColor'](),_0xc5603c+=_0x4f4bbe;const _0x8e010c=_0x4535e8[_0x4f5d6c(0x165)]();this[_0x4f5d6c(0x10d)](_0x4e4ff7['x'],_0xc5603c,_0x4e4ff7[_0x4f5d6c(0x283)],this[_0x4f5d6c(0x33a)]-_0xc5603c),this[_0x4f5d6c(0x14b)](_0x8e010c,_0x4e4ff7['x']+_0x27e3fd,_0xc5603c,_0x4e4ff7[_0x4f5d6c(0x283)]-_0x27e3fd*0x2);}}}else VisuMZ[_0x352d3c(0xea)][_0x352d3c(0x2ee)]['call'](this);},Scene_Status[_0x3e7307(0x16f)]['onActorChangeElementStatusCore']=function(){const _0x501bb9=_0x3e7307;Scene_MenuBase[_0x501bb9(0x16f)]['onActorChange'][_0x501bb9(0x15b)](this),this['refreshActor'](),this['_categoryWindow'][_0x501bb9(0x136)]();},Window_Base['prototype'][_0x3e7307(0x10d)]=function(_0x3ad175,_0x1fb5d9,_0x2d1aec,_0x4bfb49,_0x47b93c){const _0x563715=_0x3e7307;_0x47b93c=Math[_0x563715(0x201)](_0x47b93c||0x1,0x1);while(_0x47b93c--){_0x4bfb49=_0x4bfb49||this['lineHeight'](),this[_0x563715(0x100)][_0x563715(0x319)]=0xa0;const _0x36649c=ColorManager[_0x563715(0x323)]();this['contentsBack'][_0x563715(0x2b4)](_0x3ad175+0x1,_0x1fb5d9+0x1,_0x2d1aec-0x2,_0x4bfb49-0x2,_0x36649c),this['contentsBack'][_0x563715(0x319)]=0xff;}};function _0xf999(_0x2f2425,_0x579fd9){_0x2f2425=_0x2f2425-0x93;let _0x570858=_0x5708[_0x2f2425];return _0x570858;}function Window_StatusCategory(){const _0x42d6c0=_0x3e7307;this[_0x42d6c0(0x174)](...arguments);}Window_StatusCategory[_0x3e7307(0x16a)]=VisuMZ[_0x3e7307(0xea)][_0x3e7307(0x1b6)][_0x3e7307(0x233)],Window_StatusCategory['prototype']=Object[_0x3e7307(0x23d)](Window_HorzCommand[_0x3e7307(0x16f)]),Window_StatusCategory[_0x3e7307(0x16f)][_0x3e7307(0x1ae)]=Window_StatusCategory,Window_StatusCategory['prototype'][_0x3e7307(0x174)]=function(_0x41ee02){const _0x53c49f=_0x3e7307;Window_HorzCommand[_0x53c49f(0x16f)][_0x53c49f(0x174)][_0x53c49f(0x15b)](this,_0x41ee02),this[_0x53c49f(0x115)](_0x41ee02);},Window_StatusCategory[_0x3e7307(0x16f)][_0x3e7307(0x115)]=function(_0x26c2d8){const _0x3122f1=_0x3e7307,_0x50e340=new Rectangle(0x0,0x0,_0x26c2d8[_0x3122f1(0x283)],_0x26c2d8[_0x3122f1(0x297)]);this[_0x3122f1(0x146)]=new Window_Base(_0x50e340),this[_0x3122f1(0x146)][_0x3122f1(0x2a2)]=0x0,this[_0x3122f1(0x24b)](this[_0x3122f1(0x146)]),this[_0x3122f1(0x15d)]();},Window_StatusCategory[_0x3e7307(0x16f)][_0x3e7307(0x264)]=function(){const _0x19eb1c=_0x3e7307;Window_HorzCommand[_0x19eb1c(0x16f)][_0x19eb1c(0x264)][_0x19eb1c(0x15b)](this);if(this[_0x19eb1c(0x146)])this[_0x19eb1c(0x15d)]();},Window_StatusCategory[_0x3e7307(0x16f)]['updateCommandNameWindow']=function(){const _0x5891b4=_0x3e7307,_0x4bec24=this['_commandNameWindow'];_0x4bec24['contents'][_0x5891b4(0x226)]();const _0x3b257e=this[_0x5891b4(0x21a)](this['index']());if(_0x3b257e===_0x5891b4(0x2d6)){if(_0x5891b4(0x1cc)!==_0x5891b4(0x19f)){const _0x49d1b5=this['itemLineRect'](this[_0x5891b4(0x2a1)]());let _0x275f8a=this['commandName'](this[_0x5891b4(0x2a1)]());_0x275f8a=_0x275f8a[_0x5891b4(0xa9)](/\\I\[(\d+)\]/gi,''),_0x4bec24[_0x5891b4(0x152)](),this[_0x5891b4(0x1f9)](_0x275f8a,_0x49d1b5),this['commandNameWindowDrawText'](_0x275f8a,_0x49d1b5),this[_0x5891b4(0x25a)](_0x275f8a,_0x49d1b5);}else{function _0x105c65(){const _0x2aa927=_0x5891b4;this[_0x2aa927(0xdf)](_0x16bd51);}}}},Window_StatusCategory['prototype'][_0x3e7307(0x1f9)]=function(_0x2eb704,_0x4cbbf2){},Window_StatusCategory[_0x3e7307(0x16f)][_0x3e7307(0x260)]=function(_0x147fd1,_0x13fe0c){const _0x430f5c=_0x3e7307,_0x479233=this[_0x430f5c(0x146)];_0x479233['drawText'](_0x147fd1,0x0,_0x13fe0c['y'],_0x479233['innerWidth'],_0x430f5c(0xf5));},Window_StatusCategory[_0x3e7307(0x16f)][_0x3e7307(0x25a)]=function(_0x5b6039,_0x1d715c){const _0x5a516e=_0x3e7307,_0x1ef457=this[_0x5a516e(0x146)],_0x15be58=$gameSystem[_0x5a516e(0x12a)](),_0x410349=_0x1d715c['x']+Math[_0x5a516e(0x303)](_0x1d715c[_0x5a516e(0x283)]/0x2)+_0x15be58;_0x1ef457['x']=_0x1ef457['width']/-0x2+_0x410349,_0x1ef457['y']=Math[_0x5a516e(0x303)](_0x1d715c[_0x5a516e(0x297)]/0x2);},Window_StatusCategory[_0x3e7307(0x16f)][_0x3e7307(0x2a5)]=function(){const _0x1e5b15=_0x3e7307;return VisuMZ['ElementStatusCore'][_0x1e5b15(0x1b6)]['StatusMenuList'][_0x1e5b15(0x126)];},Window_StatusCategory[_0x3e7307(0x16f)]['update']=function(){const _0x5b5075=_0x3e7307;Window_HorzCommand[_0x5b5075(0x16f)][_0x5b5075(0x1ab)]['call'](this),this[_0x5b5075(0x28b)]&&this['_itemWindow'][_0x5b5075(0xa5)](this[_0x5b5075(0x1ef)]());},Window_StatusCategory[_0x3e7307(0x16f)][_0x3e7307(0x278)]=function(_0x107106){this['_itemWindow']=_0x107106;},Window_StatusCategory[_0x3e7307(0x16f)][_0x3e7307(0x1a1)]=function(){const _0xe42a14=_0x3e7307;for(const _0x55fe94 of Window_StatusCategory[_0xe42a14(0x16a)]){const _0x378b5f=_0x55fe94[_0xe42a14(0x150)],_0x5199c9=_0x55fe94[_0xe42a14(0x2b1)];let _0x315bb8=_0x55fe94[_0xe42a14(0x22d)];if(['',_0xe42a14(0xac)][_0xe42a14(0xed)](_0x315bb8))continue;_0x5199c9>0x0&&this[_0xe42a14(0x32d)]()!==_0xe42a14(0xc5)&&(_0x315bb8='\x5cI[%1]%2'['format'](_0x5199c9,_0x315bb8));const _0x5c0823=_0x55fe94[_0xe42a14(0x2be)];this[_0xe42a14(0x30d)](_0x315bb8,_0x378b5f,!![],_0x5c0823);}},Window_StatusCategory[_0x3e7307(0x16f)][_0x3e7307(0xc1)]=function(){const _0x4dff7b=_0x3e7307;return VisuMZ['ElementStatusCore'][_0x4dff7b(0x1b6)][_0x4dff7b(0x2e3)][_0x4dff7b(0xfe)];},Window_StatusCategory[_0x3e7307(0x16f)][_0x3e7307(0x2fb)]=function(_0x5b29d5){const _0x15b098=_0x3e7307,_0x48bf3f=this[_0x15b098(0x21a)](_0x5b29d5);if(_0x48bf3f===_0x15b098(0x227))this[_0x15b098(0xcf)](_0x5b29d5);else{if(_0x48bf3f==='icon'){if('tJwwl'==='tJwwl')this[_0x15b098(0xdf)](_0x5b29d5);else{function _0x3e9788(){const _0x4cdfea=_0x15b098;_0xbc7c=['Resist',_0x4cdfea(0x25d),_0x4cdfea(0x225),_0x4cdfea(0x225)];}}}else{if(_0x15b098(0x281)!==_0x15b098(0x281)){function _0x309572(){_0x487d13(_0x3016b0['$1']);}}else Window_HorzCommand['prototype'][_0x15b098(0x2fb)]['call'](this,_0x5b29d5);}}},Window_StatusCategory[_0x3e7307(0x16f)][_0x3e7307(0x32d)]=function(){const _0x322177=_0x3e7307;return VisuMZ[_0x322177(0xea)][_0x322177(0x1b6)][_0x322177(0x2e3)][_0x322177(0xf4)];},Window_StatusCategory[_0x3e7307(0x16f)][_0x3e7307(0x21a)]=function(_0x2712e7){const _0x575bbb=_0x3e7307;if(_0x2712e7<0x0)return _0x575bbb(0xc5);const _0x1ea25f=this[_0x575bbb(0x32d)]();if(_0x1ea25f!=='auto'){if(_0x575bbb(0x131)!==_0x575bbb(0x1f5))return _0x1ea25f;else{function _0xe2329(){const _0x10837d=_0x575bbb;_0x47e6d6[_0x10837d(0xea)]['Game_Action_clear'][_0x10837d(0x15b)](this),this['clearElementChanges']();}}}else{if(this[_0x575bbb(0x1f1)]()>0x0){if('EOZRm'===_0x575bbb(0xda)){function _0x52e725(){const _0xd627cf=_0x575bbb;_0x551bbe[_0x29ccad]=this[_0xd627cf(0xee)](_0x868cca['$1']);}}else{const _0x43274e=this[_0x575bbb(0x23b)](_0x2712e7);if(_0x43274e[_0x575bbb(0x345)](/\\I\[(\d+)\]/i)){const _0x4782f2=this[_0x575bbb(0x19c)](_0x2712e7),_0x5266ce=this['textSizeEx'](_0x43274e)[_0x575bbb(0x283)];return _0x5266ce<=_0x4782f2[_0x575bbb(0x283)]?_0x575bbb(0x227):_0x575bbb(0x2d6);}}}}return _0x575bbb(0xc5);},Window_StatusCategory[_0x3e7307(0x16f)][_0x3e7307(0xcf)]=function(_0x415b8f){const _0x1e2142=_0x3e7307,_0x56464f=this[_0x1e2142(0x19c)](_0x415b8f),_0x35ee98=this[_0x1e2142(0x23b)](_0x415b8f),_0x27e71f=this[_0x1e2142(0x144)](_0x35ee98)[_0x1e2142(0x283)];this[_0x1e2142(0x17a)](this['isCommandEnabled'](_0x415b8f));const _0x433a79=this['itemTextAlign']();if(_0x433a79===_0x1e2142(0xbd)){if('LWzGv'!=='AyyrW')this[_0x1e2142(0x14b)](_0x35ee98,_0x56464f['x']+_0x56464f[_0x1e2142(0x283)]-_0x27e71f,_0x56464f['y'],_0x27e71f);else{function _0x5acc5f(){const _0x255961=_0x1e2142;return _0x1917c5['ElementStatusCore'][_0x255961(0x1b6)][_0x255961(0x2e3)][_0x255961(0x114)];}}}else{if(_0x433a79===_0x1e2142(0xf5)){const _0x3b94a9=_0x56464f['x']+Math[_0x1e2142(0x303)]((_0x56464f[_0x1e2142(0x283)]-_0x27e71f)/0x2);this['drawTextEx'](_0x35ee98,_0x3b94a9,_0x56464f['y'],_0x27e71f);}else{if(_0x1e2142(0x30f)!=='qBpEl')this[_0x1e2142(0x14b)](_0x35ee98,_0x56464f['x'],_0x56464f['y'],_0x27e71f);else{function _0x1b5867(){_0x51953c='%1'['format'](_0x24de9f);}}}}},Window_StatusCategory[_0x3e7307(0x16f)]['drawItemStyleIcon']=function(_0x43b602){const _0x1cf969=_0x3e7307;this['commandName'](_0x43b602)[_0x1cf969(0x345)](/\\I\[(\d+)\]/i);const _0x1ead1c=Number(RegExp['$1'])||0x0,_0x5401ea=this[_0x1cf969(0x19c)](_0x43b602),_0x17a513=_0x5401ea['x']+Math[_0x1cf969(0x303)]((_0x5401ea['width']-ImageManager[_0x1cf969(0x31b)])/0x2),_0x5cefe2=_0x5401ea['y']+(_0x5401ea['height']-ImageManager[_0x1cf969(0x1a3)])/0x2;this[_0x1cf969(0x99)](_0x1ead1c,_0x17a513,_0x5cefe2);};function Window_StatusData(){this['initialize'](...arguments);}Window_StatusData['prototype']=Object[_0x3e7307(0x23d)](Window_StatusBase[_0x3e7307(0x16f)]),Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x1ae)]=Window_MenuStatus,Window_StatusData[_0x3e7307(0x2ce)]=[_0x3e7307(0x2d2),'Nature','Blessing',_0x3e7307(0x2cb)][_0x3e7307(0xe2)](_0x36bb87=>{const _0x1510b1=_0x3e7307,_0x1f7536=DataManager[_0x1510b1(0x21b)](_0x36bb87);return _0x1f7536&&_0x1f7536[_0x1510b1(0x1bc)];}),Window_StatusData[_0x3e7307(0x244)]=[_0x3e7307(0xbc),'Alignment','Curse','Variant'][_0x3e7307(0xe2)](_0x2a927a=>{const _0x3552f5=_0x3e7307,_0x4562e2=DataManager[_0x3552f5(0x21b)](_0x2a927a);return _0x4562e2&&_0x4562e2[_0x3552f5(0x1bc)];}),Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x174)]=function(_0x9eeb31){const _0x48103c=_0x3e7307;this[_0x48103c(0x12e)]=$gameSystem['mainFontSize'](),Window_StatusBase[_0x48103c(0x16f)]['initialize'][_0x48103c(0x15b)](this,_0x9eeb31),this[_0x48103c(0x2c1)]=null,this[_0x48103c(0x320)]=null;},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x152)]=function(){const _0x37882e=_0x3e7307;Window_StatusBase[_0x37882e(0x16f)][_0x37882e(0x152)]['call'](this),this[_0x37882e(0x1a9)][_0x37882e(0x1be)]=this[_0x37882e(0x12e)];},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x25c)]=function(){const _0x8ad7f0=_0x3e7307;return this['contents']['fontSize']/$gameSystem[_0x8ad7f0(0x31d)]();},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x99)]=function(_0x249f11,_0x5b9c2e,_0x42735f){const _0x5821f1=_0x3e7307,_0x30e950=ImageManager[_0x5821f1(0x10e)](_0x5821f1(0x1f6)),_0x2fdf64=ImageManager[_0x5821f1(0x31b)],_0x5cb87e=ImageManager[_0x5821f1(0x1a3)],_0x2c7c5e=_0x249f11%0x10*_0x2fdf64,_0x173804=Math['floor'](_0x249f11/0x10)*_0x5cb87e,_0x441ab7=Math['ceil'](_0x2fdf64*this[_0x5821f1(0x25c)]()),_0x29a908=Math[_0x5821f1(0x2da)](_0x5cb87e*this['fontSizeRatio']());this[_0x5821f1(0x1a9)][_0x5821f1(0x1cf)](_0x30e950,_0x2c7c5e,_0x173804,_0x2fdf64,_0x5cb87e,_0x5b9c2e,_0x42735f,_0x441ab7,_0x29a908);},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x2f3)]=function(_0x4ed1f1,_0x18bea8){const _0x4936cd=_0x3e7307;_0x18bea8['drawing']&&this['drawIcon'](_0x4ed1f1,_0x18bea8['x'],_0x18bea8['y']+0x2);_0x18bea8['x']+=Math[_0x4936cd(0x2da)](ImageManager[_0x4936cd(0x31b)]*this[_0x4936cd(0x25c)]());if(this[_0x4936cd(0x25c)]()===0x1)_0x18bea8['x']+=0x4;},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x123)]=function(_0x4376fe){const _0x554410=_0x3e7307;if(this['_actor']!==_0x4376fe){if(_0x554410(0x170)!=='PhzvI')this[_0x554410(0x2c1)]=_0x4376fe,this[_0x554410(0xfd)]();else{function _0x2e5a5c(){const _0x4d8be8=_0x554410;this[_0x4d8be8(0x14b)](_0x24234a,_0x579285['x'],_0x2c945d['y'],_0x559192);}}}},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0xa5)]=function(_0x516776){const _0x22f984=_0x3e7307;this[_0x22f984(0x320)]!==_0x516776&&(this['_drawData']=_0x516776,this['refresh']());},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0xbe)]=function(_0x27ee5b){const _0x5583c6=_0x3e7307;if(Imported[_0x5583c6(0x313)])Window_Base[_0x5583c6(0x16f)]['setWordWrap'][_0x5583c6(0x15b)](this,_0x27ee5b);return'';},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x110)]=function(){const _0x2539b9=_0x3e7307;if(Imported[_0x2539b9(0x313)])Window_StatusBase[_0x2539b9(0x16f)][_0x2539b9(0x110)][_0x2539b9(0x15b)](this);},Window_StatusData['prototype']['drawTextEx']=function(_0x3e5e11,_0x52db82,_0x424176,_0x3c0e10){const _0x2741d2=_0x3e7307,_0x18c658=Window_StatusBase['prototype'][_0x2741d2(0x14b)][_0x2741d2(0x15b)](this,_0x3e5e11,_0x52db82,_0x424176,_0x3c0e10);return this['resetWordWrap'](),_0x18c658;},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0xfd)]=function(){const _0x3fa0d8=_0x3e7307;Window_StatusBase[_0x3fa0d8(0x16f)][_0x3fa0d8(0xfd)][_0x3fa0d8(0x15b)](this),this[_0x3fa0d8(0xb9)](),this[_0x3fa0d8(0x152)](),this[_0x3fa0d8(0x110)]();if(this[_0x3fa0d8(0x2c1)]&&this['_drawData'])this[_0x3fa0d8(0x320)][_0x3fa0d8(0x15b)](this);},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x98)]=function(){const _0x144abd=_0x3e7307;return Imported[_0x144abd(0x2dd)]&&this[_0x144abd(0x2c1)][_0x144abd(0x224)]()!=='';},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x296)]=function(_0x4d64f5,_0x20474c,_0x41cf7f,_0xf1bda0,_0xd25ef2){const _0x36f87d=_0x3e7307,_0x5d783a=ImageManager[_0x36f87d(0x1b9)](_0x4d64f5[_0x36f87d(0x224)]());_0x5d783a[_0x36f87d(0x2f7)](this[_0x36f87d(0x332)][_0x36f87d(0x1f4)](this,_0x5d783a,_0x4d64f5,_0x20474c,_0x41cf7f,_0xf1bda0,_0xd25ef2));},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x332)]=function(_0x5f2cd9,_0xc91fe1,_0x21a4ac,_0x344428,_0x35a090,_0x522405){const _0x414602=_0x3e7307,_0x105109=_0x35a090-_0x5f2cd9[_0x414602(0x283)];_0x21a4ac+=_0x105109/0x2;if(_0x105109<0x0)_0x35a090-=_0x105109;_0x35a090=(_0x35a090||ImageManager['faceWidth'])-0x2,_0x522405=(_0x522405||ImageManager[_0x414602(0x237)])-0x2;const _0x371898=_0x5f2cd9['width'],_0x6973f5=_0x5f2cd9['height'],_0x3c3e81=_0x35a090,_0x8f3e8a=_0x522405-0x2,_0x49877b=_0x21a4ac+Math['floor'](_0x3c3e81/0x2),_0x3675b8=_0x344428+Math['ceil']((_0x522405+_0x6973f5)/0x2),_0x2fa8ed=Math[_0x414602(0x1ed)](_0x35a090,_0x371898),_0x424771=Math['min'](_0x522405,_0x6973f5),_0x2c5fbe=_0x21a4ac+0x1,_0x4f2bac=Math[_0x414602(0x201)](_0x344428+0x1,_0x344428+_0x8f3e8a-_0x6973f5+0x3),_0x464b3e=(_0x371898-_0x2fa8ed)/0x2,_0x184927=(_0x6973f5-_0x424771)/0x2;this[_0x414602(0x100)]['blt'](_0x5f2cd9,_0x464b3e,_0x184927,_0x2fa8ed,_0x424771,_0x2c5fbe,_0x4f2bac);},Window_StatusData['prototype'][_0x3e7307(0x307)]=function(){const _0x254d87=_0x3e7307;let _0x598232=0x5;if(this[_0x254d87(0x33a)]-this['lineHeight']()*0x5<this[_0x254d87(0x2c8)]()*0x6){if('RYqTF'===_0x254d87(0x2db))_0x598232=0x4;else{function _0x37ebf7(){this['createRandomTraitSet'](_0x5797ea);}}}return this[_0x254d87(0x33a)]-this['lineHeight']()*_0x598232;},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x218)]=function(_0x2a716b,_0x547d62){const _0x390f53=_0x3e7307,_0x120f42=this[_0x390f53(0x2c1)],_0x18ed49=new Rectangle(_0x2a716b,0x0,_0x547d62,this[_0x390f53(0x33a)]),_0x5e1dab=this[_0x390f53(0x307)]();if(this['isActorMenuImageAvailable']()){if('XFjGI'!=='eXcFa'){const _0x3628f2=_0x18ed49['width'],_0x52d634=_0x18ed49[_0x390f53(0x297)],_0x5076b1=_0x18ed49['x'],_0x377be1=_0x18ed49['y'];this[_0x390f53(0x296)](_0x120f42,_0x5076b1,_0x377be1,_0x3628f2,_0x52d634);}else{function _0x1a448f(){return 0x1;}}}else{if(_0x390f53(0x16d)!==_0x390f53(0x16d)){function _0x4ce128(){const _0x3b5acc=_0x390f53,_0x65951=_0x34cffa[_0x3b5acc(0x21b)](_0x2012bf);return _0x65951&&_0x65951[_0x3b5acc(0x1bc)];}}else{const _0x3781fb=ImageManager['faceWidth'],_0x403cda=ImageManager[_0x390f53(0x237)],_0x3363c1=_0x18ed49['x']+Math[_0x390f53(0x303)]((_0x18ed49[_0x390f53(0x283)]-_0x3781fb)/0x2),_0x363ece=_0x18ed49['y']+Math['floor']((this[_0x390f53(0x33a)]-_0x5e1dab-_0x403cda)/0x2);this['drawActorFaceBack'](_0x120f42,_0x3363c1,_0x363ece,_0x3781fb,_0x403cda);}}},Window_Base[_0x3e7307(0x16f)]['drawActorFaceBack']=function(_0x359b1f,_0x16cc3b,_0x4a35de,_0x2e59b2,_0x33282c){const _0x581540=_0x3e7307,_0x2d6e1d=_0x359b1f['faceName'](),_0x41196f=_0x359b1f['faceIndex']();_0x2e59b2=_0x2e59b2||ImageManager[_0x581540(0x1c3)],_0x33282c=_0x33282c||ImageManager[_0x581540(0x237)];const _0x436abc=ImageManager[_0x581540(0x188)](_0x2d6e1d),_0x1b75b6=ImageManager[_0x581540(0x1c3)],_0x525201=ImageManager[_0x581540(0x237)],_0x4bc1a6=Math[_0x581540(0x1ed)](_0x2e59b2,_0x1b75b6),_0x2fb878=Math['min'](_0x33282c,_0x525201),_0x39c065=Math[_0x581540(0x303)](_0x16cc3b+Math[_0x581540(0x201)](_0x2e59b2-_0x1b75b6,0x0)/0x2),_0xd84a60=Math['floor'](_0x4a35de+Math[_0x581540(0x201)](_0x33282c-_0x525201,0x0)/0x2),_0x3c2376=_0x41196f%0x4*_0x1b75b6+(_0x1b75b6-_0x4bc1a6)/0x2,_0x18b136=Math[_0x581540(0x303)](_0x41196f/0x4)*_0x525201+(_0x525201-_0x2fb878)/0x2;this[_0x581540(0x100)][_0x581540(0x1cf)](_0x436abc,_0x3c2376,_0x18b136,_0x4bc1a6,_0x2fb878,_0x39c065,_0xd84a60);},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x315)]=function(_0x5b3d00){const _0x3696ea=_0x3e7307,_0x4865c4=_0x3696ea(0x213)[_0x3696ea(0xd6)](_0x5b3d00);return VisuMZ[_0x3696ea(0xea)][_0x3696ea(0x1b6)]['StatusMenu'][_0x4865c4];},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x321)]=function(_0xf7221b,_0x770865,_0x5c94a4,_0x456c41){const _0x3b7ef9=_0x3e7307,_0x3c238a=this['itemPadding']();_0x456c41-=_0x3c238a*0x2;if(Imported[_0x3b7ef9(0x330)]){if('onIle'==='onIle')this[_0x3b7ef9(0x166)](_0x770865+_0x3c238a,_0x5c94a4,_0x456c41,_0xf7221b,![]);else{function _0x5aed41(){const _0x54ba79=_0x3b7ef9;var _0x12f26b=_0x2f5801(_0x4523f9['$1']);try{_0x1232d2+=_0x18478b(_0x12f26b);}catch(_0x54016e){if(_0x49fb8b[_0x54ba79(0x324)]())_0x1e587b['log'](_0x54016e);}}}}else{const _0x223041=this['getParamName'](_0xf7221b);this[_0x3b7ef9(0x338)](ColorManager[_0x3b7ef9(0x2de)]()),this[_0x3b7ef9(0x1c1)](_0x223041,_0x770865+_0x3c238a,_0x5c94a4,_0x456c41);}},Window_StatusData['prototype'][_0x3e7307(0x24a)]=function(_0x3b058f){const _0x3c010c=_0x3e7307;_0x3b058f=_0x3b058f['toUpperCase']()[_0x3c010c(0x17b)]();const _0x5eef50=[_0x3c010c(0x2ec),_0x3c010c(0x2c6),'ATK',_0x3c010c(0x16e),_0x3c010c(0x1c5),'MDF',_0x3c010c(0x254),'LUK'],_0x431b68=[_0x3c010c(0x336),_0x3c010c(0x94),_0x3c010c(0x1d8),_0x3c010c(0x2f5),_0x3c010c(0xa4),'MRF',_0x3c010c(0x160),_0x3c010c(0xdd),_0x3c010c(0x2bc),_0x3c010c(0x15e)],_0x3725b6=[_0x3c010c(0x2e2),_0x3c010c(0x24f),_0x3c010c(0x192),_0x3c010c(0xa1),_0x3c010c(0x2ac),_0x3c010c(0x22f),_0x3c010c(0x234),_0x3c010c(0x12b),_0x3c010c(0x1cd),_0x3c010c(0x27b)];if(_0x5eef50[_0x3c010c(0xed)](_0x3b058f))return TextManager[_0x3c010c(0x266)](_0x5eef50[_0x3c010c(0x1c8)](_0x3b058f));return _0x3b058f;},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x2b9)]=function(_0xcc6c3c,_0x54b584,_0x2e2e32,_0x3f5c1e){const _0xacc765=_0x3e7307;this[_0xacc765(0x152)]();const _0x3aaae5=this[_0xacc765(0x317)](),_0x1a84bb=this['getParamValue'](_0xcc6c3c);this['drawText'](_0x1a84bb,_0x54b584+_0x3aaae5,_0x2e2e32,_0x3f5c1e-_0x3aaae5*0x2,'right');},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x198)]=function(_0x3bf279){const _0x34b04c=_0x3e7307;_0x3bf279=_0x3bf279[_0x34b04c(0x274)]()[_0x34b04c(0x17b)]();const _0x2c9a61=this[_0x34b04c(0x2c1)];if(Imported[_0x34b04c(0x330)])return _0x2c9a61[_0x34b04c(0x277)](_0x3bf279,!![]);else{if('QqZJv'==='zrnQH'){function _0x449f5e(){this['_traitSets'][_0x289cc8]='';}}else{const _0x2410a1=[_0x34b04c(0x2ec),_0x34b04c(0x2c6),_0x34b04c(0x33f),_0x34b04c(0x16e),_0x34b04c(0x1c5),_0x34b04c(0x18e),_0x34b04c(0x254),_0x34b04c(0x1c0)],_0x10f8e3=[_0x34b04c(0x336),_0x34b04c(0x94),_0x34b04c(0x1d8),_0x34b04c(0x2f5),_0x34b04c(0xa4),'MRF','CNT',_0x34b04c(0xdd),_0x34b04c(0x2bc),_0x34b04c(0x15e)],_0x4a99d4=[_0x34b04c(0x2e2),_0x34b04c(0x24f),_0x34b04c(0x192),_0x34b04c(0xa1),_0x34b04c(0x2ac),'TCR',_0x34b04c(0x234),_0x34b04c(0x12b),'FDR',_0x34b04c(0x27b)];if(_0x2410a1[_0x34b04c(0xed)](_0x3bf279))return _0x2c9a61[_0x34b04c(0x266)](_0x2410a1['indexOf'](_0x3bf279));else{if(_0x10f8e3[_0x34b04c(0xed)](_0x3bf279)){if(_0x34b04c(0xe5)===_0x34b04c(0xe5)){const _0x39e3de=_0x2c9a61['xparam'](_0x10f8e3[_0x34b04c(0x1c8)](_0x3bf279));return _0x34b04c(0x1e2)[_0x34b04c(0xd6)](Math[_0x34b04c(0xc2)](_0x39e3de*0x64));}else{function _0x4a39cb(){const _0x5b77e2=_0x34b04c,_0x22b798=this['traitsSet'](_0x52dc2f[_0x5b77e2(0x2d7)])[_0x5b77e2(0x271)]((_0x5ded09,_0x43a509)=>_0x5ded09-_0x43a509);return _0x22b798['filter']((_0x322d31,_0x554b62,_0x140480)=>_0x140480['indexOf'](_0x322d31)===_0x554b62);}}}else{if(_0x4a99d4[_0x34b04c(0xed)](_0x3bf279)){const _0xc16f3c=_0x2c9a61[_0x34b04c(0x1e6)](_0x4a99d4[_0x34b04c(0x1c8)](_0x3bf279));return _0x34b04c(0x1e2)[_0x34b04c(0xd6)](Math['round'](_0xc16f3c*0x64));}}}}}},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0xce)]=function(){const _0x305055=_0x3e7307;VisuMZ[_0x305055(0xea)][_0x305055(0x1b6)][_0x305055(0x233)][0x0][_0x305055(0x2be)][_0x305055(0x15b)](this);},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x2a7)]=function(){const _0x206522=_0x3e7307;this[_0x206522(0x12e)]=VisuMZ[_0x206522(0xea)][_0x206522(0x1b6)]['StatusMenu'][_0x206522(0x16b)];},Window_StatusData[_0x3e7307(0x16f)]['resetDescriptionFontSize']=function(){const _0x4a4828=_0x3e7307;this['_resetFontSize']=$gameSystem[_0x4a4828(0x31d)]();},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x10d)]=function(_0x500524,_0x38e803,_0x239398,_0x2b0018,_0x55f8a8){const _0x29c97c=_0x3e7307;if(VisuMZ[_0x29c97c(0xea)]['Settings'][_0x29c97c(0x2e3)]['DrawBackRect']===![])return;_0x55f8a8=Math[_0x29c97c(0x201)](_0x55f8a8||0x1,0x1);while(_0x55f8a8--){if('joIXJ'===_0x29c97c(0x24e)){function _0x1db348(){const _0x12656d=_0x29c97c;_0x258a3e['prototype'][_0x12656d(0xfd)][_0x12656d(0x15b)](this),this[_0x12656d(0xb9)](),this['resetFontSettings'](),this[_0x12656d(0x110)]();if(this[_0x12656d(0x2c1)]&&this[_0x12656d(0x320)])this['_drawData'][_0x12656d(0x15b)](this);}}else{_0x2b0018=_0x2b0018||this[_0x29c97c(0x2c8)](),this[_0x29c97c(0x1a9)][_0x29c97c(0x319)]=0xa0;const _0x46e66f=ColorManager[_0x29c97c(0x17c)]();this[_0x29c97c(0x1a9)][_0x29c97c(0x2b4)](_0x500524+0x1,_0x38e803+0x1,_0x239398-0x2,_0x2b0018-0x2,_0x46e66f),this[_0x29c97c(0x1a9)]['paintOpacity']=0xff;}}},ColorManager[_0x3e7307(0x17c)]=function(){const _0x5a7da9=_0x3e7307,_0x45ca25=VisuMZ[_0x5a7da9(0xea)][_0x5a7da9(0x1b6)]['StatusMenu'];let _0xac4de7=_0x45ca25[_0x5a7da9(0x122)]!==undefined?_0x45ca25[_0x5a7da9(0x122)]:0x13;return ColorManager['getColor'](_0xac4de7);},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x2b7)]=function(){const _0x5f1264=_0x3e7307,_0xc95b25='-------',_0x2a570f=this[_0x5f1264(0x2c8)](),_0x1defdc=this[_0x5f1264(0x16c)](),_0x17c81d=this[_0x5f1264(0x307)](),_0xfad50a=this['_actor'],_0x32f89e=this['itemPadding'](),_0x38ef9c=this['innerWidth']/0x2;let _0x25fedc=new Rectangle(0x0,0x0,_0x38ef9c,this[_0x5f1264(0x33a)]),_0x146efe=0x0,_0x2e93cd=0x0;this[_0x5f1264(0x218)](0x0,this[_0x5f1264(0x28e)]/0x2);let _0x37ae07=_0x25fedc['x'],_0x1278ed=Math['max'](_0x25fedc['y'],_0x25fedc['y']+(_0x25fedc[_0x5f1264(0x297)]-_0x17c81d)),_0x2477d3=_0x25fedc[_0x5f1264(0x283)],_0x1b7f19=_0x25fedc['y']+_0x25fedc[_0x5f1264(0x297)]-_0x1278ed;this[_0x5f1264(0x10d)](0x0,_0x1278ed,_0x2477d3,_0x2a570f,0x2),this[_0x5f1264(0x1c1)](_0xfad50a[_0x5f1264(0xb2)](),_0x37ae07,_0x1278ed,_0x2477d3,'center'),_0x37ae07=_0x25fedc['x']+Math[_0x5f1264(0xc2)]((_0x25fedc['width']-0x80)/0x2),_0x1278ed+=_0x2a570f,this['drawItemDarkRect'](0x0,_0x1278ed,_0x2477d3,_0x2a570f),this['drawActorLevel'](_0xfad50a,_0x37ae07,_0x1278ed);const _0x2a8372=_0xfad50a[_0x5f1264(0x135)]()[_0x5f1264(0xb2)];_0x37ae07=_0x25fedc['x']+Math[_0x5f1264(0xc2)]((_0x25fedc[_0x5f1264(0x283)]-this['textSizeEx'](_0x2a8372)[_0x5f1264(0x283)])/0x2),_0x1278ed+=_0x2a570f,this['drawItemDarkRect'](0x0,_0x1278ed,_0x2477d3,_0x2a570f),this[_0x5f1264(0x14b)](_0x2a8372,_0x37ae07,_0x1278ed,_0x2477d3),_0x37ae07=_0x25fedc['x']+Math[_0x5f1264(0xc2)]((_0x25fedc[_0x5f1264(0x283)]-0x90)/0x2),_0x1278ed+=_0x2a570f,this[_0x5f1264(0x10d)](0x0,_0x1278ed,_0x2477d3,_0x2a570f),this[_0x5f1264(0x202)](_0xfad50a,_0x37ae07,_0x1278ed),_0x37ae07=_0x25fedc['x']+Math[_0x5f1264(0xc2)]((_0x25fedc['width']-0x80)/0x2),_0x1278ed+=_0x2a570f,this[_0x5f1264(0x10d)](0x0,_0x1278ed,_0x2477d3,this[_0x5f1264(0x33a)]-_0x1278ed),this['placeGauge'](_0xfad50a,'hp',_0x37ae07,_0x1278ed),_0x1278ed+=_0x1defdc,this[_0x5f1264(0x299)](_0xfad50a,'mp',_0x37ae07,_0x1278ed),_0x1278ed+=_0x1defdc;if($dataSystem[_0x5f1264(0xbb)]){if(_0x5f1264(0x10c)===_0x5f1264(0x333)){function _0x83e86e(){const _0x79f3f4=_0x5f1264;_0x52d636=_0xcf9505||this[_0x79f3f4(0x2c8)](),this[_0x79f3f4(0x100)]['paintOpacity']=0xa0;const _0x34bdaa=_0xa3585a['gaugeBackColor']();this['contentsBack'][_0x79f3f4(0x2b4)](_0x803ceb+0x1,_0x489bc9+0x1,_0x1cb485-0x2,_0x43b8aa-0x2,_0x34bdaa),this[_0x79f3f4(0x100)][_0x79f3f4(0x319)]=0xff;}}else this[_0x5f1264(0x299)](_0xfad50a,'tp',_0x37ae07,_0x1278ed);}_0x25fedc=new Rectangle(_0x38ef9c,0x0,_0x38ef9c,this[_0x5f1264(0x33a)]),this[_0x5f1264(0x338)](ColorManager[_0x5f1264(0x2de)]()),this[_0x5f1264(0x10d)](_0x25fedc['x'],_0x25fedc['y'],_0x25fedc['width'],_0x2a570f,0x2),this[_0x5f1264(0x1c1)](TextManager[_0x5f1264(0x24c)],_0x25fedc['x'],_0x25fedc['y'],_0x25fedc[_0x5f1264(0x283)],_0x5f1264(0xf5));const _0x53dfde=_0x2a570f*0x5;this[_0x5f1264(0x10d)](_0x25fedc['x'],_0x25fedc['y']+_0x2a570f*0x1,_0x25fedc[_0x5f1264(0x283)],_0x2a570f*0x2),this[_0x5f1264(0x10d)](_0x25fedc['x'],_0x25fedc['y']+_0x2a570f*0x3,_0x25fedc[_0x5f1264(0x283)],_0x2a570f*0x2);const _0x47e400=TextManager[_0x5f1264(0x337)][_0x5f1264(0xd6)](TextManager[_0x5f1264(0x24c)]),_0x1c7f8e=TextManager[_0x5f1264(0x108)][_0x5f1264(0xd6)](TextManager[_0x5f1264(0xf9)]);this[_0x5f1264(0x338)](ColorManager[_0x5f1264(0x2de)]()),this[_0x5f1264(0x1c1)](_0x47e400,_0x25fedc['x']+_0x32f89e,_0x25fedc['y']+_0x2a570f*0x1,_0x25fedc[_0x5f1264(0x283)]-_0x32f89e*0x2),this['drawText'](_0x1c7f8e,_0x25fedc['x']+_0x32f89e,_0x25fedc['y']+_0x2a570f*0x3,_0x25fedc['width']-_0x32f89e*0x2),this[_0x5f1264(0x22b)]();const _0x210783=_0xfad50a['currentExp'](),_0x5ee523=_0xfad50a[_0x5f1264(0xfc)]()?_0xc95b25:_0xfad50a['nextRequiredExp']();this[_0x5f1264(0x1c1)](_0x210783,_0x25fedc['x']+_0x32f89e,_0x25fedc['y']+_0x2a570f*0x1,_0x25fedc[_0x5f1264(0x283)]-_0x32f89e*0x2,_0x5f1264(0xbd)),this[_0x5f1264(0x1c1)](_0x5ee523,_0x25fedc['x']+_0x32f89e,_0x25fedc['y']+_0x2a570f*0x3,_0x25fedc['width']-_0x32f89e*0x2,'right'),_0x2e93cd=_0x25fedc['y']+_0x53dfde,this[_0x5f1264(0x338)](ColorManager['systemColor']()),this[_0x5f1264(0x10d)](_0x25fedc['x'],_0x2e93cd,_0x25fedc[_0x5f1264(0x283)],_0x2a570f,0x2),this[_0x5f1264(0x1c1)](TextManager['statusMenuBiography'],_0x25fedc['x'],_0x2e93cd,_0x25fedc['width'],'center'),this[_0x5f1264(0x22b)](),_0x2e93cd+=_0x2a570f;const _0x8daf51=_0xfad50a['getBiography']();this[_0x5f1264(0x10d)](_0x25fedc['x'],_0x2e93cd,_0x25fedc[_0x5f1264(0x283)],this[_0x5f1264(0x33a)]-_0x2e93cd),this[_0x5f1264(0x14b)](_0x8daf51,_0x25fedc['x']+_0x32f89e,_0x2e93cd,_0x25fedc[_0x5f1264(0x283)]-_0x32f89e*0x2);},Window_StatusData[_0x3e7307(0x16f)]['drawParameters']=function(){const _0x3e1048=_0x3e7307,_0xbb25ed=this[_0x3e1048(0x2c8)](),_0x58d6b5=this[_0x3e1048(0x16c)](),_0xd65898=this[_0x3e1048(0x307)](),_0x45a8a9=this['itemPadding']()*0x2,_0x1f22b0=Math['floor'](this[_0x3e1048(0x28e)]/0x3);let _0x51ea45=0x0,_0x43a9ad=0x0,_0x3af8b6=0x0;this[_0x3e1048(0x218)](0x0,this[_0x3e1048(0x28e)]/0x2);let _0xd037d7=new Rectangle(0x0,0x0,_0x1f22b0,this[_0x3e1048(0x33a)]);const _0xabb547=this[_0x3e1048(0x315)](0x1),_0x38d956=this[_0x3e1048(0x315)](0x2),_0x114180=this[_0x3e1048(0x315)](0x3),_0x4bc7cb=Math['max'](_0xabb547[_0x3e1048(0x126)],_0x38d956['length'],_0x114180[_0x3e1048(0x126)]),_0x51772e=_0xd037d7[_0x3e1048(0x283)]-_0x45a8a9*0x2-this[_0x3e1048(0x20f)](_0x3e1048(0x2f0)),_0x3e6276=Math[_0x3e1048(0x201)]((this[_0x3e1048(0x33a)]-_0x4bc7cb*_0xbb25ed)/0x2,0x0);_0x51ea45=_0xd037d7['x']+_0x45a8a9,_0x43a9ad=_0x3e6276,_0x3af8b6=_0xd037d7[_0x3e1048(0x283)]-_0x45a8a9*0x2;if(_0x43a9ad!==0x0)this[_0x3e1048(0x10d)](_0xd037d7['x'],0x0,_0xd037d7[_0x3e1048(0x283)],_0x43a9ad);for(const _0x36163b of _0xabb547){if('kQPEK'===_0x3e1048(0xcb))this[_0x3e1048(0x10d)](_0xd037d7['x'],_0x43a9ad,_0xd037d7['width'],_0xbb25ed),this['drawParamName'](_0x36163b,_0x51ea45,_0x43a9ad,_0x51772e),this[_0x3e1048(0x2b9)](_0x36163b,_0x51ea45,_0x43a9ad,_0x3af8b6),_0x43a9ad+=_0xbb25ed;else{function _0x541830(){const _0x4fc44a=_0x3e1048;var _0x38cbf3=_0x204725(_0x5c81f1['$1']);try{_0x4c1064+=_0x3e15f9(_0x38cbf3);}catch(_0x2dbcb7){if(_0x225eb1[_0x4fc44a(0x324)]())_0x29347b[_0x4fc44a(0x1d4)](_0x2dbcb7);}}}}this[_0x3e1048(0x10d)](_0xd037d7['x'],_0x43a9ad,_0xd037d7[_0x3e1048(0x283)],this[_0x3e1048(0x33a)]-_0x43a9ad),_0xd037d7['x']+=_0xd037d7[_0x3e1048(0x283)],_0x51ea45=_0xd037d7['x']+_0x45a8a9,_0x43a9ad=_0x3e6276,_0x3af8b6=_0xd037d7['width']-_0x45a8a9*0x2;if(_0x43a9ad!==0x0)this['drawItemDarkRect'](_0xd037d7['x'],0x0,_0xd037d7[_0x3e1048(0x283)],_0x43a9ad);for(const _0x3d5ceb of _0x38d956){this[_0x3e1048(0x10d)](_0xd037d7['x'],_0x43a9ad,_0xd037d7[_0x3e1048(0x283)],_0xbb25ed),this[_0x3e1048(0x321)](_0x3d5ceb,_0x51ea45,_0x43a9ad,_0x51772e),this[_0x3e1048(0x2b9)](_0x3d5ceb,_0x51ea45,_0x43a9ad,_0x3af8b6),_0x43a9ad+=_0xbb25ed;}this[_0x3e1048(0x10d)](_0xd037d7['x'],_0x43a9ad,_0xd037d7['width'],this[_0x3e1048(0x33a)]-_0x43a9ad),_0xd037d7['x']+=_0xd037d7[_0x3e1048(0x283)],_0xd037d7[_0x3e1048(0x283)]=this[_0x3e1048(0x28e)]-_0xd037d7['x'],_0x51ea45=_0xd037d7['x']+_0x45a8a9,_0x43a9ad=_0x3e6276,_0x3af8b6=_0xd037d7[_0x3e1048(0x283)]-_0x45a8a9*0x2;if(_0x43a9ad!==0x0)this['drawItemDarkRect'](_0xd037d7['x'],0x0,_0xd037d7[_0x3e1048(0x283)],_0x43a9ad);for(const _0x3dfbce of _0x114180){this['drawItemDarkRect'](_0xd037d7['x'],_0x43a9ad,_0xd037d7[_0x3e1048(0x283)],_0xbb25ed),this['drawParamName'](_0x3dfbce,_0x51ea45,_0x43a9ad,_0x51772e),this['drawParamValue'](_0x3dfbce,_0x51ea45,_0x43a9ad,_0x3af8b6),_0x43a9ad+=_0xbb25ed;}this[_0x3e1048(0x10d)](_0xd037d7['x'],_0x43a9ad,_0xd037d7[_0x3e1048(0x283)],this[_0x3e1048(0x33a)]-_0x43a9ad);},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x253)]=function(){const _0x2dfa59=_0x3e7307,_0x35e178=Window_StatusData[_0x2dfa59(0x2ce)],_0x1183eb=Window_StatusData['traitCol2'],_0x23bb45=this[_0x2dfa59(0x2c8)](),_0x27fd0d=this[_0x2dfa59(0x2c1)],_0x5d307a=this['itemPadding'](),_0x40d685=this[_0x2dfa59(0x33a)]/Math[_0x2dfa59(0x201)](_0x35e178[_0x2dfa59(0x126)],_0x1183eb[_0x2dfa59(0x126)])-_0x23bb45,_0x5d109c=this[_0x2dfa59(0x28e)]/0x2;let _0xb97969=0x0,_0x5c8ecc=0x0;this[_0x2dfa59(0x218)](0x0,_0x5d109c);for(const _0x582eb6 of _0x35e178){const _0x1a90af=DataManager[_0x2dfa59(0x21b)](_0x582eb6),_0x1ce485=_0x27fd0d['traitSet'](_0x582eb6);this[_0x2dfa59(0x10d)](0x0,_0x5c8ecc,_0x5d109c,_0x23bb45,0x2);const _0x4fbb97=_0x2dfa59(0x2bf)[_0x2dfa59(0xd6)](_0x1a90af[_0x2dfa59(0x1d7)],_0x1ce485[_0x2dfa59(0x1aa)]);this[_0x2dfa59(0x14b)](_0x4fbb97,_0x5d307a,_0x5c8ecc,_0x5d109c-_0x5d307a*0x2),_0x5c8ecc+=_0x23bb45,this['setDescriptionFontSizeToTraitSet'](),this['drawItemDarkRect'](0x0,_0x5c8ecc,_0x5d109c,_0x40d685),this[_0x2dfa59(0x14b)](_0x1ce485['Description'],_0x5d307a,_0x5c8ecc,_0x5d109c-_0x5d307a*0x2),_0x5c8ecc+=_0x40d685,this[_0x2dfa59(0xb9)]();}this[_0x2dfa59(0x33a)]-_0x5c8ecc>0x0&&this[_0x2dfa59(0x10d)](0x0,_0x5c8ecc,_0x5d109c,this[_0x2dfa59(0x33a)]-_0x5c8ecc);_0x5c8ecc=0x0;for(const _0x459392 of _0x1183eb){const _0x4d6a83=DataManager[_0x2dfa59(0x21b)](_0x459392),_0x56549a=_0x27fd0d[_0x2dfa59(0x298)](_0x459392);this[_0x2dfa59(0x10d)](_0x5d109c,_0x5c8ecc,_0x5d109c,_0x23bb45,0x2);const _0x18eac1=_0x2dfa59(0x2bf)['format'](_0x4d6a83[_0x2dfa59(0x1d7)],_0x56549a[_0x2dfa59(0x1aa)]);this[_0x2dfa59(0x14b)](_0x18eac1,_0x5d109c+_0x5d307a,_0x5c8ecc,_0x5d109c-_0x5d307a*0x2),_0x5c8ecc+=_0x23bb45,this[_0x2dfa59(0x2a7)](),this['drawItemDarkRect'](_0x5d109c,_0x5c8ecc,_0x5d109c,_0x40d685),this[_0x2dfa59(0x14b)](_0x56549a[_0x2dfa59(0x17e)],_0x5d109c+_0x5d307a,_0x5c8ecc,_0x5d109c-_0x5d307a*0x2),_0x5c8ecc+=_0x40d685,this[_0x2dfa59(0xb9)]();}if(this['innerHeight']-_0x5c8ecc>0x0){if(_0x2dfa59(0x314)!==_0x2dfa59(0x314)){function _0x429711(){_0x398f94['RandomizeActor']&&this['createRandomTraitSet'](_0x3a4a53);}}else this[_0x2dfa59(0x10d)](_0x5d109c,_0x5c8ecc,_0x5d109c,this[_0x2dfa59(0x33a)]-_0x5c8ecc);}},Window_StatusData[_0x3e7307(0x16f)]['getElementIDs']=function(){const _0x529fb9=_0x3e7307,_0x275acb=[0x0]['concat'](this[_0x529fb9(0x19e)]());return[...Array($dataSystem[_0x529fb9(0x2c5)][_0x529fb9(0x126)])[_0x529fb9(0x245)]()][_0x529fb9(0xe2)](_0x4ce8a6=>!_0x275acb[_0x529fb9(0xed)](_0x4ce8a6));},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x19e)]=function(){const _0x165bb8=_0x3e7307;return[0x0]['concat'](VisuMZ['ElementStatusCore']['Settings'][_0x165bb8(0x2e3)][_0x165bb8(0xaf)]);},Window_StatusData['prototype']['getElementIDsCol1']=function(){const _0x345076=_0x3e7307,_0x9d9ebc=[0x0][_0x345076(0x1c4)](this[_0x345076(0x19e)]());let _0x38bbd8=this[_0x345076(0x117)](0x1);return _0x38bbd8['length']<=0x0&&(_0x38bbd8=this[_0x345076(0x117)](0x2),_0x38bbd8[_0x345076(0x126)]<=0x0&&(_0x38bbd8=this[_0x345076(0x157)]())),_0x38bbd8['filter'](_0x822598=>!_0x9d9ebc[_0x345076(0xed)](_0x822598));},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x335)]=function(){const _0x1df6e5=_0x3e7307,_0x263093=[0x0][_0x1df6e5(0x1c4)](this['getExcludedElementIDs']());let _0x475eb2=this[_0x1df6e5(0x117)](0x2);return _0x475eb2[_0x1df6e5(0xe2)](_0x454a16=>!_0x263093[_0x1df6e5(0xed)](_0x454a16));},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x117)]=function(_0x440660){const _0x58ac51=_0x3e7307,_0x3b899d=[0x0]['concat'](this[_0x58ac51(0x19e)]());let _0x13ac9e=VisuMZ['ElementStatusCore']['Settings'][_0x58ac51(0x2e3)][_0x58ac51(0x316)[_0x58ac51(0xd6)](_0x440660)]??[];return _0x13ac9e[_0x58ac51(0xe2)](_0xbaee09=>!_0x3b899d[_0x58ac51(0xed)](_0xbaee09));},Window_StatusData['prototype'][_0x3e7307(0xeb)]=function(){const _0x439ac0=_0x3e7307,_0x4aa469=this[_0x439ac0(0x2c8)](),_0x40859b=this[_0x439ac0(0x2c1)],_0x4ced23=this[_0x439ac0(0x317)](),_0x381cf3=_0x439ac0(0x2bf),_0x2d381b=DataManager[_0x439ac0(0x21b)](_0x439ac0(0x2b5)),_0x5b14fa=_0x40859b['traitSet'](_0x439ac0(0x2b5)),_0x25b6c1=DataManager[_0x439ac0(0x21b)]('SubElement'),_0x3a77b5=_0x40859b['traitSet'](_0x439ac0(0x2a4)),_0x3bb23f=this[_0x439ac0(0x33a)]/Math[_0x439ac0(0x201)](Window_StatusData['traitCol1'][_0x439ac0(0x126)],Window_StatusData[_0x439ac0(0x244)][_0x439ac0(0x126)])-_0x4aa469;let _0x54c40e=0x0,_0x457828=0x0,_0x3a4d3f=this[_0x439ac0(0x28e)]/0x2;this[_0x439ac0(0x218)](0x0,_0x3a4d3f);if(_0x2d381b[_0x439ac0(0x1bc)]||_0x25b6c1[_0x439ac0(0x1bc)]){if(_0x439ac0(0x21c)!=='Izvdc'){function _0x51ac51(){const _0x37f8f6=_0x439ac0,_0x6122ce=_0x49a0e9[_0x37f8f6(0x301)]['toUpperCase']()[_0x37f8f6(0x17b)]();_0x471540[_0x37f8f6(0x207)][_0x41dbd9][_0x6122ce]=_0x3450f3;}}else{this[_0x439ac0(0x10d)](_0x54c40e,_0x457828,_0x3a4d3f,_0x4aa469,0x2),this[_0x439ac0(0x10d)](_0x3a4d3f,_0x457828,_0x3a4d3f,_0x4aa469,0x2);if(_0x2d381b[_0x439ac0(0x1bc)]){if(_0x439ac0(0x1ec)===_0x439ac0(0x33b)){function _0x39a301(){const _0x4054ae=_0x439ac0;return _0x4dd349['ElementStatusCore']['Settings'][_0x4054ae(0x105)][_0x4054ae(0x32e)];}}else this['drawTextEx'](_0x381cf3[_0x439ac0(0xd6)](_0x2d381b['Label'],_0x5b14fa[_0x439ac0(0x1aa)]),_0x4ced23,_0x457828,_0x3a4d3f-_0x4ced23*0x2);}if(_0x25b6c1['Visible']){if(_0x439ac0(0x2eb)===_0x439ac0(0x1bd)){function _0x3b60c0(){const _0x40009f=_0x439ac0;this[_0x40009f(0x156)]=this[_0x40009f(0x1db)](),this['actor']()['note']['match'](/<BIOGRAPHY>\s*([\s\S]*)\s*<\/BIOGRAPHY>/i)&&this['setBiography'](_0x1ac641['$1']);}}else this[_0x439ac0(0x14b)](_0x381cf3['format'](_0x25b6c1[_0x439ac0(0x1d7)],_0x3a77b5[_0x439ac0(0x1aa)]),_0x3a4d3f+_0x4ced23,_0x457828,_0x3a4d3f-_0x4ced23*0x2);}_0x457828+=_0x4aa469,this['setDescriptionFontSizeToTraitSet'](),this['drawItemDarkRect'](_0x54c40e,_0x457828,_0x3a4d3f,_0x3bb23f),this[_0x439ac0(0x10d)](_0x3a4d3f,_0x457828,_0x3a4d3f,_0x3bb23f),_0x2d381b[_0x439ac0(0x1bc)]&&this[_0x439ac0(0x14b)](_0x5b14fa['Description'],_0x4ced23,_0x457828,_0x3a4d3f-_0x4ced23*0x2),_0x25b6c1['Visible']&&this['drawTextEx'](_0x3a77b5['Description'],_0x3a4d3f+_0x4ced23,_0x457828,_0x3a4d3f-_0x4ced23*0x2),this[_0x439ac0(0xb9)](),this[_0x439ac0(0x152)](),_0x457828+=_0x3bb23f;}}const _0x542772=_0x457828,_0x3e19ee=this[_0x439ac0(0x147)](),_0x3f807f=this['getElementIDsCol2']();let _0xb9fb31;_0x3f807f[_0x439ac0(0x126)]>0x0?_0xb9fb31=['Resist','Resist',_0x439ac0(0x225),_0x439ac0(0x225)]:_0xb9fb31=[_0x439ac0(0x25d),_0x439ac0(0x225)];const _0x14fb7a=Math[_0x439ac0(0x201)](_0x3e19ee[_0x439ac0(0x126)],_0x3f807f[_0x439ac0(0x126)],0x1),_0x5db75e=_0xb9fb31[_0x439ac0(0x126)];this[_0x439ac0(0x10d)](_0x3a4d3f*0x0,_0x457828,_0x3a4d3f,_0x4aa469,0x2),this['drawItemDarkRect'](_0x3a4d3f*0x1,_0x457828,_0x3a4d3f,_0x4aa469,0x2),this[_0x439ac0(0x338)](ColorManager[_0x439ac0(0x2de)]()),this['drawText'](TextManager[_0x439ac0(0x32b)],_0x3a4d3f*0x0,_0x457828,_0x3a4d3f,_0x439ac0(0xf5)),this['drawText'](TextManager['statusMenuDmgDealt'],_0x3a4d3f*0x1,_0x457828,_0x3a4d3f,_0x439ac0(0xf5)),_0x457828+=_0x4aa469,this['setDescriptionFontSizeToTraitSet']();const _0x4c661d=this['textSizeEx']('\x20')[_0x439ac0(0x297)];for(let _0x622df2=0x0;_0x622df2<_0x14fb7a;_0x622df2++){for(let _0x3f11df=0x0;_0x3f11df<_0x5db75e;_0x3f11df++){if(_0x439ac0(0x2c9)===_0x439ac0(0x262)){function _0x134c29(){const _0x33623a=_0x439ac0,_0x3409d6=_0x4567d2[_0x33623a(0x1d1)](',');let _0x15ab76=[];for(const _0x1acb88 of _0x3409d6){const _0x1c3251=_0x5aea5a[_0x33623a(0x334)](_0x1acb88);if(_0x1c3251)_0x15ab76[_0x33623a(0x19b)](_0x1c3251);}return _0x15ab76;}}else{const _0x397324=this[_0x439ac0(0x28e)]/_0x5db75e;this['drawItemDarkRect'](_0x397324*_0x3f11df,_0x457828,_0x397324,_0x4c661d);let _0x20db26=_0x3e19ee[_0x622df2];_0x5db75e===0x4&&(_0x20db26=_0x3f11df%0x2===0x0?_0x3e19ee[_0x622df2]:_0x3f807f[_0x622df2]);if(!_0x20db26)continue;const _0x30f208=$dataSystem[_0x439ac0(0x2c5)][_0x20db26];this['drawTextEx'](_0x30f208,_0x397324*(_0x3f11df+0x1/0x3)+_0x4ced23,_0x457828,_0x397324*0x2/0x3);const _0x30f914=_0xb9fb31[_0x3f11df];this['resetFontSettings']();let _0x408a37='';if(_0x30f914===_0x439ac0(0x25d)){const _0x31a0be=_0x40859b[_0x439ac0(0x2a8)](_0x20db26),_0x2d8f68=(_0x31a0be-0x1)*-0x1;this[_0x439ac0(0x338)](ColorManager[_0x439ac0(0x22c)](_0x2d8f68)),_0x408a37=_0x439ac0(0x1e2)[_0x439ac0(0xd6)](Math[_0x439ac0(0xc2)](_0x2d8f68*0x64));if(_0x40859b[_0x439ac0(0x31c)]()[_0x439ac0(0xed)](_0x20db26))this[_0x439ac0(0x338)](ColorManager[_0x439ac0(0x1e8)]()),_0x408a37=TextManager['statusMenuDmgAbsorb']['format'](Math[_0x439ac0(0xc2)](_0x31a0be*0x64));else{if(_0x31a0be>0x1)_0x408a37='%1'[_0x439ac0(0xd6)](_0x408a37);else _0x31a0be<=0x1&&(_0x408a37=_0x439ac0(0x269)[_0x439ac0(0xd6)](_0x408a37));}}else{if(_0x30f914===_0x439ac0(0x225)){const _0x1da862=_0x40859b[_0x439ac0(0x284)](_0x20db26),_0x3fb6=_0x40859b[_0x439ac0(0x12f)](_0x20db26),_0x37c684=_0x40859b[_0x439ac0(0x30c)](_0x20db26),_0x462d45=(0x1+_0x1da862)*_0x3fb6+_0x37c684-0x1;this[_0x439ac0(0x338)](ColorManager[_0x439ac0(0x22c)](_0x462d45)),_0x408a37=_0x439ac0(0x1e2)[_0x439ac0(0xd6)](Math[_0x439ac0(0xc2)](_0x462d45*0x64));if(_0x462d45>=0x0)_0x408a37=_0x439ac0(0x269)[_0x439ac0(0xd6)](_0x408a37);}}this['contents']['drawText'](_0x408a37,_0x397324*_0x3f11df,_0x457828,_0x397324/0x3-_0x4ced23,_0x4c661d,'right');}}_0x457828+=_0x4c661d;}for(let _0x9af9b4=0x0;_0x9af9b4<_0x5db75e;_0x9af9b4++){const _0x1779c7=this['innerWidth']/_0x5db75e;this[_0x439ac0(0x10d)](_0x1779c7*_0x9af9b4,_0x457828,_0x1779c7,this[_0x439ac0(0x33a)]-_0x457828);}},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0xb7)]=function(_0x258641){const _0x5b9795=_0x3e7307;this[_0x5b9795(0x152)]();let _0x1d4515=0x0;for(const _0x3ddf32 of _0x258641){if(_0x5b9795(0x9f)!==_0x5b9795(0x9f)){function _0x5bdbb6(){const _0x32ab03=_0x5b9795;this[_0x32ab03(0x1ff)]()?this[_0x32ab03(0xd1)]():_0x4e55f1['ElementStatusCore'][_0x32ab03(0x223)][_0x32ab03(0x15b)](this);}}else{if(!_0x3ddf32)continue;if(_0x3ddf32[_0x5b9795(0x17b)]()==='')continue;if(_0x3ddf32[_0x5b9795(0x345)](/-----/i))continue;_0x1d4515=Math['max'](_0x1d4515,this[_0x5b9795(0x144)](_0x3ddf32['trim']())[_0x5b9795(0x283)]);}}return _0x1d4515;},Window_StatusData['prototype'][_0x3e7307(0x2ab)]=function(){const _0x415a6a=_0x3e7307;if(this[_0x415a6a(0x295)])return this[_0x415a6a(0x295)];return this[_0x415a6a(0x295)]=this[_0x415a6a(0xb7)]($dataSystem['skillTypes']),this[_0x415a6a(0x295)];},Window_StatusData['prototype'][_0x3e7307(0x1ad)]=function(){const _0x59e29c=_0x3e7307;if(this[_0x59e29c(0x23e)])return this[_0x59e29c(0x23e)];return this[_0x59e29c(0x23e)]=this[_0x59e29c(0xb7)]($dataSystem['weaponTypes']),this[_0x59e29c(0x23e)];},Window_StatusData[_0x3e7307(0x16f)][_0x3e7307(0x1a8)]=function(){const _0x344e76=_0x3e7307;if(this['_atypeWidth'])return this['_atypeWidth'];return this[_0x344e76(0x343)]=this[_0x344e76(0xb7)]($dataSystem[_0x344e76(0xc3)]),this[_0x344e76(0x343)];},Window_StatusData['prototype'][_0x3e7307(0x263)]=function(){const _0x53f7ab=_0x3e7307,_0x4d0c71=this[_0x53f7ab(0x2c8)](),_0x329308=this[_0x53f7ab(0x2c1)],_0x56715c=Math[_0x53f7ab(0x303)](this[_0x53f7ab(0x28e)]/0x3);let _0x8e5274=0x0,_0x3a982f=0x0;this[_0x53f7ab(0x218)](0x0,this[_0x53f7ab(0x28e)]/0x2);let _0x347d31=new Rectangle(0x0,0x0,_0x56715c,this[_0x53f7ab(0x33a)]);_0x8e5274=_0x347d31['x'],_0x3a982f=0x0,this[_0x53f7ab(0x152)](),this[_0x53f7ab(0x10d)](_0x8e5274,_0x3a982f,_0x347d31[_0x53f7ab(0x283)],_0x4d0c71,0x2),this[_0x53f7ab(0x338)](ColorManager[_0x53f7ab(0x2de)]()),this[_0x53f7ab(0x1c1)](TextManager['statusMenuStype'],_0x8e5274,_0x3a982f,_0x347d31[_0x53f7ab(0x283)],_0x53f7ab(0xf5)),_0x3a982f+=_0x4d0c71;for(const _0x3254c4 of _0x329308[_0x53f7ab(0x111)]()){this[_0x53f7ab(0x10d)](_0x8e5274,_0x3a982f,_0x347d31[_0x53f7ab(0x283)],_0x4d0c71);if(_0x3254c4>0x0){const _0x6f6dc5=$dataSystem[_0x53f7ab(0x111)][_0x3254c4],_0xb9577=Math[_0x53f7ab(0xc2)]((_0x347d31[_0x53f7ab(0x283)]-this[_0x53f7ab(0x2ab)]())/0x2);this['drawTextEx'](_0x6f6dc5,_0x8e5274+_0xb9577,_0x3a982f,_0x347d31['width']-_0xb9577*0x2);}_0x3a982f+=_0x4d0c71;}this[_0x53f7ab(0x10d)](_0x8e5274,_0x3a982f,_0x347d31[_0x53f7ab(0x283)],this[_0x53f7ab(0x33a)]-_0x3a982f),_0x347d31['x']+=_0x347d31['width'],_0x8e5274=_0x347d31['x'],_0x3a982f=0x0,this[_0x53f7ab(0x152)](),this[_0x53f7ab(0x10d)](_0x8e5274,_0x3a982f,_0x347d31[_0x53f7ab(0x283)],_0x4d0c71,0x2),this[_0x53f7ab(0x338)](ColorManager[_0x53f7ab(0x2de)]()),this[_0x53f7ab(0x1c1)](TextManager[_0x53f7ab(0xb8)],_0x8e5274,_0x3a982f,_0x347d31[_0x53f7ab(0x283)],_0x53f7ab(0xf5)),_0x3a982f+=_0x4d0c71;for(const _0x5ae767 of _0x329308['weaponTypes']()){this[_0x53f7ab(0x10d)](_0x8e5274,_0x3a982f,_0x347d31['width'],_0x4d0c71);if(_0x5ae767>0x0){const _0x26ca45=$dataSystem[_0x53f7ab(0x28f)][_0x5ae767],_0x5ae143=Math[_0x53f7ab(0xc2)]((_0x347d31[_0x53f7ab(0x283)]-this[_0x53f7ab(0x1ad)]())/0x2);this[_0x53f7ab(0x14b)](_0x26ca45,_0x8e5274+_0x5ae143,_0x3a982f,_0x347d31['width']-_0x5ae143*0x2);}_0x3a982f+=_0x4d0c71;}this['drawItemDarkRect'](_0x8e5274,_0x3a982f,_0x347d31[_0x53f7ab(0x283)],this[_0x53f7ab(0x33a)]-_0x3a982f),_0x347d31['x']+=_0x347d31[_0x53f7ab(0x283)],_0x8e5274=_0x347d31['x'],_0x3a982f=0x0,_0x347d31['width']=this[_0x53f7ab(0x28e)]-_0x347d31['x'],this[_0x53f7ab(0x152)](),this['drawItemDarkRect'](_0x8e5274,_0x3a982f,_0x347d31[_0x53f7ab(0x283)],_0x4d0c71,0x2),this[_0x53f7ab(0x338)](ColorManager[_0x53f7ab(0x2de)]()),this['drawText'](TextManager[_0x53f7ab(0x9b)],_0x8e5274,_0x3a982f,_0x347d31[_0x53f7ab(0x283)],_0x53f7ab(0xf5)),_0x3a982f+=_0x4d0c71;for(const _0x2b7cae of _0x329308['armorTypes']()){this[_0x53f7ab(0x10d)](_0x8e5274,_0x3a982f,_0x347d31[_0x53f7ab(0x283)],_0x4d0c71);if(_0x2b7cae>0x0){if(_0x53f7ab(0x246)!=='UMKZt'){function _0x346b90(){const _0x4838ab=_0x587cd9['traitSetType'](_0x58f541);return _0x4838ab&&_0x4838ab['Visible'];}}else{const _0x4cbaa6=$dataSystem[_0x53f7ab(0xc3)][_0x2b7cae],_0x1bb1ec=Math['round']((_0x347d31[_0x53f7ab(0x283)]-this[_0x53f7ab(0x1a8)]())/0x2);this[_0x53f7ab(0x14b)](_0x4cbaa6,_0x8e5274+_0x1bb1ec,_0x3a982f,_0x347d31[_0x53f7ab(0x283)]-_0x1bb1ec*0x2);}}_0x3a982f+=_0x4d0c71;}this['drawItemDarkRect'](_0x8e5274,_0x3a982f,_0x347d31[_0x53f7ab(0x283)],this[_0x53f7ab(0x33a)]-_0x3a982f);};