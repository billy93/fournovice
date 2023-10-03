//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.20;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.20] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers.
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers.
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
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
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
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
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 */
//=============================================================================

const _0x5eec=['rtl','fQqHO','followers','BQlDO','</I>','rfAus','Width','Rows','SWITCHES','map\x20actor','qSkqA','TextCodeActions','processTextAlignmentX','calcWindowHeight','</COLORLOCK>','Window_Help_refresh','moveTo','StretchDimmedBg','yqNEN','QjBFS','<WORDWRAP>','Window_Base_processAllText','Vrabc','Window_Message_clearFlags','setPositionType','Window_Message_newPage','clear','partyMemberName','Scene_Options_maxCommands','call','Window_Options_statusText','KHhJN','initTextAlignement','</WORDWRAP>','HelpWindow','_nameBoxWindow','TightWrap','message','isAutoColorAffected','processDrawPicture','synchronizeNameBox','Window_Message_terminateMessage','1045377qJRXjZ','setupChoices','MaxRows','Game_Map_setupEvents','_moveEasingType','textWidth','SHOW','filter','EGYKh','faceName','isSceneMap','ParseEnemyNotetags','LineHeight','makeFontBigger','mainFontFace','obtainGold','preConvertEscapeCharacters','close','adjustShowChoiceExtension','slice','setTextAlignment','getChoiceListLineHeight','maxChoiceWidth','addLoadListener','ZaHUT','quantity','return\x200','WJImX','addContinuousShowChoices','isRunning','JRfnT','choice','isChoiceEnabled','dBKBN','Game_Map_initialize','prepareShowTextFollowups','Dywuj','_forcedPosition','textColor','processPxTextCode','ConvertParams','_autoPosRegExp','_colorLock','onNewPageMessageCore','wUKZe','<COLORLOCK>','TPOJT','exit','test','_cancelButton','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','DQPJv','tTeCo','<BR>','AutoColorBypassList','\x1bITALIC[1]','NameBoxWindowDefaultColor','_relativePosition','isBreakShowTextCommands','addMessageCoreTextSpeedCommand','kGcKv','HIDE','COMMONEVENT','iXayU','applyDatabaseAutoColor','maxFontSizeInLine','ConfigManager_applyData','Enemies','maxCommands','EkEiq','_eventId','updateEvents','LineBreakSpace','addCommand','ParseArmorNotetags','_list','\x1bITALIC[0]','calcMoveEasing','numVisibleRows','_index','padding','[0]','PREVCOLOR','_indent','messageWidth','setMessageWindowWordWrap','MessageWidth','(((','_wordWrap','RelativePXPY','levelUp','IQfpT','process_VisuMZ_MessageCore_AutoColor','start','resetFontSettings','convertFontSettingsEscapeCharacters','Window_Message_synchronizeNameBox','battle\x20enemy','QHaxm','<LEFT>','1509009HkOPOD','outputWidth','choiceTextAlign','setChoiceListTextAlign','fyyNQ','drawBackPicture','convertTextMacros','isContinuePrepareShowTextCommands','bind','oJKZw','onProcessCharacter','ParseItemNotetags','clearActorNameAutoColor','updateDimensions','itemHeight','commandName','trim','process_VisuMZ_MessageCore_TextCodes_Replace','<CENTER>','setMessageWindowRows','isCommandEnabled','ZLnHC','DefaultOutlineWidth','currentExt','processFontChangeBold','changeTextColor','addWrapBreakAfterPunctuation','States','isHelpWindowWordWrap','initMessageCore','SortObjectByKeyLength','actorName','Uyddv','clampPlacementPosition','messageRows','hZKYC','processDrawCenteredPicture','Instant','makeFontSmaller','\x1bTEXTALIGNMENT[1]','1383341FMxpTl','changePaintOpacity','getMessageWindowWidth','PICTURE','VnJAG','NameBoxWindowOffsetX','clearCommandList','_moveTargetWidth','getChoiceListMaxRows','ChoiceWindowMaxCols','jGiMn','paintOpacity','getMessageWindowRows','mainFontSize','</B>','AutoColorRegExp','postConvertEscapeCharacters','floor','140443FRLUZU','</CENTER>','nextEventCode','lineHeight','zycas','type','ParseWeaponNotetags','isWordWrapEnabled','flushTextState','createTextState','Window_Options_changeVolume','easeIn','resetPositionX','aceyO','processAutoColorWords','ChoiceWindowMaxRows','textSpeedStatusText','processColorLock','resetWordWrap','wSLAH','</LEFT>','<I>','default','uZQZD','fJxXW','SWITCH','7nccutJ','updateAutoPosition','<B>','parameters','changeTextSpeed','adjustShowChoiceCancel','includes','addExtraShowChoices','Weapons','AddAutoColor','TextCodeReplace','innerWidth','BNjiX','AddOption','add','registerResetRect','outputHeight','isMessageWindowWordWrap','jtNVG','applyMoveEasing','qIKno','UsKra','_MessageCoreSettings','format','_centerMessageWindow','pUXnN','\x1bBOLD[1]','preemptive','Window_Base_textSizeEx','XhSfY','textCodeCheck','rqKYY','Game_Interpreter_setupChoices','Name','drawBackCenteredPicture','exec','join','currencyUnit','isPressed','defeat','activate','_textColorStack','meXxw','STRUCT','Skills','CreateAutoColorRegExpListEntries','fontItalic','setup','windowX','push','LFvRa','length','OOgaL','setTextDelay','processAutoSize','updateMessageCommonEvents','updateMove','ZKPia','refreshDimmerBitmap','statusText','Center','easeOut','_messageCommonEvents','uswlM','obtainExp','CommonEvent','_lastGainedItemData','openness','substr','processCommonEvent','tMrzG','Window_ChoiceList_windowX','anuJb','_dimmerSprite','addedWidth','setMessageWindowWidth','code','messageCoreTextSpeed','Window_NameBox_updatePlacement','</RIGHT>','EVAL','FontChangeValue','normalColor','FontBiggerCap','loadPicture','adjustShowChoiceDefault','addedHeight','Window_Base_update','_resetRect','1ZnbbUM','defaultColor','MessageCore','split','_messagePositionReset','_data','right','isTriggered','addContinuousShowTextCommands','_textDelay','toUpperCase','isVolumeSymbol','setChoiceListMaxColumns','sKmWu','map\x20party','replace','match','updateRelativePosition',')))','command101','ceil','ParseAllNotetags','registerActorNameAutoColorChanges','parseChoiceText','choiceLineHeight','UhuHM','1NFQNFx','setWordWrap','vxYuQ','CLrOR','iconIndex','prepareShowTextCommand','srjLn','Window_Base_initialize','innerHeight','messageWordWrap','TextManager_message','version','convertMessageCoreEscapeReplacements','processAllText','makeDeepCopy','obtainItem','TextJS','_moveTargetHeight','boxWidth','refresh','736423bXOzRU','Window_Base_processEscapeCharacter','members','status','oUBKn','getConfigValue','ARRAYSTRUCT','processFontChangeItalic','ipMTT','maxLines','cRBJe','description','initialize','windowPadding','choices','jsFmm','changeValue','\x1bi[%1]%2','wgNJY','ANY','shift','QYjuU','setChoiceListMaxRows','convertVariableEscapeCharacters','1mfvzNZ','Window_ChoiceList_updatePlacement','escapeStart','CNfuD','FontSmallerCap','ARRAYJSON','prototype','outLineColor','AutoColor','center','eVgiX','EwgLT','addGeneralOptions','resetRect','Window_Base_processControlCharacter','1183079DfHLOx','actor','Items','ConfigManager_makeData','prepareWordWrapEscapeCharacters','isSceneBattle','LbYIS','registerCommand','\x1bC[%1]%2\x1bPREVCOLOR[0]','toLowerCase','ParseSkillNotetags','ConvertTextAutoColorRegExpFriendly','processActorNameAutoColorChanges','rXMLa','AqGnf','_autoSizeRegexp','TextSpeed','Type','getPreservedFontSettings','list','STR','CreateAutoColorFor','CENTERPICTURE','\x1bTEXTALIGNMENT[2]','updateOffsetPosition','newPage','Window_Options_isVolumeSymbol','prepareAutoSizeEscapeCharacters','processNewLine','UdUpr','\x1bWrapBreak[0]','AdjustRect','setupEvents','LIfJe','TextStr','currentCommand','cVkel','resetTextColor','XgoWd','addMessageCommonEvent','4501371gQYjuT','choiceRows','processWrapBreak','COLORLOCK','VJAGU','WordWrap','Window_Message_updatePlacement','drawItem','General','outlineWidth','convertShowChoiceEscapeCodes','round','battle\x20party','\x1bCOLORLOCK[1]','fontSize','instantTextSpeed','processCharacter','\x1bBOLD[0]','ActionJS','setupItemChoice','wciVY','createContents','Window_Base_changeTextColor','helpWordWrap','_commonEventId','_scene','setLastGainedItemData','constructor','fontBold','Actors','MessageWindowProperties','name','ChoiceWindowLineHeight','_autoPositionTarget','emerge','CreateAutoColorRegExpLists','drawing','changeOutlineColor','dMPyE','ParseClassNotetags','textCodeResult','\x1bCOLORLOCK[0]','map','QSYhy','return\x20\x27','remove','isChoiceVisible','setChoiceListLineHeight','surprise','postFlushTextState','processPyTextCode','_moveTargetX','process_VisuMZ_MessageCore_TextCodes_Action','none','processEscapeCharacter','launchMessageCommonEvent','itemPadding','Game_System_initialize','isArmor','gainItem','event','vbSst','ITALIC','setupNumInput','textSizeExWordWrap','\x1bTEXTALIGNMENT','convertTextAlignmentEscapeCharacters','scale','findTargetSprite','ParseStateNotetags','left','terminateMessage','prepareForcedPositionEscapeCharacters','index','Window_Base_processNewLine','indexOf','_positionType','Scene_Boot_onDatabaseLoaded','process_VisuMZ_MessageCore_TextMacros','Kdevm','startX','_spriteset','itemRectWithPadding','fontFace','makeCommandList','Window_NameBox_refresh','ARRAYNUM','iHOrH','makeData','Undefined','parse','isColorLocked','onDatabaseLoaded','updateTransform','isItem','Game_Map_updateEvents','battle\x20actor','_autoColorActorNames','xRDzA','contentsBack','Game_Party_gainItem','mDFmn','ARRAYFUNC','TEXTALIGNMENT','clearFlags','true','clamp','textSizeEx','substring','moveBy','false','drawTextEx','TextMacros','textSizeExTextAlignment','returnPreservedFontSettings','updatePlacement','_wholeMoveDuration','map\x20player','processPreviousColor','getLastGainedItemData','text','_moveDuration','setColorLock','BOLD','Settings','placeCancelButton','FUNC','databaseObjectName','YPAWv','obtainEscapeParam','jblvr','sort','DrcNw','ENABLE','value','DISABLE','_moveTargetY','_interpreter','getChoiceListTextAlign','ySJzu','_showFast','processMessageCoreEscapeActions','maxCols','isRTL','zuvKx','min','indent','onChoice','updateAutoSizePosition','convertBackslashCharacters','choiceCols','setRelativePosition','faceWidth','setSpeakerName','messagePositionReset','updateOverlappingY','convertBaseEscapeCharacters','contents','_autoSizeCheck','Match','follower','WAIT','CrRNZ','update','_textDelayCount','stretchDimmerSprite','Armors','JUBiG','width','updateNameBoxMove','processCustomWait','NameBoxWindowOffsetY','mqxeU','processControlCharacter','\x1bTEXTALIGNMENT[0]','changeVolume','_messageWindow','canMove','Default','convertLockColorsEscapeCharacters','height','boxHeight','startWait','unshift','blt','map\x20event','textSpeed','max','obtainEscapeString','convertMessageCoreEscapeActions','processStoredAutoColorChanges','Window_Options_addGeneralOptions','selectDefault','processAutoPosition','TextAlign','Hfedp'];const _0x508315=_0x6bd9;(function(_0x3d4e4f,_0x1f64b1){const _0x5ca73a=_0x6bd9;while(!![]){try{const _0x4d8f10=parseInt(_0x5ca73a(0x291))+-parseInt(_0x5ca73a(0xb3))*-parseInt(_0x5ca73a(0xcd))+parseInt(_0x5ca73a(0x16c))*-parseInt(_0x5ca73a(0x154))+parseInt(_0x5ca73a(0x17b))*parseInt(_0x5ca73a(0x126))+parseInt(_0x5ca73a(0x79))+parseInt(_0x5ca73a(0x140))*parseInt(_0x5ca73a(0xa1))+-parseInt(_0x5ca73a(0x1a3));if(_0x4d8f10===_0x1f64b1)break;else _0x3d4e4f['push'](_0x3d4e4f['shift']());}catch(_0x2609a9){_0x3d4e4f['push'](_0x3d4e4f['shift']());}}}(_0x5eec,0xd3741));var label='MessageCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x508315(0x298)](function(_0x571a28){const _0x40497e=_0x508315;return _0x571a28[_0x40497e(0x157)]&&_0x571a28[_0x40497e(0x15f)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x508315(0x2b9)]=function(_0x45613a,_0x539f5c){const _0x3c9027=_0x508315;for(const _0x121dca in _0x539f5c){if(_0x121dca[_0x3c9027(0x136)](/(.*):(.*)/i)){if(_0x3c9027(0xec)!==_0x3c9027(0xec)){function _0x2142c0(){const _0x3a9623=_0x3c9027;var _0x4d2182=/^\<(.*?)\>/[_0x3a9623(0xf0)](_0x26540e[_0x3a9623(0x21b)][_0x3a9623(0x2a4)](_0x241a98[_0x3a9623(0x1ec)]));return _0x4d2182?(_0x5460c0['index']+=_0x4d2182[0x0]['length'],_0xcfc3d(_0x4d2182[0x0]['slice'](0x1,_0x4d2182[0x0][_0x3a9623(0x100)]-0x1))):'';}}else{const _0x47c348=String(RegExp['$1']),_0x26f149=String(RegExp['$2'])[_0x3c9027(0x130)]()['trim']();let _0x16afaf,_0x582d72,_0x5d740c;switch(_0x26f149){case'NUM':_0x16afaf=_0x539f5c[_0x121dca]!==''?Number(_0x539f5c[_0x121dca]):0x0;break;case _0x3c9027(0x1f9):_0x582d72=_0x539f5c[_0x121dca]!==''?JSON[_0x3c9027(0x1fd)](_0x539f5c[_0x121dca]):[],_0x16afaf=_0x582d72[_0x3c9027(0x1cd)](_0x27ebff=>Number(_0x27ebff));break;case _0x3c9027(0x11d):_0x16afaf=_0x539f5c[_0x121dca]!==''?eval(_0x539f5c[_0x121dca]):null;break;case'ARRAYEVAL':_0x582d72=_0x539f5c[_0x121dca]!==''?JSON[_0x3c9027(0x1fd)](_0x539f5c[_0x121dca]):[],_0x16afaf=_0x582d72['map'](_0x5f1de9=>eval(_0x5f1de9));break;case'JSON':_0x16afaf=_0x539f5c[_0x121dca]!==''?JSON[_0x3c9027(0x1fd)](_0x539f5c[_0x121dca]):'';break;case _0x3c9027(0x171):_0x582d72=_0x539f5c[_0x121dca]!==''?JSON[_0x3c9027(0x1fd)](_0x539f5c[_0x121dca]):[],_0x16afaf=_0x582d72[_0x3c9027(0x1cd)](_0x46007f=>JSON[_0x3c9027(0x1fd)](_0x46007f));break;case _0x3c9027(0x221):_0x16afaf=_0x539f5c[_0x121dca]!==''?new Function(JSON[_0x3c9027(0x1fd)](_0x539f5c[_0x121dca])):new Function(_0x3c9027(0x2ab));break;case _0x3c9027(0x209):_0x582d72=_0x539f5c[_0x121dca]!==''?JSON[_0x3c9027(0x1fd)](_0x539f5c[_0x121dca]):[],_0x16afaf=_0x582d72[_0x3c9027(0x1cd)](_0x577b3b=>new Function(JSON[_0x3c9027(0x1fd)](_0x577b3b)));break;case _0x3c9027(0x18f):_0x16afaf=_0x539f5c[_0x121dca]!==''?String(_0x539f5c[_0x121dca]):'';break;case'ARRAYSTR':_0x582d72=_0x539f5c[_0x121dca]!==''?JSON[_0x3c9027(0x1fd)](_0x539f5c[_0x121dca]):[],_0x16afaf=_0x582d72['map'](_0x3b2ef2=>String(_0x3b2ef2));break;case _0x3c9027(0xf8):_0x5d740c=_0x539f5c[_0x121dca]!==''?JSON[_0x3c9027(0x1fd)](_0x539f5c[_0x121dca]):{},_0x45613a[_0x47c348]={},VisuMZ['ConvertParams'](_0x45613a[_0x47c348],_0x5d740c);continue;case _0x3c9027(0x15a):_0x582d72=_0x539f5c[_0x121dca]!==''?JSON[_0x3c9027(0x1fd)](_0x539f5c[_0x121dca]):[],_0x16afaf=_0x582d72[_0x3c9027(0x1cd)](_0x53a934=>VisuMZ[_0x3c9027(0x2b9)]({},JSON[_0x3c9027(0x1fd)](_0x53a934)));break;default:continue;}_0x45613a[_0x47c348]=_0x16afaf;}}}return _0x45613a;},(_0x1c035b=>{const _0x2ccd86=_0x508315,_0x98eebb=_0x1c035b[_0x2ccd86(0x1c2)];for(const _0x53eeeb of dependencies){if(!Imported[_0x53eeeb]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x98eebb,_0x53eeeb)),SceneManager['exit']();break;}}const _0x58df74=_0x1c035b[_0x2ccd86(0x15f)];if(_0x58df74['match'](/\[Version[ ](.*?)\]/i)){if(_0x2ccd86(0x279)!==_0x2ccd86(0xca)){const _0x323cda=Number(RegExp['$1']);_0x323cda!==VisuMZ[label][_0x2ccd86(0x14b)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x2ccd86(0xe4)](_0x98eebb,_0x323cda)),SceneManager[_0x2ccd86(0x2c0)]());}else{function _0x277063(){_0x15b465['x']-=_0x38d682['startX'];}}}if(_0x58df74[_0x2ccd86(0x136)](/\[Tier[ ](\d+)\]/i)){if(_0x2ccd86(0x163)===_0x2ccd86(0x163)){const _0x17876f=Number(RegExp['$1']);if(_0x17876f<tier)alert(_0x2ccd86(0x2c3)[_0x2ccd86(0xe4)](_0x98eebb,_0x17876f,tier)),SceneManager[_0x2ccd86(0x2c0)]();else{if(_0x2ccd86(0xe1)!==_0x2ccd86(0xe1)){function _0x11d45c(){const _0x3a0ee8=_0x2ccd86,_0xcc67ae=_0x109e8a[_0x3a0ee8(0x128)][_0x3a0ee8(0x21f)][_0x3a0ee8(0x1ab)][_0x3a0ee8(0x2c9)];return _0x497b63['textColor'](_0xcc67ae);}}else tier=Math[_0x2ccd86(0x25e)](_0x17876f,tier);}}else{function _0x3959dc(){const _0x2ddbeb=_0x2ccd86;_0xb97876=_0x389619[_0x2ddbeb(0x25e)](_0x1b18aa,_0x282288);}}}VisuMZ['ConvertParams'](VisuMZ[label][_0x2ccd86(0x21f)],_0x1c035b[_0x2ccd86(0xd0)]);})(pluginData),PluginManager[_0x508315(0x182)](pluginData[_0x508315(0x1c2)],'ChoiceWindowProperties',_0x57edc1=>{const _0x2f73b9=_0x508315;VisuMZ[_0x2f73b9(0x2b9)](_0x57edc1,_0x57edc1);const _0x984cf9=_0x57edc1[_0x2f73b9(0x29d)]||$gameSystem[_0x2f73b9(0x2a6)]()||0x1,_0x48d77e=_0x57edc1[_0x2f73b9(0x293)]||$gameSystem[_0x2f73b9(0xa9)]()||0x1,_0x2186fc=_0x57edc1['MaxCols']||$gameSystem['getChoiceListMaxColumns']()||0x1,_0x36cb99=_0x57edc1[_0x2f73b9(0x265)]['toLowerCase']()||_0x2f73b9(0xc9);$gameSystem[_0x2f73b9(0x1d2)](_0x984cf9),$gameSystem[_0x2f73b9(0x16a)](_0x48d77e),$gameSystem[_0x2f73b9(0x132)](_0x2186fc),$gameSystem[_0x2f73b9(0x7c)](_0x36cb99);}),PluginManager['registerCommand'](pluginData['name'],_0x508315(0x1c1),_0x1a8ff4=>{const _0xfd686=_0x508315;VisuMZ[_0xfd686(0x2b9)](_0x1a8ff4,_0x1a8ff4);const _0x4bd202=_0x1a8ff4[_0xfd686(0x26e)]||$gameSystem[_0xfd686(0xad)]()||0x1,_0x453a50=_0x1a8ff4[_0xfd686(0x26d)]||$gameSystem['getMessageWindowWidth']()||0x1;$gameTemp[_0xfd686(0xe5)]=_0x1a8ff4[_0xfd686(0x109)]||![];const _0x52d707=_0x1a8ff4[_0xfd686(0x1a8)]['toLowerCase']();$gameSystem[_0xfd686(0x8c)](_0x4bd202),$gameSystem[_0xfd686(0x118)](_0x453a50);[_0xfd686(0x20c),_0xfd686(0x211)][_0xfd686(0xd3)](_0x52d707)&&$gameSystem[_0xfd686(0x6a)](eval(_0x52d707));const _0x58f6d1=SceneManager['_scene'][_0xfd686(0x253)];_0x58f6d1&&(_0x58f6d1[_0xfd686(0xc5)](),_0x58f6d1[_0xfd686(0x86)](),_0x58f6d1[_0xfd686(0x1b8)]());}),VisuMZ[_0x508315(0x128)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x508315(0x172)][_0x508315(0x1ff)],Scene_Boot['prototype'][_0x508315(0x1ff)]=function(){const _0x5681d7=_0x508315;VisuMZ[_0x5681d7(0x128)][_0x5681d7(0x1f0)][_0x5681d7(0x284)](this),this['process_VisuMZ_MessageCore_TextCodes_Action'](),this[_0x5681d7(0x8a)](),this[_0x5681d7(0x1f1)](),this[_0x5681d7(0x71)]();},VisuMZ[_0x508315(0x128)][_0x508315(0x97)]=function(_0x185fe6){const _0x254045=_0x508315,_0x264323=VisuMZ[_0x254045(0x128)][_0x254045(0x21f)][_0x185fe6];_0x264323['sort']((_0x43d296,_0xa603cb)=>{const _0x1279c1=_0x254045;if(!_0x43d296||!_0xa603cb)return-0x1;return _0xa603cb[_0x1279c1(0x242)]['length']-_0x43d296[_0x1279c1(0x242)][_0x1279c1(0x100)];});},Scene_Boot[_0x508315(0x172)][_0x508315(0x1d7)]=function(){const _0x451abe=_0x508315;VisuMZ[_0x451abe(0x128)][_0x451abe(0x97)](_0x451abe(0x272));for(const _0x38fe91 of VisuMZ[_0x451abe(0x128)]['Settings']['TextCodeActions']){if(_0x451abe(0x166)!=='cOUnR'){_0x38fe91[_0x451abe(0x242)]=_0x38fe91[_0x451abe(0x242)][_0x451abe(0x130)](),_0x38fe91[_0x451abe(0xeb)]=new RegExp('\x1b'+_0x38fe91[_0x451abe(0x242)],'gi'),_0x38fe91['textCodeResult']='\x1b'+_0x38fe91[_0x451abe(0x242)];if(_0x38fe91[_0x451abe(0x18c)]==='')_0x38fe91[_0x451abe(0x1cb)]+=_0x451abe(0x66);}else{function _0x23d18d(){const _0x23291a=_0x451abe;return _0x402b13[this[_0x23291a(0x1bb)]];}}}},Scene_Boot['prototype'][_0x508315(0x8a)]=function(){const _0x4acc02=_0x508315;VisuMZ[_0x4acc02(0x128)]['SortObjectByKeyLength'](_0x4acc02(0xd7));for(const _0x2b5ac6 of VisuMZ[_0x4acc02(0x128)][_0x4acc02(0x21f)][_0x4acc02(0xd7)]){_0x2b5ac6[_0x4acc02(0xeb)]=new RegExp('\x1b'+_0x2b5ac6[_0x4acc02(0x242)]+_0x2b5ac6['Type'],'gi'),_0x2b5ac6['TextStr']!==''&&_0x2b5ac6[_0x4acc02(0x19d)]!=='Undefined'?_0x2b5ac6[_0x4acc02(0x1cb)]=new Function(_0x4acc02(0x1cf)+_0x2b5ac6[_0x4acc02(0x19d)][_0x4acc02(0x135)](/\\/g,'\x1b')+'\x27'):_0x2b5ac6[_0x4acc02(0x1cb)]=_0x2b5ac6[_0x4acc02(0x150)];}},Scene_Boot[_0x508315(0x172)][_0x508315(0x1f1)]=function(){const _0x4dfbcb=_0x508315;for(const _0x3bd8c6 of VisuMZ[_0x4dfbcb(0x128)][_0x4dfbcb(0x21f)][_0x4dfbcb(0x213)]){_0x3bd8c6[_0x4dfbcb(0xeb)]=new RegExp('\x5c['+_0x3bd8c6[_0x4dfbcb(0x242)]+'\x5c]','gi');if(_0x3bd8c6['TextStr']!==''&&_0x3bd8c6[_0x4dfbcb(0x19d)]!==_0x4dfbcb(0x1fc))_0x3bd8c6[_0x4dfbcb(0x1cb)]=new Function(_0x4dfbcb(0x1cf)+_0x3bd8c6['TextStr'][_0x4dfbcb(0x135)](/\\/g,'\x1b')+'\x27');else{if(_0x4dfbcb(0x24f)!==_0x4dfbcb(0x266))_0x3bd8c6[_0x4dfbcb(0x1cb)]=_0x3bd8c6[_0x4dfbcb(0x150)];else{function _0x1ed2c8(){const _0x547e76=_0x4dfbcb;this[_0x547e76(0x141)](![]);}}}}},Scene_Boot[_0x508315(0x172)]['process_VisuMZ_MessageCore_AutoColor']=function(){const _0x4cd1ef=_0x508315,_0xc23832=VisuMZ[_0x4cd1ef(0x128)][_0x4cd1ef(0x21f)]['AutoColor'];!VisuMZ[_0x4cd1ef(0x13b)]&&(VisuMZ[_0x4cd1ef(0x128)][_0x4cd1ef(0xd6)]($dataClasses,_0xc23832['Classes']),VisuMZ[_0x4cd1ef(0x128)]['AddAutoColor']($dataSkills,_0xc23832['Skills']),VisuMZ[_0x4cd1ef(0x128)][_0x4cd1ef(0xd6)]($dataItems,_0xc23832[_0x4cd1ef(0x17d)]),VisuMZ[_0x4cd1ef(0x128)][_0x4cd1ef(0xd6)]($dataWeapons,_0xc23832[_0x4cd1ef(0xd5)]),VisuMZ[_0x4cd1ef(0x128)][_0x4cd1ef(0xd6)]($dataArmors,_0xc23832['Armors']),VisuMZ[_0x4cd1ef(0x128)][_0x4cd1ef(0xd6)]($dataEnemies,_0xc23832[_0x4cd1ef(0x2d4)]),VisuMZ[_0x4cd1ef(0x128)][_0x4cd1ef(0xd6)]($dataStates,_0xc23832['States'])),VisuMZ[_0x4cd1ef(0x128)][_0x4cd1ef(0x1c6)]();},VisuMZ['MessageCore']['AutoColorBypassList']=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x508315(0xcf),_0x508315(0xaf),_0x508315(0xc8),_0x508315(0x26b),_0x508315(0x78),_0x508315(0xc7),_0x508315(0x8b),_0x508315(0xb4),'<RIGHT>',_0x508315(0x11c),_0x508315(0x2be),_0x508315(0x275),_0x508315(0x6c),_0x508315(0x138),_0x508315(0x27b),'</WORDWRAP>',_0x508315(0x2c6),'<LINE\x20BREAK>',_0x508315(0xa4),_0x508315(0x191),_0x508315(0x2cf),_0x508315(0x244),_0x508315(0x297),_0x508315(0x2ce),_0x508315(0x228),_0x508315(0x22a),_0x508315(0xcc),_0x508315(0x26f),'ALL',_0x508315(0x167)],VisuMZ[_0x508315(0x128)][_0x508315(0xd6)]=function(_0x37d824,_0x304cce){const _0x5c910b=_0x508315;if(_0x304cce<=0x0)return;const _0x5dc146=_0x37d824;for(const _0x2475e3 of _0x5dc146){if(!_0x2475e3)continue;VisuMZ[_0x5c910b(0x128)][_0x5c910b(0x190)](_0x2475e3,_0x304cce);}},VisuMZ[_0x508315(0x128)][_0x508315(0x1c6)]=function(){const _0x547e50=_0x508315;VisuMZ[_0x547e50(0x128)][_0x547e50(0xb0)]=[];for(let _0x2ccbe9=0x1;_0x2ccbe9<=0x1f;_0x2ccbe9++){if(_0x547e50(0x2a9)==='CTrPK'){function _0x2c4f9a(){const _0x2e4fc3=_0x547e50;_0x52c029[_0x2e4fc3(0x128)]['Window_Base_processNewLine'][_0x2e4fc3(0x284)](this,_0x5e3654),this[_0x2e4fc3(0x273)](_0x208bf8);}}else{const _0x485643='TextColor%1'[_0x547e50(0xe4)](_0x2ccbe9),_0x12ba2f=VisuMZ[_0x547e50(0x128)][_0x547e50(0x21f)][_0x547e50(0x174)][_0x485643];_0x12ba2f[_0x547e50(0x226)]((_0xf07d4e,_0x472715)=>{const _0x4701d8=_0x547e50;if(!_0xf07d4e||!_0x472715)return-0x1;return _0x472715[_0x4701d8(0x100)]-_0xf07d4e[_0x4701d8(0x100)];}),this[_0x547e50(0xfa)](_0x12ba2f,_0x2ccbe9);}}},VisuMZ[_0x508315(0x128)][_0x508315(0xfa)]=function(_0x15bf1c,_0xa22ca1){const _0x26d719=_0x508315;for(const _0x34e59f of _0x15bf1c){if(_0x34e59f[_0x26d719(0x100)]<=0x0)continue;if(/^\d+$/[_0x26d719(0x2c1)](_0x34e59f))continue;let _0x12eb5f=VisuMZ[_0x26d719(0x128)][_0x26d719(0x186)](_0x34e59f);if(_0x34e59f[_0x26d719(0x136)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)){if(_0x26d719(0x77)!==_0x26d719(0x77)){function _0x4a018a(){if(!_0x122130['value'](_0x3959ca))return!![];}}else var _0x134cd8=new RegExp(_0x12eb5f,'i');}else{if(_0x26d719(0x2af)===_0x26d719(0x188)){function _0xe29646(){const _0x1dac65=_0x26d719,_0x5a298d=_0x518d5d[_0x1dac65(0x21a)]();if(_0x5a298d['id']<0x0)return'';let _0x487a9c=null;if(_0x5a298d[_0x1dac65(0xb8)]===0x0)_0x487a9c=_0x43c94a[_0x5a298d['id']];if(_0x5a298d[_0x1dac65(0xb8)]===0x1)_0x487a9c=_0x47f645[_0x5a298d['id']];if(_0x5a298d[_0x1dac65(0xb8)]===0x2)_0x487a9c=_0x36bcae[_0x5a298d['id']];if(!_0x487a9c)return'';return _0xbf1da1?_0x1dac65(0x165)[_0x1dac65(0xe4)](_0x487a9c[_0x1dac65(0x144)],_0x487a9c['name']):_0x487a9c[_0x1dac65(0x1c2)];}}else var _0x134cd8=new RegExp('\x5cb'+_0x12eb5f+'\x5cb','g');}VisuMZ[_0x26d719(0x128)][_0x26d719(0xb0)][_0x26d719(0xfe)]([_0x134cd8,'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x26d719(0xe4)](_0xa22ca1,_0x34e59f)]);}},VisuMZ['MessageCore'][_0x508315(0x186)]=function(_0x4f4df6){const _0x2bdbf0=_0x508315;return _0x4f4df6=_0x4f4df6['replace'](/(\W)/gi,(_0x1b50f9,_0x560c0c)=>'\x5c%1'[_0x2bdbf0(0xe4)](_0x560c0c)),_0x4f4df6;},VisuMZ['MessageCore'][_0x508315(0x1ca)]=VisuMZ[_0x508315(0x1ca)],VisuMZ[_0x508315(0x1ca)]=function(_0x1eb9c8){const _0x4068b2=_0x508315;VisuMZ[_0x4068b2(0x128)][_0x4068b2(0x1ca)][_0x4068b2(0x284)](this,_0x1eb9c8);const _0x3d6669=VisuMZ[_0x4068b2(0x128)]['Settings'][_0x4068b2(0x174)];VisuMZ[_0x4068b2(0x128)][_0x4068b2(0x190)](_0x1eb9c8,_0x3d6669['Classes']);},VisuMZ[_0x508315(0x128)][_0x508315(0x185)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x508315(0x185)]=function(_0x102d13){const _0x3b9cd7=_0x508315;VisuMZ[_0x3b9cd7(0x128)][_0x3b9cd7(0x185)][_0x3b9cd7(0x284)](this,_0x102d13);const _0xd4c9e6=VisuMZ[_0x3b9cd7(0x128)]['Settings']['AutoColor'];VisuMZ['MessageCore'][_0x3b9cd7(0x190)](_0x102d13,_0xd4c9e6[_0x3b9cd7(0xf9)]);},VisuMZ[_0x508315(0x128)][_0x508315(0x84)]=VisuMZ[_0x508315(0x84)],VisuMZ[_0x508315(0x84)]=function(_0xd2c620){const _0x55449a=_0x508315;VisuMZ[_0x55449a(0x128)][_0x55449a(0x84)][_0x55449a(0x284)](this,_0xd2c620);const _0x1c46f7=VisuMZ[_0x55449a(0x128)][_0x55449a(0x21f)]['AutoColor'];VisuMZ[_0x55449a(0x128)][_0x55449a(0x190)](_0xd2c620,_0x1c46f7[_0x55449a(0x17d)]);},VisuMZ['MessageCore'][_0x508315(0xb9)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x508315(0xb9)]=function(_0x20d27c){const _0x84e91e=_0x508315;VisuMZ[_0x84e91e(0x128)][_0x84e91e(0xb9)][_0x84e91e(0x284)](this,_0x20d27c);const _0x32259e=VisuMZ['MessageCore'][_0x84e91e(0x21f)][_0x84e91e(0x174)];VisuMZ[_0x84e91e(0x128)]['CreateAutoColorFor'](_0x20d27c,_0x32259e['Weapons']);},VisuMZ[_0x508315(0x128)][_0x508315(0x2db)]=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x508315(0x2db)]=function(_0x3e7fce){const _0x3c382d=_0x508315;VisuMZ[_0x3c382d(0x128)][_0x3c382d(0x2db)][_0x3c382d(0x284)](this,_0x3e7fce);const _0x5bae77=VisuMZ[_0x3c382d(0x128)][_0x3c382d(0x21f)]['AutoColor'];VisuMZ[_0x3c382d(0x128)][_0x3c382d(0x190)](_0x3e7fce,_0x5bae77[_0x3c382d(0x249)]);},VisuMZ[_0x508315(0x128)][_0x508315(0x29c)]=VisuMZ[_0x508315(0x29c)],VisuMZ['ParseEnemyNotetags']=function(_0x461e09){const _0x13475b=_0x508315;VisuMZ[_0x13475b(0x128)][_0x13475b(0x29c)]['call'](this,_0x461e09);const _0x4b7b00=VisuMZ['MessageCore'][_0x13475b(0x21f)][_0x13475b(0x174)];VisuMZ['MessageCore'][_0x13475b(0x190)](_0x461e09,_0x4b7b00[_0x13475b(0x2d4)]);},VisuMZ[_0x508315(0x128)][_0x508315(0x1e8)]=VisuMZ[_0x508315(0x1e8)],VisuMZ[_0x508315(0x1e8)]=function(_0x10af8c){const _0x93d080=_0x508315;VisuMZ['MessageCore']['ParseStateNotetags'][_0x93d080(0x284)](this,_0x10af8c);const _0x233e3f=VisuMZ['MessageCore']['Settings'][_0x93d080(0x174)];VisuMZ['MessageCore'][_0x93d080(0x190)](_0x10af8c,_0x233e3f['States']);},VisuMZ[_0x508315(0x128)][_0x508315(0x190)]=function(_0x14d8e9,_0x10cd25){const _0xa327f8=_0x508315;if(_0x10cd25<=0x0)return;const _0xa5bb2=VisuMZ[_0xa327f8(0x128)][_0xa327f8(0x21f)][_0xa327f8(0x174)]['TextColor'+_0x10cd25];let _0x2229ae=_0x14d8e9[_0xa327f8(0x1c2)][_0xa327f8(0x89)]();if(/^\d+$/[_0xa327f8(0x2c1)](_0x2229ae))return;if(VisuMZ[_0xa327f8(0x128)][_0xa327f8(0x2c7)]['includes'](_0x2229ae[_0xa327f8(0x130)]()))return;_0x2229ae=_0x2229ae[_0xa327f8(0x135)](/\\I\[(\d+)\]/gi,''),_0x2229ae=_0x2229ae['replace'](/\x1bI\[(\d+)\]/gi,'');if(_0x2229ae['length']<=0x0)return;if(_0x2229ae['match'](/-----/i))return;_0xa5bb2[_0xa327f8(0xfe)](_0x2229ae);},SceneManager[_0x508315(0x180)]=function(){const _0x28b802=_0x508315;return this[_0x28b802(0x1bc)]&&this[_0x28b802(0x1bc)][_0x28b802(0x1be)]===Scene_Battle;},SceneManager[_0x508315(0x29b)]=function(){const _0x4d03b4=_0x508315;return this[_0x4d03b4(0x1bc)]&&this['_scene']['constructor']===Scene_Map;},VisuMZ[_0x508315(0x128)][_0x508315(0x14a)]=TextManager[_0x508315(0x28c)],TextManager['message']=function(_0x51f128){const _0x57b251=_0x508315,_0x494abd=[_0x57b251(0x6f),_0x57b251(0x1c5),_0x57b251(0xe8),_0x57b251(0x1d3),'victory',_0x57b251(0xf4),_0x57b251(0x16e),_0x57b251(0x10d),_0x57b251(0x2a0),_0x57b251(0x14f)];let _0x2517f9=VisuMZ[_0x57b251(0x128)][_0x57b251(0x14a)][_0x57b251(0x284)](this,_0x51f128);if(_0x494abd[_0x57b251(0xd3)](_0x51f128)){if(_0x57b251(0x146)===_0x57b251(0x146))_0x2517f9=_0x57b251(0x288)+_0x2517f9;else{function _0x37bd70(){const _0x41c89a=_0x57b251;if(_0x53fed2===_0x41c89a(0x25d))return this[_0x41c89a(0xd1)](_0x57ba1d,_0x22edbd,_0x4e3be8);_0x7efd8b[_0x41c89a(0x128)][_0x41c89a(0xbd)][_0x41c89a(0x284)](this,_0x3a27e0,_0x38d386,_0x14a180);}}}return _0x2517f9;},ConfigManager[_0x508315(0x25d)]=VisuMZ[_0x508315(0x128)][_0x508315(0x21f)][_0x508315(0x18b)][_0x508315(0x255)],VisuMZ[_0x508315(0x128)][_0x508315(0x17e)]=ConfigManager[_0x508315(0x1fb)],ConfigManager['makeData']=function(){const _0x2f503b=_0x508315,_0x1f107d=VisuMZ[_0x2f503b(0x128)][_0x2f503b(0x17e)][_0x2f503b(0x284)](this);return _0x1f107d[_0x2f503b(0x25d)]=this['textSpeed'],_0x1f107d;},VisuMZ[_0x508315(0x128)][_0x508315(0x2d3)]=ConfigManager['applyData'],ConfigManager['applyData']=function(_0x452028){const _0xe7b7f5=_0x508315;VisuMZ['MessageCore'][_0xe7b7f5(0x2d3)]['call'](this,_0x452028);if(_0xe7b7f5(0x25d)in _0x452028)this['textSpeed']=Number(_0x452028['textSpeed'])[_0xe7b7f5(0x20d)](0x1,0xb);else{if(_0xe7b7f5(0xea)==='XhSfY')this[_0xe7b7f5(0x25d)]=VisuMZ[_0xe7b7f5(0x128)][_0xe7b7f5(0x21f)][_0xe7b7f5(0x18b)][_0xe7b7f5(0x255)];else{function _0x27622a(){return!![];}}}},TextManager[_0x508315(0x11a)]=VisuMZ[_0x508315(0x128)][_0x508315(0x21f)][_0x508315(0x18b)][_0x508315(0xee)],TextManager[_0x508315(0x1b2)]=VisuMZ[_0x508315(0x128)][_0x508315(0x21f)]['TextSpeed'][_0x508315(0x9e)],VisuMZ['MessageCore'][_0x508315(0x1dc)]=Game_System[_0x508315(0x172)][_0x508315(0x160)],Game_System[_0x508315(0x172)][_0x508315(0x160)]=function(){const _0x1aa771=_0x508315;VisuMZ[_0x1aa771(0x128)][_0x1aa771(0x1dc)][_0x1aa771(0x284)](this),this[_0x1aa771(0x96)]();},Game_System[_0x508315(0x172)][_0x508315(0x96)]=function(){const _0xa9b97=_0x508315,_0x3cc2c4=VisuMZ[_0xa9b97(0x128)][_0xa9b97(0x21f)][_0xa9b97(0x1ab)],_0x35a278=VisuMZ[_0xa9b97(0x128)][_0xa9b97(0x21f)][_0xa9b97(0x1a8)];this[_0xa9b97(0xe3)]={'messageRows':_0x3cc2c4['MessageRows'],'messageWidth':_0x3cc2c4[_0xa9b97(0x6b)],'messageWordWrap':_0x35a278['MessageWindow'],'helpWordWrap':_0x35a278[_0xa9b97(0x289)],'choiceLineHeight':_0x3cc2c4[_0xa9b97(0x1c3)],'choiceRows':_0x3cc2c4[_0xa9b97(0xc2)],'choiceCols':_0x3cc2c4[_0xa9b97(0xaa)],'choiceTextAlign':_0x3cc2c4['ChoiceWindowTextAlign']};},Game_System[_0x508315(0x172)]['getMessageWindowRows']=function(){const _0x43b486=_0x508315;if(this[_0x43b486(0xe3)]===undefined)this['initMessageCore']();if(this[_0x43b486(0xe3)]['messageRows']===undefined)this[_0x43b486(0x96)]();return this[_0x43b486(0xe3)][_0x43b486(0x9b)];},Game_System[_0x508315(0x172)]['setMessageWindowRows']=function(_0x3b7585){const _0xa9c00f=_0x508315;if(this[_0xa9c00f(0xe3)]===undefined)this[_0xa9c00f(0x96)]();if(this['_MessageCoreSettings']['messageRows']===undefined)this['initMessageCore']();this[_0xa9c00f(0xe3)][_0xa9c00f(0x9b)]=_0x3b7585||0x1;},Game_System['prototype'][_0x508315(0xa3)]=function(){const _0x434439=_0x508315;if(this['_MessageCoreSettings']===undefined)this[_0x434439(0x96)]();if(this['_MessageCoreSettings'][_0x434439(0x69)]===undefined)this[_0x434439(0x96)]();return this[_0x434439(0xe3)]['messageWidth'];},Game_System[_0x508315(0x172)][_0x508315(0x118)]=function(_0x35d9a9){const _0x588b1c=_0x508315;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x588b1c(0xe3)][_0x588b1c(0x69)]===undefined)this[_0x588b1c(0x96)]();_0x35d9a9=Math[_0x588b1c(0x13a)](_0x35d9a9);if(_0x35d9a9%0x2!==0x0)_0x35d9a9+=0x1;this[_0x588b1c(0xe3)][_0x588b1c(0x69)]=_0x35d9a9||0x2;},Game_System[_0x508315(0x172)]['isMessageWindowWordWrap']=function(){const _0x556f06=_0x508315;if(this[_0x556f06(0xe3)]===undefined)this[_0x556f06(0x96)]();if(this[_0x556f06(0xe3)][_0x556f06(0x149)]===undefined)this[_0x556f06(0x96)]();return this[_0x556f06(0xe3)]['messageWordWrap'];},Game_System[_0x508315(0x172)][_0x508315(0x6a)]=function(_0x38c5e5){const _0x3aa57d=_0x508315;if(this[_0x3aa57d(0xe3)]===undefined)this[_0x3aa57d(0x96)]();if(this[_0x3aa57d(0xe3)][_0x3aa57d(0x149)]===undefined)this[_0x3aa57d(0x96)]();this[_0x3aa57d(0xe3)][_0x3aa57d(0x149)]=_0x38c5e5;},Game_System[_0x508315(0x172)][_0x508315(0x95)]=function(){const _0x50a6b1=_0x508315;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x50a6b1(0xe3)][_0x50a6b1(0x1ba)]===undefined)this['initMessageCore']();return this[_0x50a6b1(0xe3)][_0x50a6b1(0x1ba)];},Game_System[_0x508315(0x172)]['setHelpWindowWordWrap']=function(_0x1a85ec){const _0x2645fa=_0x508315;if(this[_0x2645fa(0xe3)]===undefined)this[_0x2645fa(0x96)]();if(this['_MessageCoreSettings'][_0x2645fa(0x1ba)]===undefined)this[_0x2645fa(0x96)]();this[_0x2645fa(0xe3)][_0x2645fa(0x1ba)]=_0x1a85ec;},Game_System['prototype'][_0x508315(0x2a6)]=function(){const _0x132e1b=_0x508315;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x132e1b(0xe3)][_0x132e1b(0x13e)]===undefined)this[_0x132e1b(0x96)]();return this[_0x132e1b(0xe3)][_0x132e1b(0x13e)];},Game_System[_0x508315(0x172)][_0x508315(0x1d2)]=function(_0xceb72c){const _0x257b31=_0x508315;if(this[_0x257b31(0xe3)]===undefined)this[_0x257b31(0x96)]();if(this['_MessageCoreSettings'][_0x257b31(0x13e)]===undefined)this['initMessageCore']();this[_0x257b31(0xe3)]['choiceLineHeight']=_0xceb72c||0x1;},Game_System[_0x508315(0x172)]['getChoiceListMaxRows']=function(){const _0x46ffdb=_0x508315;if(this['_MessageCoreSettings']===undefined)this[_0x46ffdb(0x96)]();if(this[_0x46ffdb(0xe3)]['choiceRows']===undefined)this[_0x46ffdb(0x96)]();return this['_MessageCoreSettings']['choiceRows'];},Game_System['prototype'][_0x508315(0x16a)]=function(_0x1de366){const _0x2da013=_0x508315;if(this[_0x2da013(0xe3)]===undefined)this[_0x2da013(0x96)]();if(this[_0x2da013(0xe3)]['choiceRows']===undefined)this[_0x2da013(0x96)]();this['_MessageCoreSettings'][_0x2da013(0x1a4)]=_0x1de366||0x1;},Game_System['prototype']['getChoiceListMaxColumns']=function(){const _0x55788f=_0x508315;if(this[_0x55788f(0xe3)]===undefined)this['initMessageCore']();if(this[_0x55788f(0xe3)][_0x55788f(0x239)]===undefined)this[_0x55788f(0x96)]();return this['_MessageCoreSettings'][_0x55788f(0x239)];},Game_System[_0x508315(0x172)][_0x508315(0x132)]=function(_0x255b0c){const _0xe37aff=_0x508315;if(this['_MessageCoreSettings']===undefined)this[_0xe37aff(0x96)]();if(this[_0xe37aff(0xe3)][_0xe37aff(0x239)]===undefined)this['initMessageCore']();this[_0xe37aff(0xe3)][_0xe37aff(0x239)]=_0x255b0c||0x1;},Game_System['prototype'][_0x508315(0x22d)]=function(){const _0x1a8498=_0x508315;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x1a8498(0xe3)][_0x1a8498(0x7b)]===undefined)this[_0x1a8498(0x96)]();return this['_MessageCoreSettings'][_0x1a8498(0x7b)];},Game_System['prototype'][_0x508315(0x7c)]=function(_0xbc4398){const _0x5caeb7=_0x508315;if(this[_0x5caeb7(0xe3)]===undefined)this[_0x5caeb7(0x96)]();if(this[_0x5caeb7(0xe3)][_0x5caeb7(0x7b)]===undefined)this[_0x5caeb7(0x96)]();this['_MessageCoreSettings'][_0x5caeb7(0x7b)]=_0xbc4398[_0x5caeb7(0x184)]();},VisuMZ[_0x508315(0x128)]['Game_Party_initialize']=Game_Party[_0x508315(0x172)]['initialize'],Game_Party['prototype'][_0x508315(0x160)]=function(){const _0x292bcf=_0x508315;VisuMZ['MessageCore']['Game_Party_initialize'][_0x292bcf(0x284)](this),this[_0x292bcf(0x96)]();},Game_Party['prototype'][_0x508315(0x96)]=function(){const _0x448150=_0x508315;this[_0x448150(0x10f)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party['prototype']['getLastGainedItemData']=function(){const _0x2bc561=_0x508315;if(this['_lastGainedItemData']===undefined)this[_0x2bc561(0x96)]();return this[_0x2bc561(0x10f)];},Game_Party['prototype']['setLastGainedItemData']=function(_0x1744f5,_0x357b17){const _0x533591=_0x508315;if(this[_0x533591(0x10f)]===undefined)this[_0x533591(0x96)]();if(!_0x1744f5)return;if(DataManager[_0x533591(0x201)](_0x1744f5)){if(_0x533591(0x2d0)===_0x533591(0x2d0))this['_lastGainedItemData'][_0x533591(0xb8)]=0x0;else{function _0x302b77(){const _0x35d43d=_0x533591;_0x4cb3a1[_0x35d43d(0xc5)](),_0x3d9a62['updateDimensions'](),_0x27d098['createContents']();}}}else{if(DataManager['isWeapon'](_0x1744f5))this['_lastGainedItemData'][_0x533591(0xb8)]=0x1;else DataManager[_0x533591(0x1dd)](_0x1744f5)&&(this[_0x533591(0x10f)][_0x533591(0xb8)]=0x2);}this[_0x533591(0x10f)]['id']=_0x1744f5['id'],this[_0x533591(0x10f)][_0x533591(0x2aa)]=_0x357b17;},VisuMZ[_0x508315(0x128)][_0x508315(0x207)]=Game_Party[_0x508315(0x172)][_0x508315(0x1de)],Game_Party[_0x508315(0x172)][_0x508315(0x1de)]=function(_0x2dd391,_0x454e21,_0x20b8cf){const _0x421cea=_0x508315;VisuMZ[_0x421cea(0x128)]['Game_Party_gainItem'][_0x421cea(0x284)](this,_0x2dd391,_0x454e21,_0x20b8cf),_0x454e21>0x0&&this[_0x421cea(0x1bd)](_0x2dd391,_0x454e21);},VisuMZ[_0x508315(0x128)][_0x508315(0x2b3)]=Game_Map[_0x508315(0x172)][_0x508315(0x160)],Game_Map[_0x508315(0x172)][_0x508315(0x160)]=function(){const _0x8ddae6=_0x508315;VisuMZ[_0x8ddae6(0x128)][_0x8ddae6(0x2b3)][_0x8ddae6(0x284)](this),this[_0x8ddae6(0x10b)]=[];},VisuMZ['MessageCore'][_0x508315(0x294)]=Game_Map[_0x508315(0x172)][_0x508315(0x19b)],Game_Map[_0x508315(0x172)][_0x508315(0x19b)]=function(){const _0x3beb2e=_0x508315;VisuMZ[_0x3beb2e(0x128)][_0x3beb2e(0x294)]['call'](this),this['_messageCommonEvents']=[];},VisuMZ[_0x508315(0x128)][_0x508315(0x202)]=Game_Map[_0x508315(0x172)][_0x508315(0x2d8)],Game_Map['prototype'][_0x508315(0x2d8)]=function(){const _0x2578dc=_0x508315;VisuMZ['MessageCore'][_0x2578dc(0x202)][_0x2578dc(0x284)](this),this[_0x2578dc(0x104)]();},Game_Map[_0x508315(0x172)]['addMessageCommonEvent']=function(_0x13a191){const _0x35187c=_0x508315;this[_0x35187c(0x10b)]=this[_0x35187c(0x10b)]||[];const _0x50b282=this[_0x35187c(0x22c)][_0x35187c(0x2d7)],_0x32aa54=new Game_MessageCommonEvent(_0x13a191,_0x50b282);this[_0x35187c(0x10b)][_0x35187c(0xfe)](_0x32aa54);},Game_Map[_0x508315(0x172)]['updateMessageCommonEvents']=function(){const _0x1a1901=_0x508315;this[_0x1a1901(0x10b)]=this[_0x1a1901(0x10b)]||[];for(const _0x4bd1ed of this['_messageCommonEvents']){if(!_0x4bd1ed[_0x1a1901(0x22c)]){if(_0x1a1901(0x10c)==='Fskgu'){function _0x2c0cec(){const _0xfdfa45=_0x1a1901;return this['processAutoSize'](_0x55c98c,!![],!![]),this[_0xfdfa45(0x264)](_0xfdfa45(0x203),_0x12836c(_0x1c46bc)||0x1),'';}}else this[_0x1a1901(0x10b)][_0x1a1901(0x1d0)](_0x4bd1ed);}else _0x4bd1ed['update']();}},Game_Interpreter[_0x508315(0x172)][_0x508315(0x139)]=function(_0x3a408a){const _0x5a8950=_0x508315;if($gameMessage['isBusy']())return![];return this[_0x5a8950(0x145)](_0x3a408a),this[_0x5a8950(0x12e)](_0x3a408a),this[_0x5a8950(0x2b4)](_0x3a408a),this['setWaitMode'](_0x5a8950(0x28c)),!![];},Game_Interpreter[_0x508315(0x172)][_0x508315(0x145)]=function(_0x599157){const _0x2e0d4d=_0x508315;$gameMessage['setFaceImage'](_0x599157[0x0],_0x599157[0x1]),$gameMessage['setBackground'](_0x599157[0x2]),$gameMessage[_0x2e0d4d(0x27f)](_0x599157[0x3]),$gameMessage[_0x2e0d4d(0x23c)](_0x599157[0x4]);},Game_Interpreter[_0x508315(0x172)][_0x508315(0x12e)]=function(_0x2d9e47){const _0x2d2421=_0x508315;while(this[_0x2d2421(0x80)]()){if(_0x2d2421(0x208)==='mDFmn'){this[_0x2d2421(0x64)]++;if(this[_0x2d2421(0x19e)]()[_0x2d2421(0x119)]===0x191){if(_0x2d2421(0x158)===_0x2d2421(0x158))$gameMessage[_0x2d2421(0xdb)](this[_0x2d2421(0x19e)]()['parameters'][0x0]);else{function _0x5bc4db(){const _0x18e501=_0x2d2421;for(const _0x26869a of _0x362e02['MessageCore'][_0x18e501(0x21f)][_0x18e501(0x213)]){_0x26869a['textCodeCheck']=new _0x5518b7('\x5c['+_0x26869a[_0x18e501(0x242)]+'\x5c]','gi'),_0x26869a['TextStr']!==''&&_0x26869a[_0x18e501(0x19d)]!==_0x18e501(0x1fc)?_0x26869a[_0x18e501(0x1cb)]=new _0xc92e50(_0x18e501(0x1cf)+_0x26869a[_0x18e501(0x19d)]['replace'](/\\/g,'\x1b')+'\x27'):_0x26869a[_0x18e501(0x1cb)]=_0x26869a['TextJS'];}}}}if(this[_0x2d2421(0x2cb)]())break;}else{function _0x20fd97(){const _0x5a737e=_0x2d2421;if(_0xc6b9c5[_0x5a737e(0x229)](_0x54bc4f))return![];}}}},Game_Interpreter[_0x508315(0x172)]['isContinuePrepareShowTextCommands']=function(){const _0x3ef044=_0x508315;return this[_0x3ef044(0xb5)]()===0x65&&$gameSystem[_0x3ef044(0xad)]()>0x4?!![]:this[_0x3ef044(0xb5)]()===0x191;},Game_Interpreter['prototype'][_0x508315(0x2cb)]=function(){const _0x12486b=_0x508315;return $gameMessage['_texts']['length']>=$gameSystem[_0x12486b(0xad)]()&&this[_0x12486b(0xb5)]()!==0x191;},Game_Interpreter[_0x508315(0x172)][_0x508315(0x2b4)]=function(_0x227ab1){const _0x4b8cb2=_0x508315;switch(this['nextEventCode']()){case 0x66:this[_0x4b8cb2(0x64)]++,this[_0x4b8cb2(0x292)](this[_0x4b8cb2(0x19e)]()[_0x4b8cb2(0xd0)]);break;case 0x67:this['_index']++,this[_0x4b8cb2(0x1e2)](this['currentCommand']()[_0x4b8cb2(0xd0)]);break;case 0x68:this['_index']++,this[_0x4b8cb2(0x1b6)](this['currentCommand']()[_0x4b8cb2(0xd0)]);break;}},VisuMZ[_0x508315(0x128)][_0x508315(0xed)]=Game_Interpreter[_0x508315(0x172)]['setupChoices'],Game_Interpreter[_0x508315(0x172)][_0x508315(0x292)]=function(_0x2df26c){const _0x4dc9ff=_0x508315;_0x2df26c=this[_0x4dc9ff(0x2ad)](),VisuMZ[_0x4dc9ff(0x128)][_0x4dc9ff(0xed)][_0x4dc9ff(0x284)](this,_0x2df26c);},Game_Interpreter['prototype'][_0x508315(0x2ad)]=function(){const _0x2f062b=_0x508315,_0x3c492c=this['_index'],_0x17af43=[];let _0x3195c1=0x0;this[_0x2f062b(0x64)]++;while(this['_index']<this[_0x2f062b(0x2dc)][_0x2f062b(0x100)]){if('hSSHJ'===_0x2f062b(0x113)){function _0xce0db6(){const _0x30b952=_0x2f062b;for(const _0xcb18fe of _0x220fd5[_0x30b952(0x128)][_0x30b952(0x21f)][_0x30b952(0xd7)]){_0x381375['match'](_0xcb18fe['textCodeCheck'])&&(_0xf0fcd9=_0x5dbc6e['replace'](_0xcb18fe[_0x30b952(0xeb)],_0xcb18fe[_0x30b952(0x1cb)][_0x30b952(0x81)](this)),_0x18a7ff=this[_0x30b952(0x16b)](_0x35d50d));}return _0xfe8cc5;}}else{if(this[_0x2f062b(0x19e)]()[_0x2f062b(0x235)]===this[_0x2f062b(0x68)]){if(this[_0x2f062b(0x19e)]()[_0x2f062b(0x119)]===0x194&&this[_0x2f062b(0xb5)]()!==0x66){if(_0x2f062b(0x1fa)!==_0x2f062b(0x1fa)){function _0x422d93(){const _0x42d576=_0x2f062b;this[_0x42d576(0x240)][_0x1062de]=_0x2686d4[_0xf07558];}}else break;}else{if(this['currentCommand']()[_0x2f062b(0x119)]===0x66)this[_0x2f062b(0x2a3)](_0x3195c1,this[_0x2f062b(0x19e)](),_0x3c492c),this['_index']-=0x2;else{if(this[_0x2f062b(0x19e)]()[_0x2f062b(0x119)]===0x192){if(_0x2f062b(0x27a)!==_0x2f062b(0x2cd))this[_0x2f062b(0x19e)]()[_0x2f062b(0xd0)][0x0]=_0x3195c1,_0x3195c1++;else{function _0x1232e5(){const _0x524483=_0x2f062b;_0x35fac0[_0x524483(0x128)]['Window_NameBox_updatePlacement']['call'](this),this[_0x524483(0x137)](),this[_0x524483(0x193)](),this['clampPlacementPosition'](),this[_0x524483(0x23e)]();}}}}}}this['_index']++;}}return this[_0x2f062b(0x64)]=_0x3c492c,this[_0x2f062b(0x19e)]()[_0x2f062b(0xd0)];},Game_Interpreter['prototype'][_0x508315(0x2a3)]=function(_0x31f02c,_0x10a712,_0x1b2345){const _0x5246eb=_0x508315;this[_0x5246eb(0x122)](_0x31f02c,_0x10a712,_0x1b2345),this[_0x5246eb(0xd2)](_0x31f02c,_0x10a712,_0x1b2345),this[_0x5246eb(0xd4)](_0x10a712,_0x1b2345);},Game_Interpreter[_0x508315(0x172)][_0x508315(0x122)]=function(_0x2f089e,_0x217436,_0x38ce91){const _0x7b633=_0x508315;if(_0x217436[_0x7b633(0xd0)][0x2]<0x0)return;const _0x57769d=_0x217436[_0x7b633(0xd0)][0x2]+_0x2f089e;this[_0x7b633(0x2dc)][_0x38ce91][_0x7b633(0xd0)][0x2]=_0x57769d;},Game_Interpreter[_0x508315(0x172)][_0x508315(0xd2)]=function(_0x93c27,_0x3f6b56,_0x27d539){const _0x11cd0b=_0x508315;if(_0x3f6b56[_0x11cd0b(0xd0)][0x1]>=0x0){var _0x4282f5=_0x3f6b56[_0x11cd0b(0xd0)][0x1]+_0x93c27;this[_0x11cd0b(0x2dc)][_0x27d539][_0x11cd0b(0xd0)][0x1]=_0x4282f5;}else _0x3f6b56[_0x11cd0b(0xd0)][0x1]===-0x2&&(this['_list'][_0x27d539][_0x11cd0b(0xd0)][0x1]=_0x3f6b56[_0x11cd0b(0xd0)][0x1]);},Game_Interpreter[_0x508315(0x172)][_0x508315(0xd4)]=function(_0x110291,_0x49f86b){const _0x470987=_0x508315;for(const _0x15c174 of _0x110291[_0x470987(0xd0)][0x0]){this[_0x470987(0x2dc)][_0x49f86b][_0x470987(0xd0)][0x0][_0x470987(0xfe)](_0x15c174);}this['_list']['splice'](this['_index']-0x1,0x2);};function Game_MessageCommonEvent(){const _0x586983=_0x508315;this[_0x586983(0x160)](...arguments);}function _0x6bd9(_0x598469,_0x237983){_0x598469=_0x598469-0x64;let _0x5eec65=_0x5eec[_0x598469];return _0x5eec65;}Game_MessageCommonEvent[_0x508315(0x172)]['initialize']=function(_0x4b4ae0,_0x4a5adf){const _0x2a8d1a=_0x508315;this[_0x2a8d1a(0x1bb)]=_0x4b4ae0,this[_0x2a8d1a(0x2d7)]=_0x4a5adf||0x0,this[_0x2a8d1a(0x153)]();},Game_MessageCommonEvent[_0x508315(0x172)]['event']=function(){return $dataCommonEvents[this['_commonEventId']];},Game_MessageCommonEvent[_0x508315(0x172)]['list']=function(){return this['event']()['list'];},Game_MessageCommonEvent['prototype'][_0x508315(0x153)]=function(){const _0x408669=_0x508315;this['_interpreter']=new Game_Interpreter(),this['_interpreter'][_0x408669(0xfc)](this[_0x408669(0x18e)](),this[_0x408669(0x2d7)]);},Game_MessageCommonEvent['prototype'][_0x508315(0x246)]=function(){const _0x208de0=_0x508315;if(this['_interpreter']){if('PZzwr'===_0x208de0(0x115)){function _0x370caf(){const _0x31746d=_0x208de0,_0x49c2b0=this[_0x31746d(0xbc)](_0x57caff,0x0,0x0,0x0),_0x26a1d5=this['getPreservedFontSettings']();return _0x49c2b0[_0x31746d(0x1c7)]=![],this[_0x31746d(0x141)](![]),this[_0x31746d(0x14d)](_0x49c2b0),this['setWordWrap'](!![]),this[_0x31746d(0x215)](_0x26a1d5),{'width':_0x49c2b0[_0x31746d(0x7a)],'height':_0x49c2b0[_0x31746d(0xdd)]};}}else{if(this[_0x208de0(0x22c)][_0x208de0(0x2ae)]())this['_interpreter']['update']();else{if(_0x208de0(0x271)===_0x208de0(0x271))this[_0x208de0(0x281)]();else{function _0x11fe33(){const _0x21c8ad=_0x208de0;_0x5dc19b=_0x21c8ad(0x288)+_0x5913c6;}}}}}},Game_MessageCommonEvent['prototype'][_0x508315(0x281)]=function(){this['_interpreter']=null;},Scene_Message[_0x508315(0x172)]['messageWindowRect']=function(){const _0x190e7a=_0x508315,_0x544a59=Math[_0x190e7a(0x234)](Graphics[_0x190e7a(0x24b)],$gameSystem[_0x190e7a(0xa3)]()),_0x27a5cb=$gameSystem[_0x190e7a(0xad)](),_0x731586=this[_0x190e7a(0x274)](_0x27a5cb,![]),_0x418cb6=(Graphics['boxWidth']-_0x544a59)/0x2,_0x3ee42e=0x0;return new Rectangle(_0x418cb6,_0x3ee42e,_0x544a59,_0x731586);},VisuMZ[_0x508315(0x128)][_0x508315(0x283)]=Scene_Options[_0x508315(0x172)][_0x508315(0x2d5)],Scene_Options[_0x508315(0x172)][_0x508315(0x2d5)]=function(){const _0x11760c=_0x508315;let _0x2f43c8=VisuMZ[_0x11760c(0x128)][_0x11760c(0x283)][_0x11760c(0x284)](this);const _0x247b91=VisuMZ[_0x11760c(0x128)][_0x11760c(0x21f)];if(_0x247b91[_0x11760c(0x18b)]['AddOption']&&_0x247b91[_0x11760c(0x18b)][_0x11760c(0x19a)])_0x2f43c8++;return _0x2f43c8;},VisuMZ['MessageCore']['Window_Base_initialize']=Window_Base['prototype'][_0x508315(0x160)],Window_Base[_0x508315(0x172)][_0x508315(0x160)]=function(_0x293f1c){const _0x1064d5=_0x508315;this['initMessageCore'](_0x293f1c),VisuMZ[_0x1064d5(0x128)][_0x1064d5(0x147)][_0x1064d5(0x284)](this,_0x293f1c);},Window_Base[_0x508315(0x172)][_0x508315(0x96)]=function(_0x58790a){const _0x11f97d=_0x508315;this[_0x11f97d(0x287)](),this[_0x11f97d(0xc5)](),this[_0x11f97d(0xdc)](_0x58790a);},Window_Base[_0x508315(0x172)][_0x508315(0x287)]=function(){const _0xbeff71=_0x508315;this[_0xbeff71(0x2a5)]('default');},Window_Base[_0x508315(0x172)][_0x508315(0x2a5)]=function(_0x13be85){this['_textAlignment']=_0x13be85;},Window_Base[_0x508315(0x172)]['getTextAlignment']=function(){return this['_textAlignment'];},VisuMZ[_0x508315(0x128)][_0x508315(0xe9)]=Window_Base['prototype'][_0x508315(0x20e)],Window_Base[_0x508315(0x172)][_0x508315(0x20e)]=function(_0x559377){const _0x5c4445=_0x508315;return this[_0x5c4445(0xc5)](),VisuMZ['MessageCore']['Window_Base_textSizeEx'][_0x5c4445(0x284)](this,_0x559377);},VisuMZ[_0x508315(0x128)][_0x508315(0x27c)]=Window_Base[_0x508315(0x172)][_0x508315(0x14d)],Window_Base[_0x508315(0x172)][_0x508315(0x14d)]=function(_0x27e3e1){const _0x5575d1=_0x508315;VisuMZ['MessageCore']['Window_Base_processAllText'][_0x5575d1(0x284)](this,_0x27e3e1);if(_0x27e3e1[_0x5575d1(0x1c7)])this[_0x5575d1(0x2a5)](_0x5575d1(0xc9));},Window_Base[_0x508315(0x172)]['resetWordWrap']=function(){const _0x110ef7=_0x508315;this[_0x110ef7(0x141)](![]);},Window_Base['prototype'][_0x508315(0xba)]=function(){const _0x3caa38=_0x508315;return this[_0x3caa38(0x6d)];},Window_Base['prototype'][_0x508315(0x141)]=function(_0x2792f1){const _0x1cf789=_0x508315;return this[_0x1cf789(0x6d)]=_0x2792f1,'';},Window_Base['prototype'][_0x508315(0xdc)]=function(_0x3705d9){const _0x44efb8=_0x508315;this[_0x44efb8(0x125)]=JsonEx[_0x44efb8(0x14e)](_0x3705d9);},Window_Base[_0x508315(0x172)][_0x508315(0x73)]=function(){const _0x276726=_0x508315;this['contents'][_0x276726(0x1f6)]=$gameSystem[_0x276726(0x29f)](),this[_0x276726(0x240)][_0x276726(0x1b1)]=$gameSystem[_0x276726(0xae)](),this[_0x276726(0x240)][_0x276726(0x1bf)]=![],this[_0x276726(0x240)]['fontItalic']=![],this[_0x276726(0x1a0)]();},Window_Base['prototype'][_0x508315(0x1a0)]=function(){const _0x1851de=_0x508315;this[_0x1851de(0x92)](ColorManager[_0x1851de(0x11f)]()),this[_0x1851de(0x1c8)](ColorManager['outlineColor']());const _0x3d20e2=VisuMZ[_0x1851de(0x128)][_0x1851de(0x21f)][_0x1851de(0x1ab)];_0x3d20e2[_0x1851de(0x8f)]===undefined&&(_0x3d20e2[_0x1851de(0x8f)]=0x3),this[_0x1851de(0x240)][_0x1851de(0x1ac)]=_0x3d20e2['DefaultOutlineWidth'],this['setColorLock'](![]);},Window_Base[_0x508315(0x172)][_0x508315(0x21d)]=function(_0x2c3a42){const _0x2a091f=_0x508315;this[_0x2a091f(0x2bb)]=_0x2c3a42;},Window_Base[_0x508315(0x172)][_0x508315(0x1fe)]=function(){return this['_colorLock'];},Window_Base[_0x508315(0x172)][_0x508315(0x28d)]=function(){return![];},Window_Base[_0x508315(0x172)][_0x508315(0x18d)]=function(){const _0x27c908=_0x508315,_0x371d8d=[_0x27c908(0x1f6),_0x27c908(0x1b1),_0x27c908(0x1bf),'fontItalic',_0x27c908(0x2b7),_0x27c908(0x173),_0x27c908(0x1ac),'paintOpacity'];let _0x38f405={};for(const _0x552170 of _0x371d8d){_0x38f405[_0x552170]=this[_0x27c908(0x240)][_0x552170];}return _0x38f405;},Window_Base[_0x508315(0x172)][_0x508315(0x215)]=function(_0x1fa1f6){const _0x4995cc=_0x508315;for(const _0x638ee6 in _0x1fa1f6){this[_0x4995cc(0x240)][_0x638ee6]=_0x1fa1f6[_0x638ee6];}},VisuMZ[_0x508315(0x128)][_0x508315(0x124)]=Window_Base[_0x508315(0x172)][_0x508315(0x246)],Window_Base[_0x508315(0x172)]['update']=function(){const _0x978721=_0x508315;VisuMZ[_0x978721(0x128)][_0x978721(0x124)]['call'](this),this[_0x978721(0x105)]();},Window_Base['prototype'][_0x508315(0x254)]=function(){return![];},Window_Base[_0x508315(0x172)][_0x508315(0x105)]=function(){const _0x44be0b=_0x508315;if(this['_moveDuration']>0x0){if(_0x44be0b(0x13f)===_0x44be0b(0x24a)){function _0xde71e6(){const _0x5a1c14=_0x44be0b;_0x377e29=_0x5a1c14(0x183)[_0x5a1c14(0xe4)](_0x2218cd,_0x2f68c8);}}else{if(this[_0x44be0b(0x254)]()){if('BNjiX'===_0x44be0b(0xd9))this['x']=this['applyMoveEasing'](this['x'],this[_0x44be0b(0x1d6)]),this['y']=this[_0x44be0b(0xe0)](this['y'],this[_0x44be0b(0x22b)]),this[_0x44be0b(0x24b)]=this[_0x44be0b(0xe0)](this[_0x44be0b(0x24b)],this[_0x44be0b(0xa8)]),this[_0x44be0b(0x257)]=this[_0x44be0b(0xe0)](this[_0x44be0b(0x257)],this[_0x44be0b(0x151)]),this['clampPlacementPosition']();else{function _0xfde5e1(){const _0xaa63be=_0x44be0b;return _0x51e2a2[_0xaa63be(0x172)][_0xaa63be(0xb1)][_0xaa63be(0x284)](this,_0x147c70);}}}this[_0x44be0b(0x21c)]--;}}},Window_Base[_0x508315(0x172)][_0x508315(0x9a)]=function(_0x5c29e1,_0x5397d1){const _0x293b52=_0x508315;if(!_0x5c29e1){if(_0x293b52(0x2c4)===_0x293b52(0xc0)){function _0x4325a3(){const _0x99bec0=_0x293b52,_0x421244=this[_0x99bec0(0x25f)](_0x2d6d43)[_0x99bec0(0x129)](',');if(!_0x4c777e['drawing'])return;const _0x17c3b8=_0x421244[0x0][_0x99bec0(0x89)](),_0x4caefb=_0x421244[0x1]||0x0,_0x4807c1=_0x421244[0x2]||0x0,_0x33f910=_0x3b65fb[_0x99bec0(0x121)](_0x17c3b8),_0xbf0c16=this[_0x99bec0(0x240)]['paintOpacity'];_0x33f910[_0x99bec0(0x2a8)](this[_0x99bec0(0x7e)]['bind'](this,_0x33f910,_0x1d999b['x'],_0x5cb653['y'],_0x4caefb,_0x4807c1,_0xbf0c16));}}else this[_0x293b52(0x24b)]=Math[_0x293b52(0x234)](this['width'],Graphics[_0x293b52(0x24b)]),this[_0x293b52(0x257)]=Math[_0x293b52(0x234)](this[_0x293b52(0x257)],Graphics[_0x293b52(0x257)]);}if(!_0x5397d1){if(_0x293b52(0x26a)===_0x293b52(0x26a)){const _0x5a7c61=-(Math['floor'](Graphics['width']-Graphics[_0x293b52(0x152)])/0x2),_0x2fc2d2=_0x5a7c61+Graphics[_0x293b52(0x24b)]-this['width'],_0x40c899=-(Math[_0x293b52(0xb2)](Graphics[_0x293b52(0x257)]-Graphics['boxHeight'])/0x2),_0x44de89=_0x40c899+Graphics[_0x293b52(0x257)]-this['height'];this['x']=this['x'][_0x293b52(0x20d)](_0x5a7c61,_0x2fc2d2),this['y']=this['y'][_0x293b52(0x20d)](_0x40c899,_0x44de89);}else{function _0x290c8b(){const _0x27dfe6=_0x293b52;this[_0x27dfe6(0x204)]=[];}}}},Window_Base[_0x508315(0x172)]['applyMoveEasing']=function(_0x57fa0c,_0x352ac5){const _0x58869f=_0x508315,_0x10e3ab=this[_0x58869f(0x21c)],_0x14b662=this[_0x58869f(0x217)],_0x97aaae=this[_0x58869f(0x2de)]((_0x14b662-_0x10e3ab)/_0x14b662),_0x34bcff=this[_0x58869f(0x2de)]((_0x14b662-_0x10e3ab+0x1)/_0x14b662),_0x19b4f0=(_0x57fa0c-_0x352ac5*_0x97aaae)/(0x1-_0x97aaae);return _0x19b4f0+(_0x352ac5-_0x19b4f0)*_0x34bcff;},Window_Base[_0x508315(0x172)][_0x508315(0x2de)]=function(_0x435823){const _0x1bdb6a=_0x508315,_0x10d4ec=0x2;switch(this[_0x1bdb6a(0x295)]){case 0x0:return _0x435823;case 0x1:return this[_0x1bdb6a(0xbe)](_0x435823,_0x10d4ec);case 0x2:return this[_0x1bdb6a(0x10a)](_0x435823,_0x10d4ec);case 0x3:return this['easeInOut'](_0x435823,_0x10d4ec);default:if(Imported['VisuMZ_0_CoreEngine']){if(_0x1bdb6a(0x1b7)===_0x1bdb6a(0x1b7))return VisuMZ['applyMoveEasing'](_0x435823,this[_0x1bdb6a(0x295)]);else{function _0x39963a(){const _0x1fc629=_0x1bdb6a,_0x2be246=_0x2becac['MessageCore'][_0x1fc629(0x21f)][_0x42bfc7];_0x2be246[_0x1fc629(0x226)]((_0x16fc1d,_0x5acb5c)=>{const _0x2fd896=_0x1fc629;if(!_0x16fc1d||!_0x5acb5c)return-0x1;return _0x5acb5c[_0x2fd896(0x242)][_0x2fd896(0x100)]-_0x16fc1d[_0x2fd896(0x242)]['length'];});}}}else return _0x435823;}},Window_Base[_0x508315(0x172)]['moveTo']=function(_0x2a4f53,_0xd63d5b,_0x333548,_0x1d2e38,_0x45ae2b,_0x4d32f6){const _0x5c2497=_0x508315;this[_0x5c2497(0x1d6)]=_0x2a4f53,this[_0x5c2497(0x22b)]=_0xd63d5b,this[_0x5c2497(0xa8)]=_0x333548||this['width'],this[_0x5c2497(0x151)]=_0x1d2e38||this[_0x5c2497(0x257)],this[_0x5c2497(0x21c)]=_0x45ae2b||0x1;if(this[_0x5c2497(0x21c)]<=0x0)this[_0x5c2497(0x21c)]=0x1;this[_0x5c2497(0x217)]=this[_0x5c2497(0x21c)],this['_moveEasingType']=_0x4d32f6||0x0;if(_0x45ae2b<=0x0)this['updateMove']();},Window_Base[_0x508315(0x172)][_0x508315(0x210)]=function(_0x4f9e36,_0x55b53d,_0x47734c,_0x339040,_0x4c0b27,_0x494cc5){const _0x4563d5=_0x508315;this[_0x4563d5(0x1d6)]=this['x']+_0x4f9e36,this['_moveTargetY']=this['y']+_0x55b53d,this[_0x4563d5(0xa8)]=this['width']+(_0x47734c||0x0),this['_moveTargetHeight']=this['height']+(_0x339040||0x0),this[_0x4563d5(0x21c)]=_0x4c0b27||0x1;if(this[_0x4563d5(0x21c)]<=0x0)this[_0x4563d5(0x21c)]=0x1;this[_0x4563d5(0x217)]=this[_0x4563d5(0x21c)],this[_0x4563d5(0x295)]=_0x494cc5||0x0;if(_0x4c0b27<=0x0)this['updateMove']();},Window_Base[_0x508315(0x172)][_0x508315(0x179)]=function(_0x5b08d6,_0x42f00f){const _0x14627f=_0x508315;this[_0x14627f(0x277)](this[_0x14627f(0x125)]['x'],this[_0x14627f(0x125)]['y'],this[_0x14627f(0x125)][_0x14627f(0x24b)],this[_0x14627f(0x125)][_0x14627f(0x257)],_0x5b08d6,_0x42f00f);},VisuMZ[_0x508315(0x128)][_0x508315(0x1b9)]=Window_Base[_0x508315(0x172)][_0x508315(0x92)],Window_Base[_0x508315(0x172)]['changeTextColor']=function(_0x9db826){const _0x581f0f=_0x508315;if(this['isColorLocked']())return;_0x9db826=_0x9db826[_0x581f0f(0x135)](/\,/g,''),this['_textColorStack']=this['_textColorStack']||[],this[_0x581f0f(0xf6)][_0x581f0f(0x25a)](this['contents'][_0x581f0f(0x2b7)]),VisuMZ[_0x581f0f(0x128)][_0x581f0f(0x1b9)][_0x581f0f(0x284)](this,_0x9db826);},Window_Base[_0x508315(0x172)][_0x508315(0x219)]=function(_0x28f057){const _0x554e9b=_0x508315;this['obtainEscapeParam'](_0x28f057);if(this['isColorLocked']())return;if(_0x28f057[_0x554e9b(0x1c7)]){if(_0x554e9b(0x2bf)===_0x554e9b(0x99)){function _0x2ddcc1(){const _0x513650=_0x554e9b;_0x152a4f[_0x513650(0x246)]();}}else this[_0x554e9b(0xf6)]=this['_textColorStack']||[],this['contents'][_0x554e9b(0x2b7)]=this[_0x554e9b(0xf6)][_0x554e9b(0x168)]()||ColorManager['normalColor']();}},Window_Base[_0x508315(0x172)]['convertEscapeCharacters']=function(_0x44fd85){const _0x42df31=_0x508315;return _0x44fd85=this[_0x42df31(0x7f)](_0x44fd85),_0x44fd85=this[_0x42df31(0x238)](_0x44fd85),_0x44fd85=this[_0x42df31(0x16b)](_0x44fd85),_0x44fd85=this[_0x42df31(0x2a1)](_0x44fd85),_0x44fd85=this[_0x42df31(0x1ad)](_0x44fd85),_0x44fd85=this['convertFontSettingsEscapeCharacters'](_0x44fd85),_0x44fd85=this[_0x42df31(0x1e5)](_0x44fd85),_0x44fd85=this[_0x42df31(0x256)](_0x44fd85),_0x44fd85=this[_0x42df31(0x23f)](_0x44fd85),_0x44fd85=this[_0x42df31(0x260)](_0x44fd85),_0x44fd85=this[_0x42df31(0x14c)](_0x44fd85),_0x44fd85=this[_0x42df31(0xb1)](_0x44fd85),_0x44fd85=this[_0x42df31(0x16b)](_0x44fd85),_0x44fd85=this[_0x42df31(0xc1)](_0x44fd85),_0x44fd85=this[_0x42df31(0x17f)](_0x44fd85),_0x44fd85;},Window_Base[_0x508315(0x172)][_0x508315(0x7f)]=function(_0x20371b){const _0x148cca=_0x508315;for(const _0x3ea255 of VisuMZ[_0x148cca(0x128)][_0x148cca(0x21f)][_0x148cca(0x213)]){if('Tgftr'===_0x148cca(0x101)){function _0x3e647b(){const _0x6f8c96=_0x148cca;return this[_0x6f8c96(0x1bc)]&&this[_0x6f8c96(0x1bc)][_0x6f8c96(0x1be)]===_0x3e40c4;}}else _0x20371b[_0x148cca(0x136)](_0x3ea255[_0x148cca(0xeb)])&&(_0x20371b=_0x20371b[_0x148cca(0x135)](_0x3ea255[_0x148cca(0xeb)],_0x3ea255['textCodeResult'][_0x148cca(0x81)](this)));}return _0x20371b;},Window_Base[_0x508315(0x172)][_0x508315(0x238)]=function(_0x39cbd5){const _0x3d20b9=_0x508315;return _0x39cbd5=_0x39cbd5['replace'](/\\/g,'\x1b'),_0x39cbd5=_0x39cbd5[_0x3d20b9(0x135)](/\x1b\x1b/g,'\x5c'),_0x39cbd5;},Window_Base[_0x508315(0x172)][_0x508315(0x16b)]=function(_0x10600f){const _0x4e1a01=_0x508315;for(;;){if(_0x4e1a01(0xcb)===_0x4e1a01(0x16f)){function _0x16dffd(){const _0xe92ca3=_0x4e1a01;this['adjustShowChoiceExtension'](_0x2f2cdb,this[_0xe92ca3(0x19e)](),_0x1b4d79),this[_0xe92ca3(0x64)]-=0x2;}}else{if(_0x10600f[_0x4e1a01(0x136)](/\\V\[(\d+)\]/gi)){if(_0x4e1a01(0xb7)!==_0x4e1a01(0xb7)){function _0x4896fb(){const _0x355080=_0x4e1a01;_0x3677b3[_0x355080(0x128)][_0x355080(0x2d3)]['call'](this,_0x485af5),_0x355080(0x25d)in _0x41a1b9?this['textSpeed']=_0x357b6b(_0x268cba[_0x355080(0x25d)])[_0x355080(0x20d)](0x1,0xb):this[_0x355080(0x25d)]=_0x5161f3[_0x355080(0x128)][_0x355080(0x21f)]['TextSpeed'][_0x355080(0x255)];}}else _0x10600f=_0x10600f[_0x4e1a01(0x135)](/\\V\[(\d+)\]/gi,(_0x146bdf,_0x4278b1)=>this[_0x4e1a01(0x238)](String($gameVariables[_0x4e1a01(0x229)](parseInt(_0x4278b1)))));}else{if(_0x10600f['match'](/\x1bV\[(\d+)\]/gi))_0x10600f=_0x10600f[_0x4e1a01(0x135)](/\x1bV\[(\d+)\]/gi,(_0x3fd8da,_0x1fb728)=>this[_0x4e1a01(0x238)](String($gameVariables[_0x4e1a01(0x229)](parseInt(_0x1fb728)))));else{if(_0x4e1a01(0x227)!==_0x4e1a01(0x227)){function _0x5e566c(){const _0x32425d=_0x4e1a01;if(this[_0x32425d(0xe3)]===_0xc5ce15)this['initMessageCore']();if(this[_0x32425d(0xe3)][_0x32425d(0x1ba)]===_0x491297)this[_0x32425d(0x96)]();return this['_MessageCoreSettings']['helpWordWrap'];}}else break;}}}}return _0x10600f;},Window_Base[_0x508315(0x172)][_0x508315(0x2a1)]=function(_0x59db4e){const _0x16ef4c=_0x508315;return this[_0x16ef4c(0x13c)](),_0x59db4e;},Window_Base[_0x508315(0x172)][_0x508315(0xb1)]=function(_0x57b7ff){return _0x57b7ff;},Window_Base[_0x508315(0x172)][_0x508315(0x1ad)]=function(_0x2b7ec4){const _0x5d4c25=_0x508315;return _0x2b7ec4=_0x2b7ec4['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x2b7ec4=_0x2b7ec4[_0x5d4c25(0x135)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x2b7ec4=_0x2b7ec4[_0x5d4c25(0x135)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x2b7ec4;},Window_Base[_0x508315(0x172)][_0x508315(0x74)]=function(_0x97ef5){const _0x3b0301=_0x508315;return _0x97ef5=_0x97ef5[_0x3b0301(0x135)](/<B>/gi,_0x3b0301(0xe7)),_0x97ef5=_0x97ef5['replace'](/<\/B>/gi,_0x3b0301(0x1b4)),_0x97ef5=_0x97ef5[_0x3b0301(0x135)](/<I>/gi,_0x3b0301(0x2c8)),_0x97ef5=_0x97ef5['replace'](/<\/I>/gi,_0x3b0301(0x2dd)),_0x97ef5;},Window_Base[_0x508315(0x172)][_0x508315(0x1e5)]=function(_0x10d838){const _0x2ade5b=_0x508315;return _0x10d838=_0x10d838['replace'](/<LEFT>/gi,_0x2ade5b(0xa0)),_0x10d838=_0x10d838[_0x2ade5b(0x135)](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x10d838=_0x10d838[_0x2ade5b(0x135)](/<CENTER>/gi,_0x2ade5b(0x192)),_0x10d838=_0x10d838[_0x2ade5b(0x135)](/<\/CENTER>/gi,_0x2ade5b(0x251)),_0x10d838=_0x10d838['replace'](/<RIGHT>/gi,'\x1bTEXTALIGNMENT[3]'),_0x10d838=_0x10d838[_0x2ade5b(0x135)](/<\/RIGHT>/gi,_0x2ade5b(0x251)),_0x10d838;},Window_Base['prototype'][_0x508315(0x256)]=function(_0x10ba47){const _0x39e32d=_0x508315;return _0x10ba47=_0x10ba47['replace'](/<COLORLOCK>/gi,'\x1bCOLORLOCK[1]'),_0x10ba47=_0x10ba47[_0x39e32d(0x135)](/<\/COLORLOCK>/gi,'\x1bCOLORLOCK[0]'),_0x10ba47=_0x10ba47['replace'](/\(\(\(/gi,_0x39e32d(0x1b0)),_0x10ba47=_0x10ba47[_0x39e32d(0x135)](/\)\)\)/gi,_0x39e32d(0x1cc)),_0x10ba47;},Window_Base['prototype'][_0x508315(0x23f)]=function(_0x24833c){const _0x327680=_0x508315;return _0x24833c=_0x24833c['replace'](/\x1bN\[(\d+)\]/gi,(_0x594806,_0x127e84)=>this[_0x327680(0x98)](parseInt(_0x127e84))),_0x24833c=_0x24833c[_0x327680(0x135)](/\x1bP\[(\d+)\]/gi,(_0x21206b,_0xa15f83)=>this['partyMemberName'](parseInt(_0xa15f83))),_0x24833c=_0x24833c[_0x327680(0x135)](/\x1bG/gi,TextManager[_0x327680(0xf2)]),_0x24833c;},Window_Base[_0x508315(0x172)]['convertMessageCoreEscapeActions']=function(_0x255fab){const _0x553116=_0x508315;for(const _0x9e9e2d of VisuMZ[_0x553116(0x128)][_0x553116(0x21f)][_0x553116(0x272)]){if(_0x255fab['match'](_0x9e9e2d[_0x553116(0xeb)])){if(_0x553116(0x2b2)===_0x553116(0x2b2))_0x255fab=_0x255fab[_0x553116(0x135)](_0x9e9e2d[_0x553116(0xeb)],_0x9e9e2d['textCodeResult']),_0x255fab=this[_0x553116(0x16b)](_0x255fab);else{function _0x4a3e43(){const _0x142d65=_0x45ade4['MessageCore']['ConfigManager_makeData']['call'](this);return _0x142d65['textSpeed']=this['textSpeed'],_0x142d65;}}}}return _0x255fab;},Window_Base['prototype'][_0x508315(0x14c)]=function(_0x1d73b2){const _0x4c20a0=_0x508315;for(const _0x101994 of VisuMZ[_0x4c20a0(0x128)]['Settings'][_0x4c20a0(0xd7)]){if(_0x1d73b2[_0x4c20a0(0x136)](_0x101994[_0x4c20a0(0xeb)])){if(_0x4c20a0(0x1a7)!==_0x4c20a0(0x1a7)){function _0x546549(){const _0x1ddc97=_0x4c20a0;this[_0x1ddc97(0x2bc)](_0x3208c3),_0x2602ee[_0x1ddc97(0x128)][_0x1ddc97(0x280)][_0x1ddc97(0x284)](this,_0x181c5e),this[_0x1ddc97(0x1b8)]();}}else _0x1d73b2=_0x1d73b2[_0x4c20a0(0x135)](_0x101994[_0x4c20a0(0xeb)],_0x101994[_0x4c20a0(0x1cb)][_0x4c20a0(0x81)](this)),_0x1d73b2=this['convertVariableEscapeCharacters'](_0x1d73b2);}}return _0x1d73b2;},Window_Base['prototype']['actorName']=function(_0xf226b6){const _0x11f7d7=_0x508315,_0x1c4482=_0xf226b6>=0x1?$gameActors[_0x11f7d7(0x17c)](_0xf226b6):null,_0x294b8e=_0x1c4482?_0x1c4482[_0x11f7d7(0x1c2)]():'',_0x3afcaf=Number(VisuMZ[_0x11f7d7(0x128)][_0x11f7d7(0x21f)][_0x11f7d7(0x174)]['Actors']);return this[_0x11f7d7(0x28d)]()&&_0x3afcaf!==0x0?_0x11f7d7(0x183)[_0x11f7d7(0xe4)](_0x3afcaf,_0x294b8e):_0x294b8e;},Window_Base[_0x508315(0x172)][_0x508315(0x282)]=function(_0x3a05f5){const _0x210aa1=_0x508315,_0x7c71d3=_0x3a05f5>=0x1?$gameParty[_0x210aa1(0x156)]()[_0x3a05f5-0x1]:null,_0x167c41=_0x7c71d3?_0x7c71d3[_0x210aa1(0x1c2)]():'',_0x398163=Number(VisuMZ['MessageCore'][_0x210aa1(0x21f)][_0x210aa1(0x174)][_0x210aa1(0x1c0)]);return this['isAutoColorAffected']()&&_0x398163!==0x0?_0x210aa1(0x183)[_0x210aa1(0xe4)](_0x398163,_0x167c41):_0x167c41;},Window_Base[_0x508315(0x172)][_0x508315(0xc1)]=function(_0x3bcd9a){const _0x398547=_0x508315;if(this['isAutoColorAffected']()){if('LbYIS'!==_0x398547(0x181)){function _0x49097a(){const _0x2b920b=_0x398547;return this[_0x2b920b(0x6d)]=_0x574d09,'';}}else _0x3bcd9a=this[_0x398547(0x261)](_0x3bcd9a),_0x3bcd9a=this[_0x398547(0x187)](_0x3bcd9a);}return _0x3bcd9a;},Window_Base['prototype'][_0x508315(0x261)]=function(_0x4ca710){const _0x534b58=_0x508315;for(autoColor of VisuMZ[_0x534b58(0x128)][_0x534b58(0xb0)]){_0x4ca710=_0x4ca710[_0x534b58(0x135)](autoColor[0x0],autoColor[0x1]);}return _0x4ca710;},Window_Base[_0x508315(0x172)]['clearActorNameAutoColor']=function(){const _0x1f79a4=_0x508315;this[_0x1f79a4(0x204)]=[];},Window_Base[_0x508315(0x172)][_0x508315(0x13c)]=function(){const _0x4c67e0=_0x508315;this[_0x4c67e0(0x85)]();const _0x23f569=VisuMZ[_0x4c67e0(0x128)][_0x4c67e0(0x21f)]['AutoColor'],_0x5eadb7=_0x23f569[_0x4c67e0(0x1c0)];if(_0x5eadb7<=0x0)return;for(const _0x15d608 of $gameActors[_0x4c67e0(0x12b)]){if('YPAWv'===_0x4c67e0(0x223)){if(!_0x15d608)continue;const _0x5933bc=_0x15d608[_0x4c67e0(0x1c2)]();if(_0x5933bc[_0x4c67e0(0x89)]()['length']<=0x0)continue;if(/^\d+$/[_0x4c67e0(0x2c1)](_0x5933bc))continue;if(_0x5933bc[_0x4c67e0(0x136)](/-----/i))continue;let _0x10a047=VisuMZ[_0x4c67e0(0x128)]['ConvertTextAutoColorRegExpFriendly'](_0x5933bc);const _0x1bb558=new RegExp('\x5cb'+_0x10a047+'\x5cb','g'),_0x1bafcf=_0x4c67e0(0x183)[_0x4c67e0(0xe4)](_0x5eadb7,_0x5933bc);this['_autoColorActorNames'][_0x4c67e0(0xfe)]([_0x1bb558,_0x1bafcf]);}else{function _0x21e4dc(){return this['_colorLock'];}}}},Window_Base['prototype']['processActorNameAutoColorChanges']=function(_0x2ba39d){const _0x83eff4=_0x508315;this['_autoColorActorNames']===undefined&&this[_0x83eff4(0x13c)]();for(autoColor of this[_0x83eff4(0x204)]){_0x2ba39d=_0x2ba39d[_0x83eff4(0x135)](autoColor[0x0],autoColor[0x1]);}return _0x2ba39d;},Window_Base[_0x508315(0x172)][_0x508315(0x222)]=function(_0x4211ae,_0x587f8c,_0x4b9777){const _0x56a11b=_0x508315;if(!_0x4211ae)return'';const _0x1b6893=_0x4211ae[_0x587f8c];let _0x8c4541='';if(_0x1b6893&&_0x4b9777&&_0x1b6893[_0x56a11b(0x144)]){const _0x543476=_0x56a11b(0x165);_0x8c4541=_0x543476['format'](_0x1b6893[_0x56a11b(0x144)],_0x1b6893['name']);}else _0x1b6893?_0x8c4541=_0x1b6893[_0x56a11b(0x1c2)]:_0x8c4541='';return this[_0x56a11b(0x28d)]()&&(_0x8c4541=this[_0x56a11b(0x2d1)](_0x8c4541,_0x4211ae)),_0x8c4541;},Window_Base[_0x508315(0x172)]['lastGainedObjectName']=function(_0x5466f6){const _0x33671f=_0x508315,_0x34b837=$gameParty[_0x33671f(0x21a)]();if(_0x34b837['id']<0x0)return'';let _0x210ea0=null;if(_0x34b837[_0x33671f(0xb8)]===0x0)_0x210ea0=$dataItems[_0x34b837['id']];if(_0x34b837[_0x33671f(0xb8)]===0x1)_0x210ea0=$dataWeapons[_0x34b837['id']];if(_0x34b837[_0x33671f(0xb8)]===0x2)_0x210ea0=$dataArmors[_0x34b837['id']];if(!_0x210ea0)return'';return _0x5466f6?_0x33671f(0x165)[_0x33671f(0xe4)](_0x210ea0[_0x33671f(0x144)],_0x210ea0[_0x33671f(0x1c2)]):_0x210ea0[_0x33671f(0x1c2)];},Window_Base[_0x508315(0x172)]['lastGainedObjectQuantity']=function(){const _0x212ed9=_0x508315,_0x1a926b=$gameParty[_0x212ed9(0x21a)]();if(_0x1a926b['id']<=0x0)return'';return _0x1a926b[_0x212ed9(0x2aa)];},Window_Base[_0x508315(0x172)]['applyDatabaseAutoColor']=function(_0x362b96,_0x140c2e){const _0x22d242=_0x508315,_0x50589f=VisuMZ[_0x22d242(0x128)]['Settings'][_0x22d242(0x174)];let _0x31afdf=0x0;if(_0x140c2e===$dataActors)_0x31afdf=_0x50589f['Actors'];if(_0x140c2e===$dataClasses)_0x31afdf=_0x50589f['Classes'];if(_0x140c2e===$dataSkills)_0x31afdf=_0x50589f['Skills'];if(_0x140c2e===$dataItems)_0x31afdf=_0x50589f[_0x22d242(0x17d)];if(_0x140c2e===$dataWeapons)_0x31afdf=_0x50589f[_0x22d242(0xd5)];if(_0x140c2e===$dataArmors)_0x31afdf=_0x50589f['Armors'];if(_0x140c2e===$dataEnemies)_0x31afdf=_0x50589f['Enemies'];if(_0x140c2e===$dataStates)_0x31afdf=_0x50589f[_0x22d242(0x94)];return _0x31afdf>0x0&&(_0x362b96=_0x22d242(0x183)[_0x22d242(0xe4)](_0x31afdf,_0x362b96)),_0x362b96;},Window_Base['prototype'][_0x508315(0x17f)]=function(_0x46c847){const _0x38e9b8=_0x508315;_0x46c847=_0x46c847[_0x38e9b8(0x135)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x223af2,_0x4c36bc)=>this[_0x38e9b8(0x141)](!![])),_0x46c847=_0x46c847['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x17a82f,_0x4a959f)=>this['setWordWrap'](![])),_0x46c847=_0x46c847['replace'](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x3274e8,_0x4cd9b6)=>this[_0x38e9b8(0x141)](![]));if(_0x46c847[_0x38e9b8(0x136)](Window_Message[_0x38e9b8(0x18a)]))this[_0x38e9b8(0x141)](![]);else _0x46c847[_0x38e9b8(0x136)](Window_Message[_0x38e9b8(0x2ba)])&&this['setWordWrap'](![]);if(!this[_0x38e9b8(0xba)]())return _0x46c847;if(_0x46c847[_0x38e9b8(0x100)]<=0x0)return _0x46c847;if(VisuMZ['MessageCore'][_0x38e9b8(0x21f)][_0x38e9b8(0x1a8)][_0x38e9b8(0x2d9)]){if(_0x38e9b8(0xe6)!=='pUXnN'){function _0x2c7aeb(){const _0x22fb2a=_0x38e9b8;_0xdb96f4['prototype'][_0x22fb2a(0x107)][_0x22fb2a(0x284)](this),_0x3baf66['MessageCore'][_0x22fb2a(0x21f)][_0x22fb2a(0x1ab)][_0x22fb2a(0x278)]&&this[_0x22fb2a(0x248)]();}}else _0x46c847=_0x46c847[_0x38e9b8(0x135)](/[\n\r]+/g,'\x20'),_0x46c847=_0x46c847['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a');}else{if(_0x38e9b8(0x1f2)!==_0x38e9b8(0x1f2)){function _0x281a18(){const _0x4b7c98=_0x38e9b8,_0x222837=_0x558cde['name'],_0x3a4c81=this['textSizeEx'](_0x222837)[_0x4b7c98(0x24b)],_0x565124=_0x4fcf72['ceil'](_0x3a4c81)+this[_0x4b7c98(0x1db)]()*0x2;_0x51d8c8<_0x565124&&(_0x2901fa=_0x565124);}}else _0x46c847=_0x46c847[_0x38e9b8(0x135)](/[\n\r]+/g,''),_0x46c847=_0x46c847[_0x38e9b8(0x135)](/<(?:BR|LINEBREAK)>/gi,'\x0a');}return _0x46c847=this[_0x38e9b8(0x93)](_0x46c847),_0x46c847=_0x46c847[_0x38e9b8(0x129)]('\x20')[_0x38e9b8(0xf1)](_0x38e9b8(0x199)),_0x46c847=_0x46c847['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x46c847=_0x46c847['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x46c847;},Window_Base[_0x508315(0x172)][_0x508315(0x93)]=function(_0x1f05f5){return _0x1f05f5;},VisuMZ['MessageCore'][_0x508315(0x1ed)]=Window_Base[_0x508315(0x172)][_0x508315(0x197)],Window_Base[_0x508315(0x172)][_0x508315(0x197)]=function(_0x5e6477){const _0x51683f=_0x508315;VisuMZ[_0x51683f(0x128)][_0x51683f(0x1ed)]['call'](this,_0x5e6477),this[_0x51683f(0x273)](_0x5e6477);},VisuMZ[_0x508315(0x128)][_0x508315(0x17a)]=Window_Base['prototype'][_0x508315(0x250)],Window_Base[_0x508315(0x172)][_0x508315(0x250)]=function(_0x46b8cd,_0x497a3a){const _0x2f5f26=_0x508315;VisuMZ[_0x2f5f26(0x128)]['Window_Base_processControlCharacter'][_0x2f5f26(0x284)](this,_0x46b8cd,_0x497a3a),_0x497a3a===_0x2f5f26(0x199)&&this[_0x2f5f26(0x1a5)](_0x46b8cd);},Window_Base[_0x508315(0x172)]['obtainEscapeString']=function(_0x40c560){const _0x264975=_0x508315;var _0x1a00fc=/^\<(.*?)\>/[_0x264975(0xf0)](_0x40c560['text']['slice'](_0x40c560[_0x264975(0x1ec)]));return _0x1a00fc?(_0x40c560[_0x264975(0x1ec)]+=_0x1a00fc[0x0][_0x264975(0x100)],String(_0x1a00fc[0x0][_0x264975(0x2a4)](0x1,_0x1a00fc[0x0][_0x264975(0x100)]-0x1))):'';},VisuMZ[_0x508315(0x128)][_0x508315(0x155)]=Window_Base[_0x508315(0x172)][_0x508315(0x1d9)],Window_Base[_0x508315(0x172)][_0x508315(0x1d9)]=function(_0x4b6126,_0x21ab7e){const _0x25976e=_0x508315;switch(_0x4b6126){case'C':if(_0x21ab7e[_0x25976e(0x1c7)])VisuMZ['MessageCore'][_0x25976e(0x155)][_0x25976e(0x284)](this,_0x4b6126,_0x21ab7e);else{if(_0x25976e(0x198)!==_0x25976e(0x198)){function _0x1a5733(){const _0x1dc5b5=_0x25976e;this[_0x1dc5b5(0x2dc)][_0x1f40b1][_0x1dc5b5(0xd0)][0x1]=_0x570463[_0x1dc5b5(0xd0)][0x1];}}else this[_0x25976e(0x224)](_0x21ab7e);}break;case'I':case'{':case'}':VisuMZ[_0x25976e(0x128)][_0x25976e(0x155)][_0x25976e(0x284)](this,_0x4b6126,_0x21ab7e);break;case'FS':this['processFsTextCode'](_0x21ab7e);break;case'PX':this[_0x25976e(0x2b8)](_0x21ab7e);break;case'PY':this[_0x25976e(0x1d5)](_0x21ab7e);break;case _0x25976e(0x21e):this[_0x25976e(0x91)](this['obtainEscapeParam'](_0x21ab7e));break;case _0x25976e(0x191):this[_0x25976e(0x9d)](_0x21ab7e);break;case _0x25976e(0x1a6):this['processColorLock'](_0x21ab7e);break;case _0x25976e(0x2cf):this['processCommonEvent'](_0x21ab7e);break;case _0x25976e(0x1e1):this['processFontChangeItalic'](this[_0x25976e(0x224)](_0x21ab7e));break;case _0x25976e(0xa4):this[_0x25976e(0x28e)](_0x21ab7e);break;case _0x25976e(0x67):this[_0x25976e(0x219)](_0x21ab7e);break;case _0x25976e(0x20a):this['processTextAlignmentChange'](_0x21ab7e);break;case _0x25976e(0x244):this[_0x25976e(0x24d)](_0x21ab7e);break;case'WRAPBREAK':this[_0x25976e(0x1a5)](_0x21ab7e);break;default:this[_0x25976e(0x230)](_0x4b6126,_0x21ab7e);}},Window_Base[_0x508315(0x172)][_0x508315(0x230)]=function(_0x2c3dee,_0x5f083e){const _0x406fd0=_0x508315;for(const _0x1ab852 of VisuMZ[_0x406fd0(0x128)][_0x406fd0(0x21f)][_0x406fd0(0x272)]){if(_0x1ab852['Match']===_0x2c3dee){if(_0x406fd0(0x2bd)===_0x406fd0(0x15e)){function _0x2c1e01(){const _0x293abc=_0x406fd0;_0x57a9c4=_0x350f9e['replace'](_0x5543c7[_0x293abc(0xeb)],_0x5dff35[_0x293abc(0x1cb)][_0x293abc(0x81)](this));}}else{if(_0x1ab852['Type']==='')this[_0x406fd0(0x224)](_0x5f083e);_0x1ab852[_0x406fd0(0x1b5)][_0x406fd0(0x284)](this,_0x5f083e);if(this[_0x406fd0(0x1be)]===Window_Message){if(_0x406fd0(0x82)!==_0x406fd0(0x70)){const _0x1b7bf0=_0x1ab852[_0x406fd0(0x10e)]||0x0;if(_0x1b7bf0>0x0)this['launchMessageCommonEvent'](_0x1b7bf0);}else{function _0xfd2c5c(){const _0x5a2361=_0x406fd0;this[_0x5a2361(0x1eb)](_0x16880b),this[_0x5a2361(0x196)](_0x19f2c5),this[_0x5a2361(0x86)]();}}}}}}},Window_Base[_0x508315(0x172)][_0x508315(0x29e)]=function(){const _0x59a59d=_0x508315;this['contents']['fontSize']+=VisuMZ['MessageCore']['Settings']['General'][_0x59a59d(0x11e)],this[_0x59a59d(0x240)][_0x59a59d(0x1b1)]=Math[_0x59a59d(0x234)](this[_0x59a59d(0x240)][_0x59a59d(0x1b1)],VisuMZ[_0x59a59d(0x128)][_0x59a59d(0x21f)][_0x59a59d(0x1ab)][_0x59a59d(0x120)]);},Window_Base['prototype'][_0x508315(0x9f)]=function(){const _0x2fe9c6=_0x508315;this[_0x2fe9c6(0x240)][_0x2fe9c6(0x1b1)]-=VisuMZ[_0x2fe9c6(0x128)]['Settings'][_0x2fe9c6(0x1ab)][_0x2fe9c6(0x11e)],this[_0x2fe9c6(0x240)][_0x2fe9c6(0x1b1)]=Math['max'](this[_0x2fe9c6(0x240)][_0x2fe9c6(0x1b1)],VisuMZ['MessageCore'][_0x2fe9c6(0x21f)][_0x2fe9c6(0x1ab)][_0x2fe9c6(0x170)]);},Window_Base[_0x508315(0x172)]['processFsTextCode']=function(_0x235ff6){const _0x4e9743=_0x508315,_0x296d02=this[_0x4e9743(0x224)](_0x235ff6);this['contents'][_0x4e9743(0x1b1)]=_0x296d02['clamp'](VisuMZ[_0x4e9743(0x128)][_0x4e9743(0x21f)]['General'][_0x4e9743(0x170)],VisuMZ[_0x4e9743(0x128)][_0x4e9743(0x21f)][_0x4e9743(0x1ab)][_0x4e9743(0x120)]);},Window_Base[_0x508315(0x172)][_0x508315(0x2d2)]=function(_0x114499){const _0x52b3ce=_0x508315;let _0x544c83=this[_0x52b3ce(0x240)][_0x52b3ce(0x1b1)];const _0x31007c=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x1f1efa=_0x31007c[_0x52b3ce(0xf0)](_0x114499);if(!_0x1f1efa){if(_0x52b3ce(0x176)!==_0x52b3ce(0x176)){function _0x29f37f(){const _0x56c750=_0x52b3ce,_0x496de8=(_0x13b01a[_0x56c750(0x267)]?-0x1:0x1)*this[_0x56c750(0x296)]('\x20');_0x2e99e6['x']+=_0x496de8;if(this[_0x56c750(0x224)](_0x4a3752)>0x0)_0x5aefdb['x']+=_0x496de8;if(_0x438bb4[_0x56c750(0x267)])return;let _0x27e647=_0x418fb9[_0x56c750(0x21b)]['indexOf'](_0x56c750(0x199),_0x3b9eea[_0x56c750(0x1ec)]+0x1),_0x372fa8=_0x588b1f['text'][_0x56c750(0x1ee)]('\x0a',_0x19c1ba['index']+0x1);if(_0x27e647<0x0)_0x27e647=_0xeb7cb8[_0x56c750(0x21b)][_0x56c750(0x100)]+0x1;if(_0x372fa8>0x0)_0x27e647=_0x4a0e57[_0x56c750(0x234)](_0x27e647,_0x372fa8);const _0x10347d=_0x5ac95b[_0x56c750(0x21b)][_0x56c750(0x20f)](_0x124234[_0x56c750(0x1ec)],_0x27e647),_0x5e40d0=this[_0x56c750(0x1e3)](_0x10347d)[_0x56c750(0x24b)];let _0x435bf3=_0x137d65[_0x56c750(0x24b)]||this[_0x56c750(0xd8)];if(this[_0x56c750(0x1be)]===_0x29500e){const _0x2e517a=_0x1f8992[_0x56c750(0x29a)]()===''?0x0:_0x23ffc0['faceWidth']+0x14;_0x435bf3-=_0x2e517a,_0x48cc79[_0x56c750(0x128)][_0x56c750(0x21f)][_0x56c750(0x1a8)][_0x56c750(0x28b)]&&(_0x435bf3-=_0x2e517a);}let _0x228cfe=![];if(_0x3d840c['x']+_0x5e40d0>_0x5534d3['startX']+_0x435bf3)_0x228cfe=!![];if(_0x5e40d0===0x0)_0x228cfe=!![];_0x228cfe&&(_0x314b21[_0x56c750(0x21b)]=_0x8ade95[_0x56c750(0x21b)]['slice'](0x0,_0x4593cb[_0x56c750(0x1ec)])+'\x0a'+_0x10a77f[_0x56c750(0x21b)][_0x56c750(0x111)](_0x14cab9[_0x56c750(0x1ec)]));}}else break;}const _0x362c79=String(_0x1f1efa[0x1])[_0x52b3ce(0x130)]();if(_0x362c79==='{')this['makeFontBigger']();else{if(_0x362c79==='}'){if(_0x52b3ce(0x2c5)!==_0x52b3ce(0x19f))this['makeFontSmaller']();else{function _0x4564a4(){const _0xee5019=_0x52b3ce;return _0x2d7b23[_0xee5019(0x172)]['preConvertEscapeCharacters'][_0xee5019(0x284)](this,_0x55c377);}}}else{if(_0x362c79==='FS'){if(_0x52b3ce(0xa5)!==_0x52b3ce(0xa5)){function _0x40db91(){const _0x1660ad=_0x52b3ce;if(this[_0x1660ad(0xe3)]===_0x4b26d0)this[_0x1660ad(0x96)]();if(this[_0x1660ad(0xe3)][_0x1660ad(0x7b)]===_0x43f32f)this[_0x1660ad(0x96)]();this[_0x1660ad(0xe3)][_0x1660ad(0x7b)]=_0x24077a['toLowerCase']();}}else this[_0x52b3ce(0x240)][_0x52b3ce(0x1b1)]=parseInt(_0x1f1efa[0x3])[_0x52b3ce(0x20d)](VisuMZ[_0x52b3ce(0x128)][_0x52b3ce(0x21f)][_0x52b3ce(0x1ab)][_0x52b3ce(0x170)],VisuMZ[_0x52b3ce(0x128)][_0x52b3ce(0x21f)][_0x52b3ce(0x1ab)][_0x52b3ce(0x120)]);}}}if(this[_0x52b3ce(0x240)][_0x52b3ce(0x1b1)]>_0x544c83){if(_0x52b3ce(0x177)==='EwgLT')_0x544c83=this[_0x52b3ce(0x240)][_0x52b3ce(0x1b1)];else{function _0x3025b9(){_0x29ae84=_0x5d40f0['name'];}}}}return _0x544c83;},Window_Base[_0x508315(0x172)][_0x508315(0x2b8)]=function(_0x19305a){const _0x4a0bd9=_0x508315;_0x19305a['x']=this[_0x4a0bd9(0x224)](_0x19305a),VisuMZ[_0x4a0bd9(0x128)][_0x4a0bd9(0x21f)][_0x4a0bd9(0x1ab)][_0x4a0bd9(0x6e)]&&(_0x19305a['x']+=_0x19305a[_0x4a0bd9(0x1f3)]);},Window_Base[_0x508315(0x172)][_0x508315(0x1d5)]=function(_0x321415){const _0x20ea36=_0x508315;_0x321415['y']=this[_0x20ea36(0x224)](_0x321415),VisuMZ[_0x20ea36(0x128)][_0x20ea36(0x21f)]['General'][_0x20ea36(0x6e)]&&(_0x321415['y']+=_0x321415['startY']);},Window_Base['prototype'][_0x508315(0x91)]=function(_0x20d98d){const _0x1ea11f=_0x508315;this[_0x1ea11f(0x240)][_0x1ea11f(0x1bf)]=!!_0x20d98d;},Window_Base[_0x508315(0x172)][_0x508315(0x15b)]=function(_0x5dcdf3){const _0x427da0=_0x508315;this[_0x427da0(0x240)][_0x427da0(0xfb)]=!!_0x5dcdf3;},Window_Base[_0x508315(0x172)]['processTextAlignmentChange']=function(_0x49f1a3){const _0x4ec0dc=_0x508315,_0x385c53=this[_0x4ec0dc(0x224)](_0x49f1a3);if(!_0x49f1a3[_0x4ec0dc(0x1c7)])return;switch(_0x385c53){case 0x0:this['setTextAlignment'](_0x4ec0dc(0xc9));return;case 0x1:this[_0x4ec0dc(0x2a5)]('left');break;case 0x2:this[_0x4ec0dc(0x2a5)]('center');break;case 0x3:this[_0x4ec0dc(0x2a5)](_0x4ec0dc(0x12c));break;}this[_0x4ec0dc(0x273)](_0x49f1a3);},Window_Base[_0x508315(0x172)]['processTextAlignmentX']=function(_0xa7d1f6){const _0x58623e=_0x508315;if(!_0xa7d1f6[_0x58623e(0x1c7)])return;if(_0xa7d1f6[_0x58623e(0x267)])return;if(this['getTextAlignment']()==='default')return;let _0x58fc27=_0xa7d1f6[_0x58623e(0x21b)][_0x58623e(0x1ee)](_0x58623e(0x1e4),_0xa7d1f6['index']+0x1),_0x4aac69=_0xa7d1f6[_0x58623e(0x21b)]['indexOf']('\x0a',_0xa7d1f6['index']+0x1);if(_0x58fc27<0x0)_0x58fc27=_0xa7d1f6[_0x58623e(0x21b)][_0x58623e(0x100)]+0x1;if(_0x4aac69>0x0)_0x58fc27=Math[_0x58623e(0x234)](_0x58fc27,_0x4aac69);const _0x47dabc=_0xa7d1f6[_0x58623e(0x21b)][_0x58623e(0x20f)](_0xa7d1f6['index'],_0x58fc27),_0x307b84=this[_0x58623e(0x214)](_0x47dabc)[_0x58623e(0x24b)],_0x38a026=_0xa7d1f6[_0x58623e(0x24b)]||this[_0x58623e(0xd8)],_0x671f1d=this['constructor']===Window_Message&&$gameMessage[_0x58623e(0x29a)]()!=='';switch(this['getTextAlignment']()){case _0x58623e(0x1e9):_0xa7d1f6['x']=_0xa7d1f6[_0x58623e(0x1f3)];break;case _0x58623e(0x175):_0xa7d1f6['x']=_0xa7d1f6[_0x58623e(0x1f3)],_0xa7d1f6['x']+=Math[_0x58623e(0xb2)]((_0x38a026-_0x307b84)/0x2);if(_0x671f1d){if(_0x58623e(0x1c9)==='pbznt'){function _0x18e06d(){_0x59b953['x']=-_0x5bca05['width']-_0x472ae1;}}else _0xa7d1f6['x']-=_0xa7d1f6[_0x58623e(0x1f3)]/0x2;}break;case _0x58623e(0x12c):_0xa7d1f6['x']=_0x38a026-_0x307b84+_0xa7d1f6['startX'];_0x671f1d&&(_0xa7d1f6['x']-=_0xa7d1f6['startX']);break;}},Window_Base[_0x508315(0x172)][_0x508315(0x214)]=function(_0x3cc220){const _0x915a5d=_0x508315;_0x3cc220=_0x3cc220[_0x915a5d(0x135)](/\x1b!/g,''),_0x3cc220=_0x3cc220[_0x915a5d(0x135)](/\x1b\|/g,''),_0x3cc220=_0x3cc220[_0x915a5d(0x135)](/\x1b\./g,'');const _0x10ab09=this[_0x915a5d(0xbc)](_0x3cc220,0x0,0x0,0x0),_0x88ec=this['getPreservedFontSettings']();return _0x10ab09[_0x915a5d(0x1c7)]=![],this[_0x915a5d(0x14d)](_0x10ab09),this[_0x915a5d(0x215)](_0x88ec),{'width':_0x10ab09[_0x915a5d(0x7a)],'height':_0x10ab09[_0x915a5d(0xdd)]};},Window_Base[_0x508315(0x172)][_0x508315(0x1a5)]=function(_0x58a7da){const _0xa56ca5=_0x508315,_0x53f1af=(_0x58a7da['rtl']?-0x1:0x1)*this[_0xa56ca5(0x296)]('\x20');_0x58a7da['x']+=_0x53f1af;if(this[_0xa56ca5(0x224)](_0x58a7da)>0x0)_0x58a7da['x']+=_0x53f1af;if(_0x58a7da['rtl'])return;let _0x2cec32=_0x58a7da[_0xa56ca5(0x21b)]['indexOf'](_0xa56ca5(0x199),_0x58a7da[_0xa56ca5(0x1ec)]+0x1),_0x4bc4b9=_0x58a7da[_0xa56ca5(0x21b)]['indexOf']('\x0a',_0x58a7da[_0xa56ca5(0x1ec)]+0x1);if(_0x2cec32<0x0)_0x2cec32=_0x58a7da[_0xa56ca5(0x21b)][_0xa56ca5(0x100)]+0x1;if(_0x4bc4b9>0x0)_0x2cec32=Math[_0xa56ca5(0x234)](_0x2cec32,_0x4bc4b9);const _0x11eb10=_0x58a7da[_0xa56ca5(0x21b)][_0xa56ca5(0x20f)](_0x58a7da['index'],_0x2cec32),_0x194e69=this[_0xa56ca5(0x1e3)](_0x11eb10)[_0xa56ca5(0x24b)];let _0xea4f3c=_0x58a7da[_0xa56ca5(0x24b)]||this[_0xa56ca5(0xd8)];if(this['constructor']===Window_Message){const _0x1a4c7=$gameMessage['faceName']()===''?0x0:ImageManager[_0xa56ca5(0x23b)]+0x14;_0xea4f3c-=_0x1a4c7,VisuMZ['MessageCore'][_0xa56ca5(0x21f)][_0xa56ca5(0x1a8)]['TightWrap']&&(_0xea4f3c-=_0x1a4c7);}let _0x45a528=![];if(_0x58a7da['x']+_0x194e69>_0x58a7da[_0xa56ca5(0x1f3)]+_0xea4f3c)_0x45a528=!![];if(_0x194e69===0x0)_0x45a528=!![];_0x45a528&&(_0x58a7da[_0xa56ca5(0x21b)]=_0x58a7da[_0xa56ca5(0x21b)][_0xa56ca5(0x2a4)](0x0,_0x58a7da[_0xa56ca5(0x1ec)])+'\x0a'+_0x58a7da['text'][_0xa56ca5(0x111)](_0x58a7da[_0xa56ca5(0x1ec)]));},Window_Base[_0x508315(0x172)][_0x508315(0x1e3)]=function(_0x106709){const _0xdc6a1d=_0x508315,_0x277ab0=this[_0xdc6a1d(0xbc)](_0x106709,0x0,0x0,0x0),_0x24d4e7=this[_0xdc6a1d(0x18d)]();return _0x277ab0[_0xdc6a1d(0x1c7)]=![],this[_0xdc6a1d(0x141)](![]),this[_0xdc6a1d(0x14d)](_0x277ab0),this[_0xdc6a1d(0x141)](!![]),this[_0xdc6a1d(0x215)](_0x24d4e7),{'width':_0x277ab0[_0xdc6a1d(0x7a)],'height':_0x277ab0[_0xdc6a1d(0xdd)]};},Window_Base[_0x508315(0x172)][_0x508315(0x112)]=function(_0x291305){return this['obtainEscapeParam'](_0x291305);},Window_Base[_0x508315(0x172)][_0x508315(0x28e)]=function(_0x5943f4){const _0x5eb77c=_0x508315,_0x19d6a8=this[_0x5eb77c(0x25f)](_0x5943f4)[_0x5eb77c(0x129)](',');if(!_0x5943f4['drawing'])return;const _0x1b4b65=_0x19d6a8[0x0]['trim'](),_0x10b251=_0x19d6a8[0x1]||0x0,_0x4625f6=_0x19d6a8[0x2]||0x0,_0x4746f4=ImageManager['loadPicture'](_0x1b4b65),_0x3c4503=this[_0x5eb77c(0x240)][_0x5eb77c(0xac)];_0x4746f4[_0x5eb77c(0x2a8)](this['drawBackPicture'][_0x5eb77c(0x81)](this,_0x4746f4,_0x5943f4['x'],_0x5943f4['y'],_0x10b251,_0x4625f6,_0x3c4503));},Window_Base[_0x508315(0x172)][_0x508315(0x7e)]=function(_0x4d3ff5,_0x47e784,_0x473133,_0x2e021a,_0x2e3b76,_0x3e5452){const _0x2b5147=_0x508315;_0x2e021a=_0x2e021a||_0x4d3ff5[_0x2b5147(0x24b)],_0x2e3b76=_0x2e3b76||_0x4d3ff5['height'],this[_0x2b5147(0x206)][_0x2b5147(0xac)]=_0x3e5452,this[_0x2b5147(0x206)][_0x2b5147(0x25b)](_0x4d3ff5,0x0,0x0,_0x4d3ff5['width'],_0x4d3ff5[_0x2b5147(0x257)],_0x47e784,_0x473133,_0x2e021a,_0x2e3b76),this[_0x2b5147(0x206)][_0x2b5147(0xac)]=0xff;},Window_Base[_0x508315(0x172)]['processDrawCenteredPicture']=function(_0x4fdbb9){const _0x2ff7c8=_0x508315,_0x5782d6=this[_0x2ff7c8(0x25f)](_0x4fdbb9)['split'](',');if(!_0x4fdbb9[_0x2ff7c8(0x1c7)])return;const _0x31dbe0=_0x5782d6[0x0][_0x2ff7c8(0x89)](),_0x2d8cde=ImageManager[_0x2ff7c8(0x121)](_0x31dbe0),_0x173d37=JsonEx['makeDeepCopy'](_0x4fdbb9),_0x19e12a=this[_0x2ff7c8(0x240)]['paintOpacity'];_0x2d8cde[_0x2ff7c8(0x2a8)](this[_0x2ff7c8(0xef)][_0x2ff7c8(0x81)](this,_0x2d8cde,_0x173d37,_0x19e12a));},Window_Base['prototype'][_0x508315(0xef)]=function(_0x45d802,_0x15639a,_0x256e91){const _0x27e2b4=_0x508315,_0x487357=_0x15639a[_0x27e2b4(0x24b)]||this[_0x27e2b4(0xd8)],_0x4088fa=this['_index']!==undefined?this[_0x27e2b4(0x87)]():this[_0x27e2b4(0x148)],_0x53ca8e=_0x487357/_0x45d802['width'],_0x1fa637=_0x4088fa/_0x45d802['height'],_0x4af118=Math[_0x27e2b4(0x234)](_0x53ca8e,_0x1fa637,0x1),_0x2f3476=this[_0x27e2b4(0x64)]!==undefined?(this[_0x27e2b4(0x1f5)](0x0)[_0x27e2b4(0x257)]-this[_0x27e2b4(0xb6)]())/0x2:0x0,_0x41b7b7=_0x45d802[_0x27e2b4(0x24b)]*_0x4af118,_0x5de67c=_0x45d802[_0x27e2b4(0x257)]*_0x4af118,_0x544272=Math[_0x27e2b4(0xb2)]((_0x487357-_0x41b7b7)/0x2)+_0x15639a[_0x27e2b4(0x1f3)],_0x5ecace=Math[_0x27e2b4(0xb2)]((_0x4088fa-_0x5de67c)/0x2)+_0x15639a['startY']-_0x2f3476*0x2;this[_0x27e2b4(0x206)][_0x27e2b4(0xac)]=_0x256e91,this[_0x27e2b4(0x206)][_0x27e2b4(0x25b)](_0x45d802,0x0,0x0,_0x45d802[_0x27e2b4(0x24b)],_0x45d802[_0x27e2b4(0x257)],_0x544272,_0x5ecace,_0x41b7b7,_0x5de67c),this[_0x27e2b4(0x206)][_0x27e2b4(0xac)]=0xff;},Window_Base[_0x508315(0x172)][_0x508315(0xc4)]=function(_0x102102){const _0x9f7acc=_0x508315,_0x24278a=this['obtainEscapeParam'](_0x102102);if(_0x102102[_0x9f7acc(0x1c7)])this[_0x9f7acc(0x21d)](_0x24278a>0x0);},Window_Base[_0x508315(0x172)]['processCustomWait']=function(_0x2316f3){const _0x2ca434=_0x508315,_0x5723e0=this['obtainEscapeParam'](_0x2316f3);if(this[_0x2ca434(0x1be)]===Window_Message&&_0x2316f3[_0x2ca434(0x1c7)]){if(_0x2ca434(0x205)===_0x2ca434(0x142)){function _0x525042(){const _0x3a6fa4=_0x2ca434;let _0x421e90=_0x1e6aa5[_0x3a6fa4(0x13a)](_0x4c3df9['height']/this[_0x3a6fa4(0xb6)]());_0x58d805[_0x3a6fa4(0x8c)](_0x421e90);}}else this[_0x2ca434(0x259)](_0x5723e0);}},Window_Help[_0x508315(0x172)][_0x508315(0xc5)]=function(){this['setWordWrap']($gameSystem['isHelpWindowWordWrap']());},Window_Help['prototype'][_0x508315(0x28d)]=function(){return!![];},VisuMZ['MessageCore'][_0x508315(0x276)]=Window_Help[_0x508315(0x172)][_0x508315(0x153)],Window_Help['prototype'][_0x508315(0x153)]=function(){const _0x413e04=_0x508315;this[_0x413e04(0x85)](),VisuMZ[_0x413e04(0x128)][_0x413e04(0x276)][_0x413e04(0x284)](this),this[_0x413e04(0xc5)]();},VisuMZ[_0x508315(0x128)][_0x508315(0x262)]=Window_Options[_0x508315(0x172)][_0x508315(0x178)],Window_Options[_0x508315(0x172)][_0x508315(0x178)]=function(){const _0x2d0f42=_0x508315;VisuMZ[_0x2d0f42(0x128)][_0x2d0f42(0x262)]['call'](this),this['addMessageCoreCommands']();},Window_Options[_0x508315(0x172)]['addMessageCoreCommands']=function(){const _0x431ce0=_0x508315;VisuMZ[_0x431ce0(0x128)]['Settings'][_0x431ce0(0x18b)][_0x431ce0(0xda)]&&this[_0x431ce0(0x2cc)]();},Window_Options[_0x508315(0x172)][_0x508315(0x2cc)]=function(){const _0x195005=_0x508315,_0x185233=TextManager['messageCoreTextSpeed'],_0x433d4e=_0x195005(0x25d);this[_0x195005(0x2da)](_0x185233,_0x433d4e);},VisuMZ[_0x508315(0x128)][_0x508315(0x285)]=Window_Options[_0x508315(0x172)][_0x508315(0x108)],Window_Options[_0x508315(0x172)][_0x508315(0x108)]=function(_0x201dbe){const _0x291f04=_0x508315,_0x13a4e1=this['commandSymbol'](_0x201dbe);if(_0x13a4e1===_0x291f04(0x25d))return this['textSpeedStatusText']();return VisuMZ[_0x291f04(0x128)][_0x291f04(0x285)][_0x291f04(0x284)](this,_0x201dbe);},VisuMZ[_0x508315(0x128)][_0x508315(0x195)]=Window_Options[_0x508315(0x172)][_0x508315(0x131)],Window_Options['prototype']['isVolumeSymbol']=function(_0x59ba5e){const _0x3a009e=_0x508315;if(_0x59ba5e===_0x3a009e(0x25d))return!![];return VisuMZ[_0x3a009e(0x128)][_0x3a009e(0x195)][_0x3a009e(0x284)](this,_0x59ba5e);},Window_Options[_0x508315(0x172)][_0x508315(0xc3)]=function(){const _0x2cd0b6=_0x508315,_0x3875f5=this[_0x2cd0b6(0x159)]('textSpeed');return _0x3875f5>0xa?TextManager['instantTextSpeed']:_0x3875f5;},VisuMZ[_0x508315(0x128)][_0x508315(0xbd)]=Window_Options['prototype'][_0x508315(0x252)],Window_Options[_0x508315(0x172)][_0x508315(0x252)]=function(_0x1d5e21,_0x4b508f,_0x153708){const _0x55e1e4=_0x508315;if(_0x1d5e21===_0x55e1e4(0x25d))return this[_0x55e1e4(0xd1)](_0x1d5e21,_0x4b508f,_0x153708);VisuMZ[_0x55e1e4(0x128)][_0x55e1e4(0xbd)][_0x55e1e4(0x284)](this,_0x1d5e21,_0x4b508f,_0x153708);},Window_Options[_0x508315(0x172)][_0x508315(0xd1)]=function(_0x214708,_0x253cb3,_0x46c83d){const _0x230a29=_0x508315,_0x4b0084=this[_0x230a29(0x159)](_0x214708),_0x41b902=0x1,_0x3f5bfb=_0x4b0084+(_0x253cb3?_0x41b902:-_0x41b902);if(_0x3f5bfb>0xb&&_0x46c83d){if('gGEBa'===_0x230a29(0x15c)){function _0x4c2a2e(){const _0x30b793=_0x230a29,_0x5b9c64=_0x29e27d>=0x1?_0x5b15cc['members']()[_0x2966ac-0x1]:null,_0x3ab9bc=_0x5b9c64?_0x5b9c64[_0x30b793(0x1c2)]():'',_0x341997=_0x69f78a(_0x48dce2['MessageCore']['Settings']['AutoColor'][_0x30b793(0x1c0)]);return this[_0x30b793(0x28d)]()&&_0x341997!==0x0?_0x30b793(0x183)[_0x30b793(0xe4)](_0x341997,_0x3ab9bc):_0x3ab9bc;}}else this[_0x230a29(0x164)](_0x214708,0x1);}else{if(_0x230a29(0xff)===_0x230a29(0xff))this[_0x230a29(0x164)](_0x214708,_0x3f5bfb['clamp'](0x1,0xb));else{function _0xab2409(){const _0x286d91=_0x230a29,_0x3f6c5a=_0x4c3a4d[_0x286d91(0x162)]()['filter'](_0x370e32=>this['isChoiceVisible'](_0x370e32)),_0x21fe39=_0x49ff3c[_0x286d91(0x13a)](_0x3f6c5a[_0x286d91(0x100)]/this[_0x286d91(0x231)]());return _0x83fefd[_0x286d91(0x25e)](0x1,_0x17629f[_0x286d91(0x234)](_0x21fe39,this[_0x286d91(0x15d)]()));}}}},Window_Message['prototype'][_0x508315(0x107)]=function(){const _0xd22b23=_0x508315;Window_Base[_0xd22b23(0x172)][_0xd22b23(0x107)]['call'](this),VisuMZ['MessageCore'][_0xd22b23(0x21f)][_0xd22b23(0x1ab)]['StretchDimmedBg']&&this['stretchDimmerSprite']();},Window_Message[_0x508315(0x172)][_0x508315(0x248)]=function(){const _0xcfe792=_0x508315;this[_0xcfe792(0x116)]['x']=Math[_0xcfe792(0x1ae)](this[_0xcfe792(0x24b)]/0x2),this[_0xcfe792(0x116)]['anchor']['x']=0.5,this[_0xcfe792(0x116)][_0xcfe792(0x1e6)]['x']=Graphics['width'];},VisuMZ[_0x508315(0x128)]['Window_Message_clearFlags']=Window_Message[_0x508315(0x172)]['clearFlags'],Window_Message[_0x508315(0x172)][_0x508315(0x20b)]=function(){const _0x5df21c=_0x508315;VisuMZ['MessageCore'][_0x5df21c(0x27e)]['call'](this),this['clearActorNameAutoColor'](),this['resetWordWrap'](),this[_0x5df21c(0x21d)](![]),this[_0x5df21c(0x2a5)](_0x5df21c(0xc9)),this[_0x5df21c(0x102)](VisuMZ[_0x5df21c(0x128)][_0x5df21c(0x21f)]['General']['MessageTextDelay']);},Window_Message[_0x508315(0x172)][_0x508315(0xc5)]=function(){const _0x32da7c=_0x508315;this['setWordWrap']($gameSystem[_0x32da7c(0xde)]());},Window_Message[_0x508315(0x172)][_0x508315(0x28d)]=function(){return!![];},Window_Message[_0x508315(0x172)][_0x508315(0x102)]=function(_0xbcf684){const _0x398cbb=_0x508315,_0x4da83c=0xb-ConfigManager[_0x398cbb(0x25d)];_0xbcf684=Math[_0x398cbb(0x1ae)](_0xbcf684*_0x4da83c),this[_0x398cbb(0x247)]=_0xbcf684,this[_0x398cbb(0x12f)]=_0xbcf684;},VisuMZ['MessageCore']['Window_Message_isTriggered']=Window_Message[_0x508315(0x172)][_0x508315(0x12d)],Window_Message[_0x508315(0x172)][_0x508315(0x12d)]=function(){const _0x22febb=_0x508315;return VisuMZ[_0x22febb(0x128)]['Window_Message_isTriggered'][_0x22febb(0x284)](this)||Input[_0x22febb(0xf3)](VisuMZ['MessageCore'][_0x22febb(0x21f)][_0x22febb(0x1ab)]['FastForwardKey']);},VisuMZ[_0x508315(0x128)][_0x508315(0x1a9)]=Window_Message[_0x508315(0x172)]['updatePlacement'],Window_Message[_0x508315(0x172)][_0x508315(0x216)]=function(){const _0x1268de=_0x508315;let _0x2ff76c=this['y'];VisuMZ[_0x1268de(0x128)][_0x1268de(0x1a9)][_0x1268de(0x284)](this);if(this[_0x1268de(0x1c4)])this['y']=_0x2ff76c;this['updateForcedPlacement'](),this[_0x1268de(0x9a)]();},VisuMZ[_0x508315(0x128)][_0x508315(0x280)]=Window_Message[_0x508315(0x172)][_0x508315(0x194)],Window_Message[_0x508315(0x172)][_0x508315(0x194)]=function(_0x7b4a7e){const _0x42b756=_0x508315;this[_0x42b756(0x2bc)](_0x7b4a7e),VisuMZ['MessageCore'][_0x42b756(0x280)][_0x42b756(0x284)](this,_0x7b4a7e),this[_0x42b756(0x1b8)]();},Window_Message[_0x508315(0x172)][_0x508315(0x2bc)]=function(_0x561454){const _0x55ef07=_0x508315;this['prepareForcedPositionEscapeCharacters'](_0x561454),this[_0x55ef07(0x196)](_0x561454),this[_0x55ef07(0x86)]();},VisuMZ['MessageCore'][_0x508315(0x290)]=Window_Message['prototype']['terminateMessage'],Window_Message[_0x508315(0x172)][_0x508315(0x1ea)]=function(){const _0xcacada=_0x508315;VisuMZ[_0xcacada(0x128)]['Window_Message_terminateMessage']['call'](this),this['clearFlags']();if(this[_0xcacada(0x12a)])this[_0xcacada(0x23d)]();},Window_Message[_0x508315(0x172)][_0x508315(0x86)]=function(){const _0xa1041c=_0x508315;this[_0xa1041c(0x24b)]=$gameSystem[_0xa1041c(0xa3)]()+this[_0xa1041c(0x117)]();;this[_0xa1041c(0x24b)]=Math[_0xa1041c(0x234)](Graphics[_0xa1041c(0x24b)],this[_0xa1041c(0x24b)]);const _0x285d72=$gameSystem['getMessageWindowRows']();this['height']=SceneManager[_0xa1041c(0x1bc)]['calcWindowHeight'](_0x285d72,![])+this[_0xa1041c(0x123)](),this[_0xa1041c(0x257)]=Math['min'](Graphics[_0xa1041c(0x257)],this[_0xa1041c(0x257)]);if($gameTemp[_0xa1041c(0xe5)])this[_0xa1041c(0xbf)]();},Window_Message['prototype']['addedWidth']=function(){return 0x0;},Window_Message['prototype'][_0x508315(0x123)]=function(){return 0x0;},Window_Message[_0x508315(0x172)][_0x508315(0xbf)]=function(){const _0x5d21cc=_0x508315;this['x']=(Graphics[_0x5d21cc(0x152)]-this[_0x5d21cc(0x24b)])/0x2,$gameTemp[_0x5d21cc(0xe5)]=undefined,this['clampPlacementPosition']();},Window_Message['prototype'][_0x508315(0x105)]=function(){const _0x227f17=_0x508315,_0x2f9a6b={'x':this['x'],'y':this['y']};Window_Base[_0x227f17(0x172)][_0x227f17(0x105)][_0x227f17(0x284)](this),this[_0x227f17(0x24c)](_0x2f9a6b);},Window_Message[_0x508315(0x172)][_0x508315(0x254)]=function(){return!![];},Window_Message[_0x508315(0x172)][_0x508315(0x24c)]=function(_0x5f2dd7){const _0x393fce=_0x508315;if(this['_nameBoxWindow']){if(_0x393fce(0x7d)===_0x393fce(0x7d))this[_0x393fce(0x28a)]['x']+=this['x']-_0x5f2dd7['x'],this[_0x393fce(0x28a)]['y']+=this['y']-_0x5f2dd7['y'];else{function _0x25aea3(){const _0x1a87e5=_0x393fce;this[_0x1a87e5(0x22c)]=null;}}}},Window_Message[_0x508315(0x172)]['resetRect']=function(_0x428e66,_0x5ae321){const _0x47ada2=_0x508315;this[_0x47ada2(0x277)](this[_0x47ada2(0x125)]['x'],this[_0x47ada2(0x1ef)]*(Graphics[_0x47ada2(0x258)]-this[_0x47ada2(0x257)])/0x2,this[_0x47ada2(0x125)]['width'],this[_0x47ada2(0x125)][_0x47ada2(0x257)],_0x428e66,_0x5ae321);},Window_Message[_0x508315(0x172)]['processCommonEvent']=function(_0x2e9fc3){const _0x46a1fc=_0x508315,_0x274666=Window_Base[_0x46a1fc(0x172)]['processCommonEvent']['call'](this,_0x2e9fc3);_0x2e9fc3['drawing']&&this[_0x46a1fc(0x1da)](_0x274666);},Window_Message[_0x508315(0x172)]['launchMessageCommonEvent']=function(_0x162531){const _0x1b6ade=_0x508315;if($gameParty['inBattle']()){}else $gameMap[_0x1b6ade(0x1a2)](_0x162531);},Window_Message[_0x508315(0x172)][_0x508315(0x1b3)]=function(_0x1fa453){const _0x117a6f=_0x508315;this['_textDelayCount']--;if(this['_textDelayCount']<=0x0){if(_0x117a6f(0x286)===_0x117a6f(0x286))this[_0x117a6f(0x83)](_0x1fa453),Window_Base[_0x117a6f(0x172)]['processCharacter'][_0x117a6f(0x284)](this,_0x1fa453);else{function _0x5eb6e7(){const _0x28e552=_0x117a6f;this[_0x28e552(0x224)](_0x34ae29);}}}},Window_Message[_0x508315(0x172)][_0x508315(0x83)]=function(_0x19164f){const _0x10f234=_0x508315;this[_0x10f234(0x247)]=this['_textDelay'];if(this[_0x10f234(0x12f)]<=0x0)this[_0x10f234(0x22f)]=!![];},VisuMZ[_0x508315(0x128)]['Window_Message_processEscapeCharacter']=Window_Message[_0x508315(0x172)][_0x508315(0x1d9)],Window_Message[_0x508315(0x172)][_0x508315(0x1d9)]=function(_0x202aa,_0x2cc1e2){const _0x35222d=_0x508315;!_0x2cc1e2[_0x35222d(0x1c7)]?Window_Base[_0x35222d(0x172)][_0x35222d(0x1d9)][_0x35222d(0x284)](this,_0x202aa,_0x2cc1e2):VisuMZ['MessageCore']['Window_Message_processEscapeCharacter'][_0x35222d(0x284)](this,_0x202aa,_0x2cc1e2);},Window_Message[_0x508315(0x172)][_0x508315(0x1eb)]=function(_0x271925){const _0x2ed533=_0x508315;let _0x3602a8=_0x271925[_0x2ed533(0x21b)];this[_0x2ed533(0x2b6)]={},_0x3602a8=_0x3602a8[_0x2ed533(0x135)](/<POSITION:[ ](.*)>/gi,(_0x696c47,_0x131735)=>{const _0x3e925f=_0x2ed533;if(_0x3e925f(0x245)!==_0x3e925f(0x2d6)){const _0x51246a=_0x131735[_0x3e925f(0x129)](',')[_0x3e925f(0x1cd)](_0x5e0ce5=>Number(_0x5e0ce5)||0x0);if(_0x51246a[0x0]!==undefined)this['_forcedPosition']['x']=Number(_0x51246a[0x0]);if(_0x51246a[0x1]!==undefined)this['_forcedPosition']['y']=Number(_0x51246a[0x1]);if(_0x51246a[0x2]!==undefined)this[_0x3e925f(0x2b6)]['width']=Number(_0x51246a[0x2]);if(_0x51246a[0x3]!==undefined)this[_0x3e925f(0x2b6)][_0x3e925f(0x257)]=Number(_0x51246a[0x3]);return'';}else{function _0x16c8b4(){const _0x8fba0d=_0x3e925f;_0x4f18d0['prototype'][_0x8fba0d(0x1a0)][_0x8fba0d(0x284)](this),this[_0x8fba0d(0x92)](this['defaultColor']());}}}),_0x3602a8=_0x3602a8['replace'](/<COORDINATES:[ ](.*)>/gi,(_0x432e3a,_0x19c2b7)=>{const _0xd23d5d=_0x2ed533;if(_0xd23d5d(0x19c)!==_0xd23d5d(0x143)){const _0x5af84c=_0x19c2b7[_0xd23d5d(0x129)](',')[_0xd23d5d(0x1cd)](_0x1f58b1=>Number(_0x1f58b1)||0x0);if(_0x5af84c[0x0]!==undefined)this[_0xd23d5d(0x2b6)]['x']=Number(_0x5af84c[0x0]);if(_0x5af84c[0x1]!==undefined)this[_0xd23d5d(0x2b6)]['y']=Number(_0x5af84c[0x1]);return'';}else{function _0x467302(){const _0x4196c8=_0xd23d5d,_0xc7dd07=this[_0x4196c8(0x21c)],_0x566491=this[_0x4196c8(0x217)],_0x2978a3=this[_0x4196c8(0x2de)]((_0x566491-_0xc7dd07)/_0x566491),_0x1167ef=this[_0x4196c8(0x2de)]((_0x566491-_0xc7dd07+0x1)/_0x566491),_0x5b239c=(_0x1872d6-_0x4c0f02*_0x2978a3)/(0x1-_0x2978a3);return _0x5b239c+(_0xd40ef3-_0x5b239c)*_0x1167ef;}}}),_0x3602a8=_0x3602a8[_0x2ed533(0x135)](/<DIMENSIONS:[ ](.*)>/gi,(_0x1df069,_0x39e462)=>{const _0x31f5b5=_0x2ed533,_0x4eb011=_0x39e462[_0x31f5b5(0x129)](',')[_0x31f5b5(0x1cd)](_0x3a7219=>Number(_0x3a7219)||0x0);if(_0x4eb011[0x0]!==undefined)this[_0x31f5b5(0x2b6)][_0x31f5b5(0x24b)]=Number(_0x4eb011[0x2]);if(_0x4eb011[0x1]!==undefined)this[_0x31f5b5(0x2b6)]['height']=Number(_0x4eb011[0x3]);return'';}),_0x271925[_0x2ed533(0x21b)]=_0x3602a8;},Window_Message[_0x508315(0x172)]['updateForcedPlacement']=function(){const _0x1984dc=_0x508315;this[_0x1984dc(0x2b6)]=this['_forcedPosition']||{};const _0xa17147=['x','y','width',_0x1984dc(0x257)];for(const _0x49d521 of _0xa17147){this[_0x1984dc(0x2b6)][_0x49d521]!==undefined&&(this[_0x49d521]=Number(this['_forcedPosition'][_0x49d521]));}},Window_Message[_0x508315(0x172)]['prepareAutoSizeEscapeCharacters']=function(_0x195c98){const _0x12292c=_0x508315;let _0xbdd9cd=_0x195c98[_0x12292c(0x21b)];_0xbdd9cd=_0xbdd9cd[_0x12292c(0x135)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x24ed9b=_0x12292c;return this[_0x24ed9b(0x103)](_0xbdd9cd,!![],!![]),this[_0x24ed9b(0x264)](_0x24ed9b(0x1d8)),'';}),_0xbdd9cd=_0xbdd9cd[_0x12292c(0x135)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x25edfa=_0x12292c;if(_0x25edfa(0x2ac)==='hkOZK'){function _0x398d48(){const _0x58edd6=_0x25edfa;_0x32aac3=_0x12b2b5[_0x58edd6(0x135)](_0xd36c54[0x0],_0x52076d[0x1]);}}else return this[_0x25edfa(0x103)](_0xbdd9cd,!![],![]),this['processAutoPosition'](_0x25edfa(0x1d8)),'';}),_0xbdd9cd=_0xbdd9cd['replace'](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x539828=_0x12292c;return this[_0x539828(0x103)](_0xbdd9cd,![],!![]),this[_0x539828(0x264)](_0x539828(0x1d8)),'';});if(SceneManager[_0x12292c(0x180)]())_0xbdd9cd=_0xbdd9cd['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0xb2c06,_0x47bfc7)=>{const _0x22836e=_0x12292c;return this[_0x22836e(0x103)](_0xbdd9cd,!![],!![]),this[_0x22836e(0x264)]('battle\x20actor',Number(_0x47bfc7)||0x1),'';}),_0xbdd9cd=_0xbdd9cd[_0x12292c(0x135)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x486eaf,_0x56775e)=>{const _0x97dee1=_0x12292c;if(_0x97dee1(0x106)!==_0x97dee1(0x106)){function _0xba905(){const _0x2bb128=_0x97dee1;return this[_0x2bb128(0x103)](_0x419170,!![],![]),this['processAutoPosition']('none'),'';}}else return this[_0x97dee1(0x103)](_0xbdd9cd,!![],!![]),this[_0x97dee1(0x264)](_0x97dee1(0x1af),Number(_0x56775e)||0x0),'';}),_0xbdd9cd=_0xbdd9cd[_0x12292c(0x135)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x26f71f,_0x4edff1)=>{const _0x31f8e1=_0x12292c;return this[_0x31f8e1(0x103)](_0xbdd9cd,!![],!![]),this[_0x31f8e1(0x264)](_0x31f8e1(0x76),Number(_0x4edff1)||0x0),'';});else SceneManager['isSceneMap']()&&(_0xbdd9cd=_0xbdd9cd[_0x12292c(0x135)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x525ee9,_0x2fd233)=>{const _0x30e0d0=_0x12292c;if(_0x30e0d0(0x189)!=='scvMM')return this[_0x30e0d0(0x103)](_0xbdd9cd,!![],!![]),this[_0x30e0d0(0x264)](_0x30e0d0(0x218),0x0),'';else{function _0x17c0e5(){const _0x300f8d=_0x30e0d0;_0x5dca13(_0x300f8d(0x2c3)[_0x300f8d(0xe4)](_0x5979a6,_0x3ad6fb,_0x5244e5)),_0x473bbb[_0x300f8d(0x2c0)]();}}}),_0xbdd9cd=_0xbdd9cd['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x24d276,_0x59cc3a)=>{const _0x8a0312=_0x12292c;if('PzynU'!==_0x8a0312(0x169))return this['processAutoSize'](_0xbdd9cd,!![],!![]),this[_0x8a0312(0x264)](_0x8a0312(0x270),Number(_0x59cc3a)||0x1),'';else{function _0x4926e9(){const _0x11f86c=_0x8a0312;this['_moveTargetX']=this['x']+_0x47e146,this[_0x11f86c(0x22b)]=this['y']+_0x4f02aa,this['_moveTargetWidth']=this[_0x11f86c(0x24b)]+(_0x14f5ef||0x0),this['_moveTargetHeight']=this[_0x11f86c(0x257)]+(_0x445d2b||0x0),this[_0x11f86c(0x21c)]=_0x3bfc96||0x1;if(this['_moveDuration']<=0x0)this['_moveDuration']=0x1;this[_0x11f86c(0x217)]=this['_moveDuration'],this[_0x11f86c(0x295)]=_0x19512e||0x0;if(_0x5f2f5d<=0x0)this['updateMove']();}}}),_0xbdd9cd=_0xbdd9cd[_0x12292c(0x135)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x55ce7d,_0x2b655c)=>{const _0x2ed23c=_0x12292c;return this[_0x2ed23c(0x103)](_0xbdd9cd,!![],!![]),this[_0x2ed23c(0x264)](_0x2ed23c(0x134),Number(_0x2b655c)||0x0),'';}),_0xbdd9cd=_0xbdd9cd[_0x12292c(0x135)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x1921ae,_0x4e5c07)=>{const _0x4e45d9=_0x12292c;return this[_0x4e45d9(0x103)](_0xbdd9cd,!![],!![]),this[_0x4e45d9(0x264)](_0x4e45d9(0x25c),Number(_0x4e5c07)||0x0),'';}));_0x195c98[_0x12292c(0x21b)]=_0xbdd9cd;},Window_Message[_0x508315(0x18a)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message['_autoPosRegExp']=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message['prototype'][_0x508315(0x103)]=function(_0x2789c6,_0xf8d673,_0x1356ea){const _0x433d38=_0x508315;_0x2789c6=_0x2789c6[_0x433d38(0x135)](Window_Message[_0x433d38(0x18a)],''),_0x2789c6=_0x2789c6[_0x433d38(0x135)](Window_Message['_autoPosRegExp'],''),this[_0x433d38(0x241)]=!![];const _0x27747c=this['textSizeEx'](_0x2789c6);if(_0xf8d673){let _0x130b4d=_0x27747c[_0x433d38(0x24b)]+$gameSystem[_0x433d38(0x161)]()*0x2+0x6;const _0x389158=$gameMessage[_0x433d38(0x29a)]()!=='',_0x3e6e4b=ImageManager['faceWidth'],_0x11fb4a=0x14;_0x130b4d+=_0x389158?_0x3e6e4b+_0x11fb4a:0x4;if(_0x130b4d%0x2!==0x0)_0x130b4d+=0x1;$gameSystem['setMessageWindowWidth'](_0x130b4d);}if(_0x1356ea){if(_0x433d38(0x225)==='jDFip'){function _0x4d163a(){const _0x1d184b=_0x433d38,_0x446fd1=this[_0x1d184b(0x159)](_0x1d184b(0x25d));return _0x446fd1>0xa?_0x583923[_0x1d184b(0x1b2)]:_0x446fd1;}}else{let _0x37d7bf=Math[_0x433d38(0x13a)](_0x27747c['height']/this[_0x433d38(0xb6)]());$gameSystem['setMessageWindowRows'](_0x37d7bf);}}this[_0x433d38(0x237)](),this[_0x433d38(0x241)]=![],this['_messagePositionReset']=!![];},Window_Message[_0x508315(0x172)][_0x508315(0x237)]=function(){const _0x392109=_0x508315;this[_0x392109(0x86)](),this[_0x392109(0x216)](),this['resetPositionX'](),this[_0x392109(0x200)](),this[_0x392109(0x240)][_0x392109(0x281)](),this[_0x392109(0x1b8)]();},Window_Message['prototype'][_0x508315(0x264)]=function(_0x238017,_0x51902f){const _0x3e5b5d=_0x508315;switch(_0x238017['toLowerCase']()[_0x3e5b5d(0x89)]()){case _0x3e5b5d(0x203):this[_0x3e5b5d(0x1c4)]=$gameActors[_0x3e5b5d(0x17c)](_0x51902f);break;case'battle\x20party':this[_0x3e5b5d(0x1c4)]=$gameParty[_0x3e5b5d(0x156)]()[_0x51902f-0x1];break;case _0x3e5b5d(0x76):this[_0x3e5b5d(0x1c4)]=$gameTroop[_0x3e5b5d(0x156)]()[_0x51902f-0x1];break;case _0x3e5b5d(0x218):this[_0x3e5b5d(0x1c4)]=$gamePlayer;break;case _0x3e5b5d(0x270):const _0x4880da=$gameActors[_0x3e5b5d(0x17c)](_0x51902f)[_0x3e5b5d(0x1ec)]();_0x4880da===0x0?this[_0x3e5b5d(0x1c4)]=$gamePlayer:this['_autoPositionTarget']=$gamePlayer[_0x3e5b5d(0x269)]()[_0x3e5b5d(0x243)](_0x4880da-0x1);break;case _0x3e5b5d(0x134):if(_0x51902f===0x1)this[_0x3e5b5d(0x1c4)]=$gamePlayer;else{if(_0x3e5b5d(0x1a1)!==_0x3e5b5d(0x1a1)){function _0x383aa2(){const _0x144cbb=_0x3e5b5d;this[_0x144cbb(0x240)][_0x144cbb(0x1b1)]+=_0x189233[_0x144cbb(0x128)][_0x144cbb(0x21f)][_0x144cbb(0x1ab)][_0x144cbb(0x11e)],this['contents'][_0x144cbb(0x1b1)]=_0x68646e[_0x144cbb(0x234)](this[_0x144cbb(0x240)]['fontSize'],_0x348be0['MessageCore'][_0x144cbb(0x21f)][_0x144cbb(0x1ab)][_0x144cbb(0x120)]);}}else this[_0x3e5b5d(0x1c4)]=$gamePlayer[_0x3e5b5d(0x269)]()[_0x3e5b5d(0x243)](_0x51902f-0x2);}break;case _0x3e5b5d(0x25c):this[_0x3e5b5d(0x1c4)]=$gameMap[_0x3e5b5d(0x1df)](_0x51902f);break;}this[_0x3e5b5d(0x1c4)]&&this[_0x3e5b5d(0xce)]();},VisuMZ[_0x508315(0x128)][_0x508315(0x75)]=Window_Message[_0x508315(0x172)][_0x508315(0x28f)],Window_Message['prototype']['synchronizeNameBox']=function(){const _0x167df3=_0x508315;this[_0x167df3(0xce)](),VisuMZ[_0x167df3(0x128)][_0x167df3(0x75)][_0x167df3(0x284)](this);},Window_Message[_0x508315(0x172)]['updateAutoPosition']=function(){const _0x390a6a=_0x508315;if(!this[_0x390a6a(0x1c4)])return;const _0x3dd46c=SceneManager[_0x390a6a(0x1bc)];if(!_0x3dd46c)return;if(!_0x3dd46c[_0x390a6a(0x1f4)])return;const _0x434210=_0x3dd46c[_0x390a6a(0x1f4)][_0x390a6a(0x1e7)](this['_autoPositionTarget']);if(!_0x434210)return;let _0x26eaf9=_0x434210['x'];_0x26eaf9-=this['width']/0x2,_0x26eaf9-=(Graphics[_0x390a6a(0x24b)]-Graphics[_0x390a6a(0x152)])/0x2;let _0x370846=_0x434210['y'];_0x370846-=this['height'],_0x370846-=(Graphics[_0x390a6a(0x257)]-Graphics[_0x390a6a(0x258)])/0x2,_0x370846-=_0x434210['height']+0x8,this['x']=Math['round'](_0x26eaf9),this['y']=Math[_0x390a6a(0x1ae)](_0x370846),this[_0x390a6a(0x9a)](!![],![]),this['_nameBoxWindow'][_0x390a6a(0x216)]();},Window_Message['prototype']['messagePositionReset']=function(){const _0xcf0edc=_0x508315;this[_0xcf0edc(0x12a)]=![],this[_0xcf0edc(0x1c4)]=undefined,$gameSystem[_0xcf0edc(0x96)](),this[_0xcf0edc(0x237)](),this[_0xcf0edc(0x110)]=0x0;},Window_Message[_0x508315(0x172)][_0x508315(0x2a1)]=function(_0x4e75c7){const _0xdfdccd=_0x508315;return Window_Base[_0xdfdccd(0x172)][_0xdfdccd(0x2a1)][_0xdfdccd(0x284)](this,_0x4e75c7);},Window_Message['prototype'][_0x508315(0xb1)]=function(_0x558050){const _0x2b7718=_0x508315;return Window_Base[_0x2b7718(0x172)][_0x2b7718(0xb1)][_0x2b7718(0x284)](this,_0x558050);},Window_Message[_0x508315(0x172)][_0x508315(0xbb)]=function(_0x1e0972){const _0x322cee=_0x508315;this['preFlushTextState'](_0x1e0972),Window_Base[_0x322cee(0x172)][_0x322cee(0xbb)][_0x322cee(0x284)](this,_0x1e0972),this[_0x322cee(0x1d4)](_0x1e0972);},Window_Message[_0x508315(0x172)]['preFlushTextState']=function(_0x36dc96){},Window_Message['prototype'][_0x508315(0x1d4)]=function(_0x22e751){},Window_NameBox['prototype'][_0x508315(0x28d)]=function(){return![];},Window_NameBox['prototype'][_0x508315(0x1a0)]=function(){const _0x3b9c02=_0x508315;Window_Base[_0x3b9c02(0x172)]['resetTextColor'][_0x3b9c02(0x284)](this),this['changeTextColor'](this['defaultColor']());},Window_NameBox['prototype'][_0x508315(0x127)]=function(){const _0x1f9285=_0x508315,_0x183a2a=VisuMZ[_0x1f9285(0x128)][_0x1f9285(0x21f)][_0x1f9285(0x1ab)][_0x1f9285(0x2c9)];return ColorManager['textColor'](_0x183a2a);},VisuMZ['MessageCore'][_0x508315(0x11b)]=Window_NameBox[_0x508315(0x172)][_0x508315(0x216)],Window_NameBox[_0x508315(0x172)][_0x508315(0x216)]=function(){const _0x21f57c=_0x508315;VisuMZ['MessageCore'][_0x21f57c(0x11b)][_0x21f57c(0x284)](this),this['updateRelativePosition'](),this['updateOffsetPosition'](),this[_0x21f57c(0x9a)](),this[_0x21f57c(0x23e)]();},Window_NameBox[_0x508315(0x172)][_0x508315(0x2a1)]=function(_0x51265f){const _0x3351ff=_0x508315;return _0x51265f=_0x51265f['replace'](/<LEFT>/gi,this[_0x3351ff(0x23a)][_0x3351ff(0x81)](this,0x0)),_0x51265f=_0x51265f['replace'](/<CENTER>/gi,this['setRelativePosition'][_0x3351ff(0x81)](this,0x5)),_0x51265f=_0x51265f[_0x3351ff(0x135)](/<RIGHT>/gi,this['setRelativePosition'][_0x3351ff(0x81)](this,0xa)),_0x51265f=_0x51265f[_0x3351ff(0x135)](/<POSITION:[ ](\d+)>/gi,(_0x576b5d,_0x36cf40)=>this['setRelativePosition'](parseInt(_0x36cf40))),_0x51265f=_0x51265f[_0x3351ff(0x135)](/<\/LEFT>/gi,''),_0x51265f=_0x51265f[_0x3351ff(0x135)](/<\/CENTER>/gi,''),_0x51265f=_0x51265f['replace'](/<\/RIGHT>/gi,''),Window_Base[_0x3351ff(0x172)][_0x3351ff(0x2a1)]['call'](this,_0x51265f);},Window_NameBox['prototype'][_0x508315(0x23a)]=function(_0x1f8fd0){const _0x198f17=_0x508315;return this[_0x198f17(0x2ca)]=_0x1f8fd0,'';},Window_NameBox[_0x508315(0x172)][_0x508315(0x137)]=function(){const _0x5a83f8=_0x508315;if($gameMessage[_0x5a83f8(0x232)]())return;this[_0x5a83f8(0x2ca)]=this[_0x5a83f8(0x2ca)]||0x0;const _0x53bd36=this['_messageWindow'],_0x1bbd09=Math[_0x5a83f8(0xb2)](_0x53bd36[_0x5a83f8(0x24b)]*this[_0x5a83f8(0x2ca)]/0xa);this['x']=_0x53bd36['x']+_0x1bbd09-Math[_0x5a83f8(0xb2)](this[_0x5a83f8(0x24b)]/0x2),this['x']=this['x']['clamp'](_0x53bd36['x'],_0x53bd36['x']+_0x53bd36[_0x5a83f8(0x24b)]-this[_0x5a83f8(0x24b)]);},Window_NameBox[_0x508315(0x172)]['updateOffsetPosition']=function(){const _0x26c1a9=_0x508315;if($gameMessage[_0x26c1a9(0x232)]())return;this[_0x26c1a9(0x2ca)]=this[_0x26c1a9(0x2ca)]||0x0;const _0x2ac6fb=VisuMZ[_0x26c1a9(0x128)][_0x26c1a9(0x21f)][_0x26c1a9(0x1ab)][_0x26c1a9(0xa6)],_0x2e23cd=VisuMZ[_0x26c1a9(0x128)][_0x26c1a9(0x21f)][_0x26c1a9(0x1ab)][_0x26c1a9(0x24e)],_0x401c16=(0x5-this[_0x26c1a9(0x2ca)])/0x5;this['x']+=Math['floor'](_0x2ac6fb*_0x401c16),this['y']+=_0x2e23cd;},Window_NameBox[_0x508315(0x172)][_0x508315(0x23e)]=function(){const _0x1e04b2=_0x508315,_0x357344=this[_0x1e04b2(0x253)],_0x55447d=_0x357344['y'],_0x49f5a6=VisuMZ['MessageCore']['Settings'][_0x1e04b2(0x1ab)][_0x1e04b2(0x24e)];if(_0x55447d>this['y']&&_0x55447d<this['y']+this[_0x1e04b2(0x257)]-_0x49f5a6){if(_0x1e04b2(0xf7)!=='nGfgo')this['y']=_0x357344['y']+_0x357344[_0x1e04b2(0x257)];else{function _0x5e17b3(){return!![];}}}},VisuMZ[_0x508315(0x128)][_0x508315(0x1f8)]=Window_NameBox['prototype']['refresh'],Window_NameBox[_0x508315(0x172)][_0x508315(0x153)]=function(){const _0x1bd403=_0x508315;this[_0x1bd403(0x2ca)]=0x0,VisuMZ[_0x1bd403(0x128)][_0x1bd403(0x1f8)][_0x1bd403(0x284)](this);},Window_ChoiceList[_0x508315(0x172)][_0x508315(0xba)]=function(){return![];},Window_ChoiceList[_0x508315(0x172)][_0x508315(0x28d)]=function(){return!![];},Window_ChoiceList[_0x508315(0x172)]['itemHeight']=function(){const _0x4948eb=_0x508315;return $gameSystem[_0x4948eb(0x2a6)]()+0x8;},Window_ChoiceList['prototype'][_0x508315(0x231)]=function(){return $gameSystem['getChoiceListMaxColumns']();},Window_ChoiceList[_0x508315(0x172)][_0x508315(0x72)]=function(){const _0x1e51e3=_0x508315;this[_0x1e51e3(0x153)](),this[_0x1e51e3(0x263)](),this['open'](),this[_0x1e51e3(0xf5)]();},Window_ChoiceList[_0x508315(0x172)]['refresh']=function(){const _0x5e1ccb=_0x508315;this[_0x5e1ccb(0xa7)](),this[_0x5e1ccb(0x1f7)]();if(this[_0x5e1ccb(0x253)]){if('ZLnHC'!==_0x5e1ccb(0x8e)){function _0x73f1af(){const _0x5b9bee=_0x5e1ccb;return _0x47cc52=_0x358a36[_0x5b9bee(0x135)](/\x1bN\[(\d+)\]/gi,(_0x3760d5,_0x26bcb8)=>this[_0x5b9bee(0x98)](_0x5a5761(_0x26bcb8))),_0x40da1d=_0x1fd5d1['replace'](/\x1bP\[(\d+)\]/gi,(_0x177828,_0xf24be6)=>this[_0x5b9bee(0x282)](_0x356317(_0xf24be6))),_0x4abf8d=_0xd720b4[_0x5b9bee(0x135)](/\x1bG/gi,_0x42553a['currencyUnit']),_0x4445a3;}}else this['updatePlacement'](),this[_0x5e1ccb(0x220)]();}this[_0x5e1ccb(0x1b8)](),this['updateBackground'](),this[_0x5e1ccb(0x107)](),Window_Selectable['prototype'][_0x5e1ccb(0x153)][_0x5e1ccb(0x284)](this);},Window_ChoiceList[_0x508315(0x172)][_0x508315(0x1f7)]=function(){const _0x2d8f14=_0x508315,_0xa9bbd8=$gameMessage['choices']();let _0x351fc2=0x0;for(const _0x525ce4 of _0xa9bbd8){if(this[_0x2d8f14(0x1d1)](_0x525ce4)){if(_0x2d8f14(0x233)!==_0x2d8f14(0x233)){function _0x48646c(){const _0x131af0=_0x2d8f14,_0x335436=_0x4729dc[_0x131af0(0x129)](',')[_0x131af0(0x1cd)](_0x5c61d4=>_0x617bb7(_0x5c61d4)||0x0);if(_0x335436[0x0]!==_0xb51178)this[_0x131af0(0x2b6)][_0x131af0(0x24b)]=_0x19d425(_0x335436[0x2]);if(_0x335436[0x1]!==_0x255fc6)this[_0x131af0(0x2b6)][_0x131af0(0x257)]=_0x3cd22a(_0x335436[0x3]);return'';}}else{const _0x1dd518=this[_0x2d8f14(0x13d)](_0x525ce4),_0x5d0227=this[_0x2d8f14(0x2b1)](_0x525ce4);this[_0x2d8f14(0x2da)](_0x1dd518,'choice',_0x5d0227,_0x351fc2);}}_0x351fc2++;}},Window_ChoiceList['prototype'][_0x508315(0x1d1)]=function(_0x3b7ffc){const _0x571b1c=_0x508315;if(_0x3b7ffc[_0x571b1c(0x136)](/<HIDE>/i))return![];if(_0x3b7ffc[_0x571b1c(0x136)](/<SHOW>/i))return!![];if(_0x3b7ffc[_0x571b1c(0x136)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xbed739=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1647fa of _0xbed739){if(!$gameSwitches[_0x571b1c(0x229)](_0x1647fa))return![];}return!![];}if(_0x3b7ffc[_0x571b1c(0x136)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1e1190=JSON[_0x571b1c(0x1fd)]('['+RegExp['$1'][_0x571b1c(0x136)](/\d+/g)+']');for(const _0x7797ec of _0x1e1190){if(!$gameSwitches[_0x571b1c(0x229)](_0x7797ec))return![];}return!![];}if(_0x3b7ffc[_0x571b1c(0x136)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3e6d74=JSON[_0x571b1c(0x1fd)]('['+RegExp['$1'][_0x571b1c(0x136)](/\d+/g)+']');for(const _0x3d3a33 of _0x3e6d74){if($gameSwitches['value'](_0x3d3a33))return!![];}return![];}if(_0x3b7ffc[_0x571b1c(0x136)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('qZhtv'!=='lwfjW'){const _0x3e36bb=JSON[_0x571b1c(0x1fd)]('['+RegExp['$1'][_0x571b1c(0x136)](/\d+/g)+']');for(const _0x3f6186 of _0x3e36bb){if(!$gameSwitches['value'](_0x3f6186))return!![];}return![];}else{function _0x445de8(){const _0x52d1f3=_0x571b1c;return _0x216900=_0x3b6692[_0x52d1f3(0x135)](/\\/g,'\x1b'),_0x2cf344=_0x86ac57['replace'](/\x1b\x1b/g,'\x5c'),_0x1030e8;}}}if(_0x3b7ffc['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x33e4bf=JSON[_0x571b1c(0x1fd)]('['+RegExp['$1'][_0x571b1c(0x136)](/\d+/g)+']');for(const _0x1d62bb of _0x33e4bf){if(!$gameSwitches[_0x571b1c(0x229)](_0x1d62bb))return!![];}return![];}if(_0x3b7ffc[_0x571b1c(0x136)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2f984d=JSON[_0x571b1c(0x1fd)]('['+RegExp['$1'][_0x571b1c(0x136)](/\d+/g)+']');for(const _0x321528 of _0x2f984d){if($gameSwitches['value'](_0x321528))return![];}return!![];}return!![];},Window_ChoiceList[_0x508315(0x172)][_0x508315(0x13d)]=function(_0x36b124){const _0x556d45=_0x508315;let _0x21ca0a=_0x36b124;return _0x21ca0a=_0x21ca0a[_0x556d45(0x135)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x21ca0a=_0x21ca0a[_0x556d45(0x135)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x21ca0a;},Window_ChoiceList[_0x508315(0x172)][_0x508315(0x2b1)]=function(_0x2f4543){const _0x3ca57c=_0x508315;if(_0x2f4543[_0x3ca57c(0x136)](/<DISABLE>/i))return![];if(_0x2f4543[_0x3ca57c(0x136)](/<ENABLE>/i))return!![];if(_0x2f4543[_0x3ca57c(0x136)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('ycZuU'!==_0x3ca57c(0x27d)){const _0x3e77ab=JSON[_0x3ca57c(0x1fd)]('['+RegExp['$1'][_0x3ca57c(0x136)](/\d+/g)+']');for(const _0x155382 of _0x3e77ab){if(!$gameSwitches[_0x3ca57c(0x229)](_0x155382))return![];}return!![];}else{function _0x4d5984(){const _0x93ea93=_0x3ca57c;_0xfe7c4f[_0x93ea93(0x128)][_0x93ea93(0x1f0)][_0x93ea93(0x284)](this),this[_0x93ea93(0x1d7)](),this[_0x93ea93(0x8a)](),this[_0x93ea93(0x1f1)](),this[_0x93ea93(0x71)]();}}}if(_0x2f4543[_0x3ca57c(0x136)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3ca57c(0xdf)===_0x3ca57c(0xdf)){const _0x5501f3=JSON[_0x3ca57c(0x1fd)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x443902 of _0x5501f3){if('ZeSqH'!==_0x3ca57c(0x133)){if(!$gameSwitches['value'](_0x443902))return![];}else{function _0x364284(){var _0x11cdb6=new _0x32cac3(_0x59db75,'i');}}}return!![];}else{function _0x175eb2(){const _0x24a758=_0x3ca57c,_0x3a5af0=_0x191adf['parse']('['+_0x4cb2ba['$1'][_0x24a758(0x136)](/\d+/g)+']');for(const _0x3fd9b7 of _0x3a5af0){if(!_0x5015e3[_0x24a758(0x229)](_0x3fd9b7))return![];}return!![];}}}if(_0x2f4543[_0x3ca57c(0x136)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4ae44f=JSON['parse']('['+RegExp['$1'][_0x3ca57c(0x136)](/\d+/g)+']');for(const _0x4a33c9 of _0x4ae44f){if($gameSwitches[_0x3ca57c(0x229)](_0x4a33c9))return!![];}return![];}if(_0x2f4543[_0x3ca57c(0x136)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3ca57c(0x268)!==_0x3ca57c(0xab)){const _0x4b6a56=JSON[_0x3ca57c(0x1fd)]('['+RegExp['$1'][_0x3ca57c(0x136)](/\d+/g)+']');for(const _0x4e08b7 of _0x4b6a56){if(_0x3ca57c(0xe2)!=='fVTWq'){if(!$gameSwitches[_0x3ca57c(0x229)](_0x4e08b7))return!![];}else{function _0x36d65d(){const _0x2fbefd=_0x3ca57c;_0x477663=_0xef241a['replace'](/\\V\[(\d+)\]/gi,(_0x1c98f5,_0x3bb656)=>this[_0x2fbefd(0x238)](_0x5e18fb(_0x4c4bf8[_0x2fbefd(0x229)](_0x569f1c(_0x3bb656)))));}}}return![];}else{function _0x3f5693(){const _0x208172=_0x3ca57c;return this[_0x208172(0xb5)]()===0x65&&_0x280845['getMessageWindowRows']()>0x4?!![]:this[_0x208172(0xb5)]()===0x191;}}}if(_0x2f4543[_0x3ca57c(0x136)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3ca57c(0x9c)===_0x3ca57c(0x22e)){function _0x2875cc(){const _0x2d1b8a=_0x3ca57c;this['contents'][_0x2d1b8a(0xfb)]=!!_0x5af861;}}else{const _0x229225=JSON['parse']('['+RegExp['$1'][_0x3ca57c(0x136)](/\d+/g)+']');for(const _0x45d81c of _0x229225){if(_0x3ca57c(0x299)===_0x3ca57c(0x1ce)){function _0x18ae16(){const _0x1b5427=_0x3ca57c;if(_0x21152c[_0x1b5427(0x229)](_0x5f51f4))return!![];}}else{if(!$gameSwitches['value'](_0x45d81c))return!![];}}return![];}}if(_0x2f4543['match'](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2d49fc=JSON[_0x3ca57c(0x1fd)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x29ad28 of _0x2d49fc){if($gameSwitches['value'](_0x29ad28))return![];}return!![];}return!![];},VisuMZ[_0x508315(0x128)][_0x508315(0x16d)]=Window_ChoiceList[_0x508315(0x172)][_0x508315(0x216)],Window_ChoiceList['prototype'][_0x508315(0x216)]=function(){const _0x1f2ca0=_0x508315;VisuMZ['MessageCore'][_0x1f2ca0(0x16d)][_0x1f2ca0(0x284)](this),this[_0x1f2ca0(0x9a)]();},Window_ChoiceList[_0x508315(0x172)][_0x508315(0x220)]=function(){const _0x16ae0b=_0x508315;if(!this[_0x16ae0b(0x2c2)])return;const _0x47bfbd=0x8,_0xf77906=this[_0x16ae0b(0x2c2)],_0x362080=this['x']+this[_0x16ae0b(0x24b)],_0x4b15f2=Math[_0x16ae0b(0xb2)]((Graphics[_0x16ae0b(0x24b)]-Graphics[_0x16ae0b(0x152)])/0x2);if(_0x362080>=Graphics[_0x16ae0b(0x152)]+_0x4b15f2-_0xf77906[_0x16ae0b(0x24b)]+_0x47bfbd){if('vbSst'===_0x16ae0b(0x1e0))_0xf77906['x']=-_0xf77906['width']-_0x47bfbd;else{function _0x9a1d50(){return _0x516e12;}}}else{if('Kctha'!=='PCwek')_0xf77906['x']=this[_0x16ae0b(0x24b)]+_0x47bfbd;else{function _0xd2bb5f(){const _0x18e268=_0x16ae0b,_0x389b23=this['commandSymbol'](_0x58b348);if(_0x389b23===_0x18e268(0x25d))return this[_0x18e268(0xc3)]();return _0x81c5bb[_0x18e268(0x128)][_0x18e268(0x285)][_0x18e268(0x284)](this,_0x2d6835);}}}_0xf77906['y']=this[_0x16ae0b(0x257)]/0x2-_0xf77906[_0x16ae0b(0x257)]/0x2;},VisuMZ['MessageCore'][_0x508315(0x114)]=Window_ChoiceList[_0x508315(0x172)][_0x508315(0xfd)],Window_ChoiceList[_0x508315(0x172)][_0x508315(0xfd)]=function(){const _0x46da92=_0x508315;if(this[_0x46da92(0x253)])return this['messageCoreWindowX']();else{if(_0x46da92(0xc6)!==_0x46da92(0x26c))return VisuMZ['MessageCore'][_0x46da92(0x114)][_0x46da92(0x284)](this);else{function _0x5d26c6(){const _0x1179a7=_0x46da92;_0x1c55ab['x']=this[_0x1179a7(0x24b)]+_0x1a8b72;}}}},Window_ChoiceList['prototype']['messageCoreWindowX']=function(){const _0x2df707=_0x508315,_0x2f3264=$gameMessage['choicePositionType']();if(_0x2f3264===0x1)return(Graphics[_0x2df707(0x152)]-this['windowWidth']())/0x2;else return _0x2f3264===0x2?this[_0x2df707(0x253)]['x']+this[_0x2df707(0x253)][_0x2df707(0x24b)]-this['windowWidth']():this[_0x2df707(0x253)]['x'];},Window_ChoiceList[_0x508315(0x172)]['windowWidth']=function(){const _0xc092fa=_0x508315,_0x9f7b58=(this[_0xc092fa(0x2a7)]()+this['colSpacing']())*this[_0xc092fa(0x231)]()+this[_0xc092fa(0x65)]*0x2;return Math[_0xc092fa(0x234)](_0x9f7b58,Graphics['width']);},Window_ChoiceList[_0x508315(0x172)][_0x508315(0x2df)]=function(){const _0x2df4ff=_0x508315,_0x282448=$gameMessage[_0x2df4ff(0x162)]()['filter'](_0xdda89e=>this[_0x2df4ff(0x1d1)](_0xdda89e)),_0x1f41f9=Math['ceil'](_0x282448['length']/this[_0x2df4ff(0x231)]());return Math[_0x2df4ff(0x25e)](0x1,Math[_0x2df4ff(0x234)](_0x1f41f9,this[_0x2df4ff(0x15d)]()));},Window_ChoiceList['prototype'][_0x508315(0x15d)]=function(){const _0x2015dd=_0x508315,_0x393019=this['_messageWindow'],_0x18611e=_0x393019?_0x393019['y']:0x0,_0x4ec401=_0x393019?_0x393019[_0x2015dd(0x257)]:0x0,_0x357c84=Graphics['boxHeight']/0x2;if(_0x18611e<_0x357c84&&_0x18611e+_0x4ec401>_0x357c84){if(_0x2015dd(0x2b5)!==_0x2015dd(0x2b5)){function _0x55887c(){const _0x2a18be=_0x2015dd;if(this[_0x2a18be(0x1d1)](_0x59f192)){const _0x21779b=this[_0x2a18be(0x13d)](_0x41ae1e),_0x3898ce=this[_0x2a18be(0x2b1)](_0x21e600);this[_0x2a18be(0x2da)](_0x21779b,_0x2a18be(0x2b0),_0x3898ce,_0x4ed89e);}_0x255e02++;}}else return 0x4;}else return $gameSystem[_0x2015dd(0xa9)]();},Window_ChoiceList['prototype'][_0x508315(0x2a7)]=function(){const _0x458503=_0x508315;let _0x3e4f3f=0x60;for(const _0x189c3e of this[_0x458503(0x2dc)]){const _0x1c686c=_0x189c3e['name'],_0x480561=this[_0x458503(0x20e)](_0x1c686c)['width'],_0x19cb11=Math[_0x458503(0x13a)](_0x480561)+this[_0x458503(0x1db)]()*0x2;_0x3e4f3f<_0x19cb11&&(_0x3e4f3f=_0x19cb11);}return _0x3e4f3f;},Window_ChoiceList[_0x508315(0x172)][_0x508315(0x1aa)]=function(_0x1dbfb3){const _0x527271=_0x508315,_0x52c915=this[_0x527271(0x1f5)](_0x1dbfb3),_0x1142c1=$gameSystem['getChoiceListTextAlign']()!==_0x527271(0xc9)?'<%1>'[_0x527271(0xe4)]($gameSystem['getChoiceListTextAlign']()):'',_0x3e5831=_0x1142c1+this[_0x527271(0x88)](_0x1dbfb3);this[_0x527271(0xa2)](this[_0x527271(0x8d)](_0x1dbfb3));const _0x39a1f4=this['textSizeEx'](_0x3e5831)[_0x527271(0x257)],_0x319c5f=Math[_0x527271(0x25e)](_0x52c915['y'],_0x52c915['y']+Math[_0x527271(0x1ae)]((_0x52c915[_0x527271(0x257)]-_0x39a1f4)/0x2));this[_0x527271(0x212)](_0x3e5831,_0x52c915['x'],_0x319c5f,_0x52c915[_0x527271(0x24b)]);},Window_ChoiceList['prototype']['callOkHandler']=function(){const _0x5d2d47=_0x508315;$gameMessage[_0x5d2d47(0x236)](this[_0x5d2d47(0x90)]()),this[_0x5d2d47(0x253)][_0x5d2d47(0x1ea)](),this[_0x5d2d47(0x2a2)]();};